import express from 'express';
import asyncHandler from "express-async-handler"
import { checkSchema } from "express-validator"
import { sign } from 'jsonwebtoken'
import { hash, compare } from "bcrypt"
import { UserModel } from '../models/user.model';
import { validateParams } from '../middlewares/routeValidation.middleware';
import { ApiError } from '../utils/ApiError';

export const userRoutes = express();

userRoutes.post('/login', validateParams(checkSchema({
  email: {
    in: ['body'],
    exists: {
      errorMessage: 'Missing field'
    },
    trim: true
  },
  password: {
    in: ['body'],
    exists: {
      errorMessage: 'Missing field'
    },
    trim: true
  },
})), asyncHandler(async (req, res) => {
  const { email, password} = req.body;
  const user = await UserModel.findOne({
    where: { email },
    attributes: { exclude: ["createdAt", "updatedAt"]}
  });

  if (!user) throw new ApiError("User not found")
  if (!await compare(password, user.password)) throw new ApiError("User not found")

  const jsonData = user.toJSON();
  //@ts-ignore
  delete jsonData.password;
  var token = sign(jsonData, process.env.JWT_SECRET || 'aa');
  res.send({ ...jsonData, token });
}));

userRoutes.post('/register', validateParams(checkSchema({
  firstName: {
    in: ['body'],
    exists: {
      errorMessage: 'Missing field'
    },
    trim: true
  },
  lastName: {
    in: ['body'],
    exists: {
      errorMessage: 'Missing field'
    },
    trim: true
  },
  email: {
    in: ['body'],
    exists: {
      errorMessage: 'Missing field'
    },
    trim: true,
    normalizeEmail: true
  },
  password: {
    in: ['body'],
    exists: {
      errorMessage: 'Missing field'
    },
    trim: true
  },
  phoneNumber: {
    in: ['body'],
    exists: {
      errorMessage: 'Missing field'
    },
    trim: true
  },
  companyTitle: {
    in: ['body'],
    exists: {
      errorMessage: 'Missing field'
    },
    trim: true
  },
  companyName: {
    in: ['body'],
    exists: {
      errorMessage: 'Missing field'
    },
    trim: true
  }
})), asyncHandler(async (req, res) => {
  const { password ,...fields} = req.body;

  const hashedPass = await hash(password, 8)
  await UserModel.create({ password: hashedPass, ...fields})
  res.send({ success: 'User created' });
}));