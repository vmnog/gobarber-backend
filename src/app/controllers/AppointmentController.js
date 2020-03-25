import { startOfHour, parseISO, isBefore } from 'date-fns';
import * as Yup from 'yup';

import Appointment from '../models/Appointment';
import User from '../models/User';
import File from '../models/File';

class AppointmentController {
  async index(req, res) {
    const appointments = await Appointment.findAll({
      where: {
        user_id: req.userId,
        canceled_at: null
      },
      order: ['date'],
      attributes: ['id', 'date'],
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

    return res.json(appointment);
  }
}

export default new AppointmentController();
