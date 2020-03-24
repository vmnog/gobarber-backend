import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import ProviderController from './app/controllers/ProviderController';

import authMiddleware from './app/middlewares/auth';
import fileMiddleware from './app/middlewares/file';

const routes = new Router();

// User
routes.post('/users', UserController.store);
routes.put('/users', authMiddleware, UserController.update);

routes.get('/providers', ProviderController.index);

// Session
routes.post('/sessions', SessionController.store);

//Files
routes.post('/files', authMiddleware, fileMiddleware, FileController.store);

export default routes;
