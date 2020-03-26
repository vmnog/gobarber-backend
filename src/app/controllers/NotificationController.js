import Notification from '../schemas/Notification';
import User from '../models/User';

class NotificationController {
  async index(req, res) {
    // checando se o usuario logado é um provider
    const checkIsProvider = await User.findOne({
      where: {
        id: req.userId,
        provider: true
      }
    });

    if (!checkIsProvider) {
      return res.status(401).json({
        error: 'Only providers can see appointments notification'
      });
    }

    // pegando todas as notificacoes que sao destinadas ao provider que está logado
    const notification = await Notification.find({
      user: req.userId
    })
      .sort({ cratedAt: 'desc' })
      .limit(20);

    return res.json(notification);
  }
  async update(req, res) {
    const { id } = req.params;
    const notification = await Notification.findByIdAndUpdate(id, {
      read: true
    });
    return res.json(notification);
  }
}

export default new NotificationController();
