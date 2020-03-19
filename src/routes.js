import { Router } from 'express';
import User from './app/models/User';

const routes = new Router();

routes.get('/', async (req, res) => {
  const user = await User.create({
    name: 'Victor Nogueira',
    email: 'vmnogueira.ti@gmail.com',
    password_hash: '12342346346'
  });

  return res.json(user);
});

export default routes;
