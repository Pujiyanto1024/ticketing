import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { RequestValidationError } from "../errors/request-validation-error";
import { DbConnectionError } from "../errors/db-connection-error";

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

    console.log("Creating users...");
    throw new DbConnectionError();

    res.send({});
});

export { router as signupRouter };