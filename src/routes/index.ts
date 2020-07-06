import express from 'express';
import { userRoutes } from './user.route';
import { achivementRoutes } from './achivement.route';
import { feedbackRoutes } from './feedback.route';

export const routes = express();

routes.use(userRoutes)
routes.use(achivementRoutes)
routes.use(feedbackRoutes)
