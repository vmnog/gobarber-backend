import { startOfHour, parseISO, isBefore, format, subHours } from 'date-fns';
import pt from 'date-fns/locale/pt';
import * as Yup from 'yup';

import User from '../models/User';
import File from '../models/File';
import Appointment from '../models/Appointment';

import Notification from '../schemas/Notification';

import Mail from '../../lib/Mail';

class AppointmentController {
  async index(req, res) {
    // se req.query.page, se nao for informado entao o default é 1
    const { page = 1 } = req.query;

    const appointments = await Appointment.finddAll({
      where: {
        user_id: req.userId,
        canceled_at: null
      },
      order: ['date'],

      limit: 20,
      // offset = quantos items quer pular
      offset: (page - 1) * 20, // continha que lista no maximo vinte items
      /*
       * Se usuario ta na pagina 2
       * (2 - 1) = 1
       *  1 * 20 = --> 20 <--
       *   logo o offset vai listar tudo a partir do item 20
       */

      attributes: ['id', 'date', 'past', 'cancelable'],
      include: [
        {
          // filling response with provider data, but only id and name
          model: User,
          as: 'provider',
          attributes: ['id', 'name'],
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['id', 'url', 'name', 'path']
            }
          ]
        }
      ]
    });

    return res.json(appointments);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      provider_id: Yup.number().required(),
      date: Yup.date().required()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: 'Appointment validation failed'
      });
    }

    const { provider_id, date } = req.body;

    // Check if provider_id exists and if it is a provider
    const checkIsProvider = await User.findOne({
      where: {
        id: provider_id,
        provider: true
      }
    });

    if (!checkIsProvider) {
      return res.status(401).json({
        error: 'You can only create appointent with providers'
      });
    }

    if (req.userId === provider_id) {
      return res.status(401).json({
        error: 'You cannot create appointments with yourself'
      });
    }

    // parseISO transforma o date num objeto date do js, e o startofHour pega somente a hora da data
    const hourStart = startOfHour(parseISO(date));

    const dateNow = new Date();

    // Se a data ja passou
    if (isBefore(hourStart, dateNow)) {
      return res.status(400).json({
        error: 'Unable to create an appointment in the past'
      });
    }

    // checando se o provider do req.body já tem horario marcado nesta date do req.body
    const providerIsAvailable = await Appointment.findOne({
      where: {
        provider_id,
        canceled_at: null,
        date: hourStart
      }
    });

    if (providerIsAvailable) {
      return res.status(400).json({
        error: 'This provider already has a appointment at this hour.'
      });
    }

    const appointment = await Appointment.create({
      user_id: req.userId, // userId é enviado pelo middleware de auth, é o id do usuario logado
      provider_id,
      date: hourStart // forçando que os agendamentos sempre tenham os minutos zerados(13:00, 14:00)
    });

    const user = await User.findByPk(req.userId);
    const formattedDate = format(
      hourStart,
      "'dia' dd 'de' MMMM', às' H:mm'h'", // formatando a data do agendamento,  e o formato "o dia 26 de Março as 18:00h"
      { locale: pt } // Informando que o tipo de data é formatado na linguagem portugues
    );

    // Notifica o prestador de serviço usando o Notification que é um Schema do mongodb
    const notification = await Notification.create({
      content: `Novo agendamento de ${user.name} para o dia ${formattedDate}`,
      user: provider_id
    });

    return res.json(appointment);
  }

  async delete(req, res) {
    const { id } = req.params;
    const appointment = await Appointment.findByPk(id, {
      include: [
        {
          model: User,
          as: 'provider',
          attributes: ['name', 'email']
        },
        {
          model: User,
          as: 'user',
          attributes: ['name']
        }
      ]
    });

    // Se o cliente está tentando cancelar um appointment que não foi ele que agendou
    if (appointment.user_id !== req.userId) {
      return res.status(401).json({
        error: 'You do not have permission to cancel this appointment'
      });
    }

    // Se ja foi cancelado
    if (appointment.canceled_at) {
      return res.status(400).json({
        error: 'This appointment was canceled already'
      });
    }

    const dateNow = new Date();
    const twoHoursBefore = subHours(appointment.date, 2);

    // Se falta menos de duas horas pro horario do appointment
    if (isBefore(twoHoursBefore, dateNow)) {
      return res.status(401).json({
        error:
          'You can only cancel an appointment 2 hours before the expected appointment date'
      });
    }

    await appointment.update({
      canceled_at: dateNow
    });

    const appointmentFormatedDate = format(
      appointment.date,
      "'dia' dd 'de' MMMM', às' H:mm'h'", // formatando a data do agendamento,  e o formato "o dia 26 de Março as 18:00h"
      { locale: pt } // Informando que o tipo de data é formatado na linguagem portugues
    );

    await Mail.sendMail({
      to: `${appointment.provider.name} <${appointment.provider.email}>`,
      subject: 'Agendamento cancelado',
      template: 'cancellation',
      context: {
        provider: appointment.provider.name,
        date: appointmentFormatedDate
      }
    });

    return res.json(appointment);
  }
}

export default new AppointmentController();
