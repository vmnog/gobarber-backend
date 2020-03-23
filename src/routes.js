import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

import authMiddleware from './app/middlewares/auth';
import fileMiddleware from './app/middlewares/file';

const routes = new Router();

// User
routes.post('/users', UserController.store);
routes.put('/users/:id', authMiddleware, UserController.update);

// Session
routes.post('/sessions', SessionController.store);

//Files
routes.post('/files', authMiddleware, fileMiddleware, (req, res) => {
  return res.json({ ok: true });
});

export default routes;
