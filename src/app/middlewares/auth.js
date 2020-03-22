import jwt from 'jsonwebtoken';
import { promisify } from 'util'; // util is a lib from nodejs

import authConfig from '../../config/auth';

// config authorization bearer token
export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      error: 'Token not provided'
    });
  }

  // splits "Bearer Eayuhdayushai3h7aiuh"
  // Bearer = we dont use, token = Eayuhdayushai3h7aiuh
  const [, token] = authHeader.split(' ');

  try {
    // promisify executes a fucntion that returns another function
    // decoded = has the data that is saved when we generate the token
    // promisify(executes that function)(using those parameters)
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);

    // decoded example: { id: 14, iat: 1584914565, exp: 1585519365 }
    req.userId = decoded.id;

    return next();
  } catch (err) {
    return res.status(401).json({
      error: 'Token invalid'
    });
  }
};
