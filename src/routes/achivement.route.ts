import express from 'express';
import asyncHandler from "express-async-handler"
import { checkSchema } from "express-validator"
import { validateParams } from '../middlewares/routeValidation.middleware';
import { ApiError } from '../utils/ApiError';
import { AchivementModel } from '../models/achivement.model';
import multer from 'multer';

let storage = multer.diskStorage({
  destination: 'uploads/',
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
});

var upload = multer({ storage })

export const achivementRoutes = express();

achivementRoutes.post('/feedback', upload.single("awardFile"),validateParams(checkSchema({
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
  //@ts-ignore
  console.log(req.file)
  //@ts-ignore
  await AchivementModel.create({...req.body, UserId: req.user.id});
  res.send({ success: 'Achivement created' });
}));

achivementRoutes.get('/achivement/', asyncHandler(async (req, res) => {
  //@ts-ignore
  const achivements = await AchivementModel.findAll({ where: { UserId: req.user.id } })
  res.send(achivements);
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
  //@ts-ignore
  const achivement = await AchivementModel.findOne({ where: { id: req.body.id, UserId: req.user.id } })
  if (!achivement) throw new ApiError("Achivement not found")
  res.send({ success: 'User created' });
}));