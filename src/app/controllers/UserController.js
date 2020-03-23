import * as Yup from 'yup';

import User from '../models/User';

class UserController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .required()
        .min(6)
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: 'Validation fails'
      });
    }

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
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      oldPassword: Yup.string(),
      // Se usuario enviar oldPassword entao o campo password é obrigatorio na atualizacao de senha
      password: Yup.string()
        .min(6)
        .when('oldPassword', (oldPassword, field) => {
          return oldPassword ? field.required() : field;
        }),
      confirmPassword: Yup.string().when('password', (password, field) => {
        // confirm password tem que estar entre os valores de password
        return password ? field.required().oneOf([Yup.ref('password')]) : field;
      })
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: 'Validation fails'
      });
    }

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
