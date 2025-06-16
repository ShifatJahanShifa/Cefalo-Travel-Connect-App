import express from 'express';
import { getAllUsers, getUserByUsername, updateUserByUsername, deleteUserByUsername } from "../controllers/user.controller.js";
import { authenticate, authorizeAdmin, authorize } from "../middlewares/auth.middleware.js";
export const userRouter = express.Router();
userRouter.get('/', authenticate, getAllUsers); // done
userRouter.get('/:username', authenticate, getUserByUsername); // done
userRouter.put('/:username', authenticate, authorize, updateUserByUsername); // not created admin till now
userRouter.delete('/:username', authenticate, authorizeAdmin, deleteUserByUsername); // done
