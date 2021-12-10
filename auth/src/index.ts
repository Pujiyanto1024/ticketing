import express from "express";
import 'express-async-errors';
import { json } from 'body-parser';
import mongoose from 'mongoose';
import cookieSession from "cookie-session";
import cors from 'cors';

import { currentUserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { signupRouter } from "./routes/signup";
import { errorHandler } from "./middlewares/error-handler";
import { NotFoundError } from "./errors/not-found-error";

const app = express();
// app.use(cors());
app.set('trust proxy', true);
app.use(json());
app.use(cookieSession({
  signed: false,
  secure: true
}));

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.all("*", async(req, res) => {
  throw new NotFoundError();
})

app.use(errorHandler);

const startUp = async() => {
  if (!process.env.JWT_KEY) {
    throw new Error('Error ENV');
  }

  if (!process.env.MONGO_URI) {
    throw new Error('Error ENV');
  }

  try {
    //local
    // await mongoose.connect("mongodb://127.0.0.1:27017/auth");

    //ingress-nginx
    await mongoose.connect(process.env.MONGO_URI);
    console.log("mongo auth connected");
  } catch(e) {
    console.error(e);
  }
};

app.listen(3000, () => {
  console.log("Listening on port 3000");
});

startUp();