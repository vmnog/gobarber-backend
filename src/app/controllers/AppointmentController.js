import Appointment from '../models/Appointment';
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

    const { provider_id, data } = req.body;

    return res.json();
  }
}

export default new AppointmentController();
