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
  const m = await PassportModel.findAll({ where: { UserId: req.user.id}, include: [{model: AchivementModel, include: [{model: FeedbackModel }]}] })
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
  const { name, id } = req.body

  if (id) {
    await PassportModel.update({ name }, { where: { id }})
  } else {
    //@ts-expect-error
    await PassportModel.create({ name, UserId: req.user.id })
  }

  res.send({ success: 'Passport created' });
}));

passportRoute.delete('/passport', jwt({ secret: process.env.JWT_SECRET || 'aa', algorithms: ['HS256'] }),validateParams(checkSchema({
  id: {
    in: ['body'],
    exists: {
      errorMessage: 'Missing field'
    },
    trim: true
  },
})), asyncHandler(async (req, res) => {
  const { id } = req.body

  const p = await PassportModel.findByPk(id)
  if (!p) throw new ApiError("Passport not found")
  await p.destroy();

  res.send({ success: 'Passport created' });
}));