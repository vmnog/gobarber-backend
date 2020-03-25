import { startOfDay, endOfDay, parseISO } from 'date-fns';
import { Op } from 'sequelize';

import Appointment from '../models/Appointment';
import User from '../models/User';
import File from '../models/File';

class ScheduleController {
  async index(req, res) {
    const checkUserProvider = await User.findOne({
      where: {
        id: req.userId,
        provider: true
      }
    });

    // se usuario logado nao for um provider
    if (!checkUserProvider) {
      return res.status(401).json({
        error: 'User is not a provider.'
      });
    }

    const { date } = req.query;
    const parsedDate = parseISO(date);
    const isToday = {
      [Op.between]: [startOfDay(parsedDate), endOfDay(parsedDate)]
    };

    const appointments = await Appointment.findAll({
      where: {
        provider_id: req.userId, // lista todos os agendamentos do usuario logado que é um provider
        canceled_at: null,
        date: isToday
      },
      order: ['date']
    });

    return res.json(appointments);
  }
}

export default new ScheduleController();
