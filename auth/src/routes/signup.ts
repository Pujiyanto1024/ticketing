import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import jwt from "jsonwebtoken";

import { DbConnectionError } from "../errors/db-connection-error";
import { BadRequestError } from "../errors/bad-request-error";
import { User } from "../modals/user";
import { validateRequest } from "../middlewares/validate-request";

const router = express.Router();

router.post("/api/users/signup", [
    body('email')
    .isEmail()
    .withMessage("Email must be valid"),
    body('password')
    .trim()
    .isLength({min: 4, max: 10})
    .withMessage("Password must be between 4 - 10 characters")
], validateRequest,async(req: Request, res: Response) => {
    const { email, password } = req.body;

    const isExist = await User.findOne({ email });

    if(isExist) {
      throw new BadRequestError('Email in use');
    }

    const user = User.build({ email, password });
    await user.save();

    //Generate JWT
    const userJwt = jwt.sign({
      id: user.id,
      email: user.email
    }, process.env.JWT_KEY!);

    //Store it on session
    req.session = {
      jwt: userJwt
    }

    res.status(201).send(user);
});

export { router as signupRouter };