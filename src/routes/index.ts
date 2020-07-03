import express from 'express';
import { useInflection } from 'sequelize/types';
import { userRoutes } from './user.route';
import { achivementRoutes } from './achivement.route';

export const routes = express();

routes.use(userRoutes)
routes.use(achivementRoutes)
