import express from 'express';
import asyncHandler from "express-async-handler"
var jwt = require('express-jwt');
import { join } from "path"
import { checkSchema } from "express-validator"
import { validateParams } from '../middlewares/routeValidation.middleware';
import { FeedbackModel } from '../models/feedback.model';
import { ApiError } from '../utils/ApiError';
import { AchivementModel } from '../models/achivement.model';
import { UserModel } from '../models/user.model';
import sequelize from '../utils/DB';
import { sendEmail } from '../utils/Mail';

export const feedbackRoutes = express();

feedbackRoutes.get('/feedback/form/', asyncHandler(async (req, res) => {
  const { token } = req.query
  if (!token) throw new ApiError("Missing token")

  res.sendFile(join(__dirname, "..", "..", "feedback-form", "build", "index.html"));
}))

feedbackRoutes.get('/feedback/meta/:token', asyncHandler(async (req, res) => {
  const { token } = req.params
  if (!token) throw new ApiError("Missing token")

  const feedback = await FeedbackModel.findOne({
    where: { editToken: token },
    include: [{
      model: AchivementModel, attributes: ["title"], include: [{ model: UserModel, attributes: ["firstName", 'lastName'] }]
    }]
  })
  if (!feedback) throw new ApiError("Feedback not found")

  res.send(feedback)
}))

feedbackRoutes.post('/feedback/ask', validateParams(checkSchema({
  achivementId: {
    in: ['body'],
    exists: {
      errorMessage: 'Missing field'
    },
    trim: true
  },
  collegueName: {
    in: ['body'],
    exists: {
      errorMessage: 'Missing field'
    },
    isEmpty: {
      errorMessage: 'Missing field',
      negated: true
    },
    trim: true
  },
  colleguePhonenumber: {
    in: ['body'],
    exists: {
      errorMessage: 'Missing field'
    },
    isEmpty: {
      errorMessage: 'Missing field',
      negated: true
    },
    trim: true
  },
  collegueRole: {
    in: ['body'],
    exists: {
      errorMessage: 'Missing field'
    },
    isEmpty: {
      errorMessage: 'Missing field',
      negated: true
    },
    trim: true
  },
})), asyncHandler(async (req, res) => {
  const { achivementId } = req.body

  await sequelize.transaction(async (t) => {
    const achivement = await AchivementModel.findByPk(achivementId)
    if (!achivement) throw new ApiError("Achivement not found")

    const editToken = Math.random().toString(36).substring(7);

    //@ts-ignore
    await FeedbackModel.create({ ...req.body, editToken,AchivementId: achivement.id });

    await sendEmail({
      email: req.body.colleguePhonenumber,
      token: editToken,
      name: req.body.collegueName,
      title: req.body.collegueRole,
      //@ts-ignore
      user: req.user,
      achivement
    });
  })

  res.send({ success: 'Feedback created' });
}));


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

  const feedback = await FeedbackModel.findOne({ where: { editToken: token, isFilled: false } })
  if (!feedback) throw new ApiError("Feedback not found")
  if (feedback.isFilled) throw new ApiError("Feedback already done")

  await FeedbackModel.update({ ...req.body, isFilled: true }, { where: { editToken: token } });
  res.send({ success: 'Feedback created' });
}));