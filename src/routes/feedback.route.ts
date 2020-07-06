import express from 'express';
import asyncHandler from "express-async-handler"
import { checkSchema } from "express-validator"
import { UserModel } from '../models/user.model';
import { validateParams } from '../middlewares/routeValidation.middleware';
import { ApiError } from '../utils/ApiError';
import { AchivementModel } from '../models/achivement.model';
import { FeedbackModel } from '../models/feedback.model';

export const feedbackRoutes = express();

feedbackRoutes.post('/feedback', validateParams(checkSchema({
  id: {
    in: ['body'],
    exists: {
      errorMessage: 'Missing field'
    },
    trim: true
  },
  fullname: {
    in: ['body'],
    exists: {
      errorMessage: 'Missing field'
    },
    trim: true
  },
  validated: {
    in: ['body'],
    exists: {
      errorMessage: 'Missing field'
    },
    trim: true
  },
  description: {
    in: ['body'],
    exists: {
      errorMessage: 'Missing field'
    },
    trim: true
  },
  skillsWithExperience: {
    in: ['body'],
    exists: {
      errorMessage: 'Missing field'
    },
    trim: true
  },
  skillsWithImproving: {
    in: ['body'],
    exists: {
      errorMessage: 'Missing field'
    },
    trim: true
  },
})), asyncHandler(async (req, res) => {
  await AchivementModel.create(req.body);
  res.send({ success: 'Achivement created' });
}));

feedbackRoutes.get('/feedback/', validateParams(checkSchema({
  achivementId: {
    in: ['body'],
    exists: {
      errorMessage: 'Missing field'
    },
    trim: true
  },
})),asyncHandler(async (req, res) => {
  //@ts-ignore
  const achivement = await FeedbackModel.findOne({ where: { AchivementId: req.body.achivementId } })
  if (!achivement) throw new ApiError("Achivement not found")
  res.send({ success: 'User created' });
}));
