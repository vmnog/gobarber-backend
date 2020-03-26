import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import ProviderController from './app/controllers/ProviderController';
import AppointmentController from './app/controllers/AppointmentController';
import ScheduleController from './app/controllers/ScheduleController';
import NotificationController from './app/controllers/NotificationController';

import authMiddleware from './app/middlewares/auth';
import fileMiddleware from './app/middlewares/file';

const routes = new Router();

// Users
routes.post('/users', UserController.store);
routes.put('/users', authMiddleware, UserController.update);

// Providers
routes.get('/providers', ProviderController.index);

// Sessions
routes.post('/sessions', SessionController.store);

//Files
routes.post('/files', authMiddleware, fileMiddleware, FileController.store);

// Appointments
routes.get('/appointments', authMiddleware, AppointmentController.index);
routes.post('/appointments', authMiddleware, AppointmentController.store);
routes.delete(
  '/appointments/:id',
  authMiddleware,
  AppointmentController.delete
);

// Schedules
routes.get('/schedules', authMiddleware, ScheduleController.index);

// Notifications
routes.get('/notifications', authMiddleware, NotificationController.index);
routes.post(
  '/notifications/:id',
  authMiddleware,
  NotificationController.update
);

export default routes;
