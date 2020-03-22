import User from '../models/User';

class UserController {
  async store(req, res) {
    const userExists = await User.findOne({ where: { email: req.body.email } });

    if (userExists) {
      return res.status(401).json({
        error: 'This e-mail is already registered.'
      });
    }

    const { id, name, email, provider } = await User.create(req.body);

    return res.status(200).json({
      id,
      name,
      email,
      provider
    });
  }
}

export default new UserController();
