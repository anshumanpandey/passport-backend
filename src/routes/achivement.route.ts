import express from 'express';
import asyncHandler from "express-async-handler"
var jwt = require('express-jwt');
import { checkSchema } from "express-validator"
import { validateParams } from '../middlewares/routeValidation.middleware';
import { ApiError } from '../utils/ApiError';
import { AchivementModel } from '../models/achivement.model';
import multer from 'multer';
import { FeedbackModel } from '../models/feedback.model';
import sequelize from '../utils/DB';
import { PassportModel } from '../models/passport.model';

let storage = multer.diskStorage({
  destination: 'uploads/',
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
});

const fileSize = 50 * 1024 * 1024

var upload = multer({ storage, limits: { fileSize } })

export const achivementRoutes = express();

achivementRoutes.post('/achivement', jwt({ secret: process.env.JWT_SECRET || 'aa', algorithms: ['HS256'] }), upload.single("awardFile"), validateParams(checkSchema({
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
    trim: true
  },
  resultObteined: {
    in: ['body'],
    trim: true
  },
  valueObteined: {
    in: ['body'],
    trim: true
  },
})), asyncHandler(async (req, res) => {
  await sequelize.transaction(async (t) => {
    //@ts-ignore
    const data = { ...req.body, UserId: req.user.id, PassportId: req.body.passportId }
    if (req.file) {
      data.awardFilename = `${req.protocol + '://' + req.get('host')}/passport/${req.file.filename}`
    }
    const a = await AchivementModel.create(data, { transaction: t });

    if (req.body.passportId) {
      const passport = await PassportModel.findByPk(req.body.passportId, { transaction: t })
      if (passport) {
        //@ts-expect-error
        await passport.addAchivement(a, { transaction: t })
      }
    }

  })

  res.send({ success: 'Achivement created' });
}));

achivementRoutes.post('/achivement/link', jwt({ secret: process.env.JWT_SECRET || 'aa', algorithms: ['HS256'] }), upload.single("awardFile"), validateParams(checkSchema({
  achivementId: {
    in: ['body'],
    exists: {
      errorMessage: 'Missing field'
    },
    isEmpty: {
      errorMessage: 'Missing field',
      negated: true
    },
  },
  passportId: {
    in: ['body'],
    exists: {
      errorMessage: 'Missing field'
    },
    isEmpty: {
      errorMessage: 'Missing field',
      negated: true
    },
  },
})), asyncHandler(async (req, res) => {
  await sequelize.transaction(async (t) => {
    const passport = await PassportModel.findByPk(req.body.passportId)
    if (!passport) throw new ApiError("Passport not found")
    const achivement = await AchivementModel.findByPk(req.body.achivementId)
    if (!achivement) throw new ApiError("Achivement not found")

    //@ts-expect-error
    await passport.addAchivement(achivement)
  })

  res.send({ success: 'Achivement created' });
}));

achivementRoutes.post('/achivement/unlink', jwt({ secret: process.env.JWT_SECRET || 'aa', algorithms: ['HS256'] }), upload.single("awardFile"), validateParams(checkSchema({
  achivementId: {
    in: ['body'],
    exists: {
      errorMessage: 'Missing field'
    },
    isEmpty: {
      errorMessage: 'Missing field',
      negated: true
    },
  },
  passportId: {
    in: ['body'],
    exists: {
      errorMessage: 'Missing field'
    },
    isEmpty: {
      errorMessage: 'Missing field',
      negated: true
    },
  },
})), asyncHandler(async (req, res) => {
  await sequelize.transaction(async (t) => {
    const passport = await PassportModel.findByPk(req.body.passportId)
    if (!passport) throw new ApiError("Passport not found")
    const achivement = await AchivementModel.findByPk(req.body.achivementId)
    if (!achivement) throw new ApiError("Achivement not found")

    //@ts-expect-error
    await passport.removeAchivement(achivement)
  })

  res.send({ success: 'Achivement created' });
}));

achivementRoutes.get('/achivement/', jwt({ secret: process.env.JWT_SECRET || 'aa', algorithms: ['HS256'] }), asyncHandler(async (req, res) => {
  //@ts-ignore
  const achivements = await AchivementModel.findAll({ where: { UserId: req.user.id }, include: [{ model: FeedbackModel, required: false, where: { isFilled: true } }, { model: PassportModel }] })
  res.send(achivements);
}));
