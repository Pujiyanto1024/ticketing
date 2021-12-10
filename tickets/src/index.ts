import express from "express";
import 'express-async-errors';
import { json } from 'body-parser';
import mongoose from 'mongoose';
import cookieSession from "cookie-session";
import cors from 'cors';


import { errorHandler } from "./middlewares/error-handler";
import { currentUser } from "./middlewares/current-user";
import { NotFoundError } from "./errors/not-found-error";

import { createTicketRouter } from "./routes/create-tickets";

const app = express();
// app.use(cors());
app.set('trust proxy', true);
app.use(json());
app.use(cookieSession({
  signed: false,
  secure: true
}));

app.use(currentUser);

app.use(createTicketRouter);

app.all("*", async(req, res) => {
  throw new NotFoundError();
})

app.use(errorHandler);

const startUp = async() => {
  if (!process.env.JWT_KEY) {
    throw new Error('Error ENV');
  }

  if(!process.env.MONGO_URI) {
    throw new Error("Error mongo URI");
  }

  try {
    //local
    // await mongoose.connect("mongodb://127.0.0.1:27017/auth");

    //ingress-nginx
    await mongoose.connect(process.env.MONGO_URI);
    console.log("mongo tickets connected");
  } catch(e) {
    console.error(e);
  }
};

app.listen(3000, () => {
  console.log("Listening on port 3000");
});

startUp();