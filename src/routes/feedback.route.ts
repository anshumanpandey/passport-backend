import express from 'express';
import asyncHandler from "express-async-handler"
var jwt = require('express-jwt');
import { join } from "path"
import { checkSchema } from "express-validator"
import { validateParams } from '../middlewares/routeValidation.middleware';
import { FeedbackModel } from '../models/feedback.model';

export const feedbackRoutes = express();

feedbackRoutes.get('/feedback/form/:achivementId', (req, res) => {
  res.sendFile(join(__dirname, "..", "..", "feedback-form", "build","index.html"));
})


feedbackRoutes.post('/feedback/:achivementId', jwt({ secret: process.env.JWT_SECRET || 'aa', algorithms: ['HS256'] }),validateParams(checkSchema({
  achivementId: {
    in: ['params'],
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
    isBoolean: {
      errorMessage: 'Field must be boolean'
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
    trim: true
  },
  skillsWithImproving: {
    in: ['body'],
    trim: true
  },
})), asyncHandler(async (req, res) => {
  await FeedbackModel.create({ ...req.body, AchivementId: req.params.achivementId });
  res.send({ success: 'Feedback created' });
}));