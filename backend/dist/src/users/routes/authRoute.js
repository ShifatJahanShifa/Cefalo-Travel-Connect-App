import express from 'express';
import { signup, signin, signout, getUser } from "../controllers/authController.js";
import { authenticate } from "../middlewares/auhMiddleware.js";
export const authRouter = express.Router();
authRouter.post('/signup', signup);
authRouter.post('/signin', signin);
authRouter.post('/signout', signout);
authRouter.get('/me', authenticate, getUser);
