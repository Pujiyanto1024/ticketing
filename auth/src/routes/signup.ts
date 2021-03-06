import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { RequestValidationError } from "../errors/request-validation-error";
import { DbConnectionError } from "../errors/db-connection-error";
import { BadRequestError } from "../errors/bad-request-error";
import { User } from "../modals/user";

const router = express.Router();

router.post("/api/users/signup", [
    body('email')
    .isEmail()
    .withMessage("Email must be valid"),
    body('password')
    .trim()
    .isLength({min: 4, max: 10})
    .withMessage("Password must be between 4 - 10 characters")
], async(req: Request, res: Response) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
      throw new RequestValidationError(errors.array())
    }
    const { email, password } = req.body;

    const isExist = await User.findOne({ email });

    if(isExist) {
      throw new BadRequestError('Email in use');
    }

    const user = User.build({ email, password });

    await user.save();

    res.status(201).send(user);
});

export { router as signupRouter };