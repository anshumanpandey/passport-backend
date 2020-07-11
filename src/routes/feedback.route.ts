import express from 'express';
import asyncHandler from "express-async-handler"
var jwt = require('express-jwt');
import { join } from "path"
import { checkSchema } from "express-validator"
import { validateParams } from '../middlewares/routeValidation.middleware';
import { FeedbackModel } from '../models/feedback.model';
import { ApiError } from '../utils/ApiError';

export const feedbackRoutes = express();

feedbackRoutes.get('/feedback/form/', asyncHandler(async (req, res) => {
  const { token } = req.query
  if (!token) throw new ApiError("Missing token")

  res.sendFile(join(__dirname, "..", "..", "feedback-form", "build","index.html"));
}))

feedbackRoutes.get('/feedback/meta/:token', asyncHandler(async (req, res) => {
  const { token } = req.params
  if (!token) throw new ApiError("Missing token")
  
  const feedback = await FeedbackModel.findOne({ where: { editToken: token }})
  if (!feedback) throw new ApiError("Feedback not found")

  res.send(feedback)
}))


feedbackRoutes.post('/feedback/:token', validateParams(checkSchema({
  token: {
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
  engagementDescription: {
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
  const { token } = req.params
  if (!token) throw new ApiError("Missing token")
  
  const feedback = await FeedbackModel.findOne({ where: { editToken: token, isFilled: false }})
  if (!feedback) throw new ApiError("Feedback not found")
  if (feedback.isFilled) throw new ApiError("Feedback already done")

  await FeedbackModel.update({ ...req.body, isFilled: true }, { where: { editToken: token }});
  res.send({ success: 'Feedback created' });
}));