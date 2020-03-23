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

  async update(req, res) {
    const { email, password, oldPassword } = req.body;

    const user = await User.findByPk(req.userId);

    // se usuario ta tentando alterar o email
    if (email !== user.email) {
      const userExists = await User.findOne({
        where: {
          email
        }
      });

      if (userExists) {
        return res.status(401).json({
          error: 'E-mail already registered.'
        });
      }
    }

    // compara senha antiga com senha nova
    // Só vai fazer a comparação caso o parametro oldpassword exista
    // se oldpassword n existe entao o usuario n quer alterar a senha
    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({
        error: 'Password does not match.'
      });
    }

    const { id, name, provider } = await user.update(req.body);

    return res.status(200).json({
      id,
      name,
      email,
      provider
    });
  }
}

export default new UserController();
