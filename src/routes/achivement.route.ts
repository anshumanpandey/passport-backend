import express from 'express';
import asyncHandler from "express-async-handler"
var jwt = require('express-jwt');
import { checkSchema } from "express-validator"
import { validateParams } from '../middlewares/routeValidation.middleware';
import { ApiError } from '../utils/ApiError';
import { AchivementModel } from '../models/achivement.model';
import multer from 'multer';
import { FeedbackModel } from '../models/feedback.model';
import { sendEmail } from '../utils/Mail';
import sequelize from '../utils/DB';

let storage = multer.diskStorage({
  destination: 'uploads/',
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
});

var upload = multer({ storage })

export const achivementRoutes = express();

achivementRoutes.post('/achivement', jwt({ secret: process.env.JWT_SECRET || 'aa', algorithms: ['HS256'] }),upload.single("awardFile"),validateParams(checkSchema({
  title: {
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
  month: {
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
  year: {
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
  company: {
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
  description: {
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
  titleObteined: {
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
  resultObteined: {
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
  valueObteined: {
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
  awardFile: {
    // Custom validators
    custom: {
      options: (value, { req, location, path }) => {
        return req.file != null || req.file != undefined;
      },
      errorMessage: "Missing field"
    },
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
})),asyncHandler(async (req, res) => {
  await sequelize.transaction(async (t) => {
    const a = await AchivementModel
      //@ts-ignore
      .create({...req.body, awardFilename: req.file.filename,UserId: req.user.id}, { transaction: t });

    const editToken = Math.random().toString(36).substring(7);
    //@ts-ignore
    await FeedbackModel.create({ editToken, fullname: req.body.collegueName, AchivementId: a.id }, { transaction: t });

    await sendEmail({
      email: req.body.colleguePhonenumber,
      token: editToken,
      name: req.body.collegueName,
      title: req.body.collegueRole,
    });
  })
    
  res.send({ success: 'Achivement created' });
}));

achivementRoutes.get('/achivement/', jwt({ secret: process.env.JWT_SECRET || 'aa', algorithms: ['HS256'] }),asyncHandler(async (req, res) => {
  //@ts-ignore
  const achivements = await AchivementModel.findAll({ where: { UserId: req.user.id }, include: [{ model: FeedbackModel, where: { isFilled: true } }] })
  res.send(achivements);
}));
