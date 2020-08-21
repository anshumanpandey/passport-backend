import express from 'express';
import asyncHandler from "express-async-handler"
var jwt = require('express-jwt');
import { join } from "path"
import { checkSchema } from "express-validator"
import { validateParams } from '../middlewares/routeValidation.middleware';
import { FeedbackModel } from '../models/feedback.model';
import { ApiError } from '../utils/ApiError';
import { AchivementModel } from '../models/achivement.model';
import { PassportModel } from '../models/passport.model';
import { UserModel } from '../models/user.model';

export const passportRoute = express();

passportRoute.get('/passport/',jwt({ secret: process.env.JWT_SECRET || 'aa', algorithms: ['HS256'] }), asyncHandler(async (req, res) => {

  //@ts-expect-error
  const m = await PassportModel.findAll({ where: { UserId: req.user.id}, include: [{model: AchivementModel, include: [{model: FeedbackModel }]}] })
  res.send(m);
}))

passportRoute.get('/passport/:id',asyncHandler(async (req, res) => {
  const m = await PassportModel.findByPk(req.params.id, { include: [{ model: UserModel }, {model: AchivementModel, include: [{model: FeedbackModel }]}] })
  if (!m) throw new ApiError("Passport not found!")
  const json = m?.toJSON();
  res.send(json);
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

  let passport = null

  if (id) {
    passport = await PassportModel.update({ name }, { where: { id }})
  } else {
    //@ts-expect-error
    passport = await PassportModel.create({ name, UserId: req.user.id })
  }

  res.send(passport);
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
