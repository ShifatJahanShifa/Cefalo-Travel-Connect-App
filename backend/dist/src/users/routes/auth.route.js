import express from 'express';
import { signup, signin, signout, getUser } from "../controllers/auth.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
export const authRouter = express.Router();
authRouter.post('/signup', signup);
authRouter.post('/signin', signin);
authRouter.post('/signout', signout);
authRouter.get('/me', authenticate, getUser);
