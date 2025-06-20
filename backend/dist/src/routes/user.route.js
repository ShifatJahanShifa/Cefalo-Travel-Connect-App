import express from 'express';
import { getAllUsers, getUserByUsername, updateUserByUsername, deleteUserByUsername } from "../controllers/user.controller.js";
import { authenticate, authorizeAdmin, authorize } from "../middlewares/auth.middleware.js";
import { validatePagination } from "../validations/validationMiddlewares/pagination.validation.js";
import { validateUpdateUser } from "../validations/validationMiddlewares/user.validation.js";
import { getPostsByUserID } from "../controllers/post.controller.js";
export const userRouter = express.Router();
userRouter.get('/', authenticate, validatePagination, getAllUsers); // done
userRouter.get('/:username', authenticate, getUserByUsername); // done
userRouter.patch('/:username', authenticate, authorize, validateUpdateUser, updateUserByUsername); // done
userRouter.delete('/:username', authenticate, authorizeAdmin, deleteUserByUsername); // done
userRouter.get('/:username/posts', authenticate, getPostsByUserID);
