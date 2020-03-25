import { startOfHour, parseISO, isBefore } from 'date-fns';
import * as Yup from 'yup';

import Appointment from '../models/Appointment';
import User from '../models/User';

class AppointmentController {
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

    const appointment = await Appointment.create({
      user_id: req.userId, // userId é enviado pelo middleware de auth, é o id do usuario logado
      provider_id,
      date
    });

    return res.json(appointment);
  }
}

export default new AppointmentController();
