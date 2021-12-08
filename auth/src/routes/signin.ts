import express, {Request, Response} from "express";
import { body } from 'express-validator';
import jwt from "jsonwebtoken";

import { Password } from "../services/password";
import { validateRequest } from "../middlewares/validate-request";
import { BadRequestError } from "../errors/bad-request-error";
import { User } from "../modals/user";

const router = express.Router();

router.post("/api/users/signin",
[
  body('email')
  .isEmail()
  .withMessage('Email must be valid'),
  body('password')
  .trim()
  .notEmpty()
  .withMessage('you must apply a password')
],
validateRequest,
async(req: Request, res: Response) => {
  const { email, password } = req.body;

  const isExist = await User.findOne({ email });

  if(!isExist) {
    throw new BadRequestError('Invalid credentials');
  }

  const passwordMatch = await Password.compare(isExist.password, password);

  if(!passwordMatch) {
    throw new BadRequestError('Invalid credentials');
  }

  //Generate JWT
  const userJwt = jwt.sign({
    id: isExist.id,
    email: isExist.email
  }, process.env.JWT_KEY!);

  //Store it on session
  req.session = {
    jwt: userJwt
  }

  res.status(200).send(isExist);
});

export { router as signinRouter };