import jwt from 'jsonwebtoken';

import authConfig from '../../config/auth';
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
        token: jwt.sign({ id }, authConfig.secret, {
          expiresIn: authConfig.expiresIn
        })
      }
    });
  }
}

export default new SessionController();