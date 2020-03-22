import jwt from 'jsonwebtoken';

import User from '../models/User';

class SessionController {
  async store(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({
      where: {
        email
      }
    });

    if (!user) {
      return res.status(401).json({
        error: 'User not found'
      });
    }

    // Use method that uses bcrypt to compare password hashs
    if (!(await user.checkPassword(password))) {
      return res.status(401).json({
        error: 'Wrong password'
      });
    }

    const { id, name } = user;

    return res.json({
      user: {
        id,
        name,
        email,
        token: jwt.sign(
          {
            id
          },
          // texto que só eu sei o que gera esse token (vmnoggobarber no site md5online.org)
          'd709f2e8c43ed329d12974d91700dcb3',
          // data de expiração do token
          { expiresIn: '7d' }
        )
      }
    });
  }
}

export default new SessionController();
