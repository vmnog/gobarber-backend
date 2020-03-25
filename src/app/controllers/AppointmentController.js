import Appointment from '../models/Appointment';
import User from '../models/User';

import * as Yup from 'yup';

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

    console.log('1. validação ok\n\n\n');

    const { provider_id, date } = req.body;

    // Check if provider_id exists and if it is a provider
    const isProvider = await User.findOne({
      where: {
        id: provider_id,
        provider: true
      }
    });

    if (!isProvider) {
      return res.status(401).json({
        error: 'You can only create appointent with providers'
      });
    }

    console.log('2. provider ok\n\n\n');

    console.log({
      id: req.userId,
      provider: provider_id,
      date: date
    });

    const appointment = await Appointment.create({
      user_id: req.userId, // userId é enviado pelo middleware de auth, é o id do usuario logado
      provider_id,
      date
    });

    console.log('3. appointment create  ok\n\n\n');

    return res.json(appointment);
  }
}

export default new AppointmentController();
