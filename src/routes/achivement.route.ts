import express from 'express';
import asyncHandler from "express-async-handler"
import { checkSchema } from "express-validator"
import { UserModel } from '../models/user.model';
import { validateParams } from '../middlewares/routeValidation.middleware';
import { ApiError } from '../utils/ApiError';
import { AchivementModel } from '../models/achivement.model';

export const achivementRoutes = express();

achivementRoutes.post('/create', validateParams(checkSchema({
  id: {
    in: ['body'],
    exists: {
      errorMessage: 'Missing field'
    },
    trim: true
  },
  title: {
    in: ['body'],
    exists: {
      errorMessage: 'Missing field'
    },
    trim: true
  },
  month: {
    in: ['body'],
    exists: {
      errorMessage: 'Missing field'
    },
    trim: true
  },
  year: {
    in: ['body'],
    exists: {
      errorMessage: 'Missing field'
    },
    trim: true
  },
  company: {
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
  titleObteined: {
    in: ['body'],
    exists: {
      errorMessage: 'Missing field'
    },
    trim: true
  },
  resultObteined: {
    in: ['body'],
    exists: {
      errorMessage: 'Missing field'
    },
    trim: true
  },
  valueObteined: {
    in: ['body'],
    exists: {
      errorMessage: 'Missing field'
    },
    trim: true
  },
  awardFilename: {
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
    trim: true
  },
  colleguePhonenumber: {
    in: ['body'],
    exists: {
      errorMessage: 'Missing field'
    },
    trim: true
  },
  collegueRole: {
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

achivementRoutes.get('/achivement/', asyncHandler(async (req, res) => {
  const achivement = await AchivementModel.findOne({ where: { id: req.body.id } })
  if (!achivement) throw new ApiError("Achivement not found")
  res.send({ success: 'User created' });
}));

achivementRoutes.get('/achivement/:id', validateParams(checkSchema({
  id: {
    in: ['params'],
    exists: {
      errorMessage: 'Missing field'
    },
    trim: true
  },
})), asyncHandler(async (req, res) => {
  const achivement = await AchivementModel.findOne({ where: { id: req.body.id } })
  if (!achivement) throw new ApiError("Achivement not found")
  res.send({ success: 'User created' });
}));