import express from 'express';
import asyncHandler from "express-async-handler"
var jwt = require('express-jwt');
import { join } from "path"
import { checkSchema } from "express-validator"
import { validateParams } from '../middlewares/routeValidation.middleware';
import { FeedbackModel } from '../models/feedback.model';
import { ApiError } from '../utils/ApiError';
import { AchivementModel } from '../models/achivement.model';
import sequelize from '../utils/DB';
import { sendEmail } from '../utils/Mail';
import { PassportModel } from '../models/passport.model';

export const passportRoute = express();

passportRoute.get('/passport/',jwt({ secret: process.env.JWT_SECRET || 'aa', algorithms: ['HS256'] }), asyncHandler(async (req, res) => {

  //@ts-expect-error
  const m = await PassportModel.findAll({ where: { UserId: req.user.id}, include: [{model: AchivementModel}] })
  console.log(m)
  res.send(m);
}))

passportRoute.post('/passport/create', jwt({ secret: process.env.JWT_SECRET || 'aa', algorithms: ['HS256'] }),validateParams(checkSchema({
  name: {
    in: ['body'],
    exists: {
      errorMessage: 'Missing field'
    },
    trim: true
  },
})), asyncHandler(async (req, res) => {
  const { name } = req.body

  //@ts-expect-error
  await PassportModel.create({ name, UserId: req.user.id })

  res.send({ success: 'Passport created' });
}));
