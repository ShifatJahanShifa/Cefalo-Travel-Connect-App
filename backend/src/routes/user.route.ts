import express from 'express'
import { Request, Response, NextFunction } from 'express'
import { getAllUsers, getUserByUsername, updateUserByUsername, deleteUserByUsername } from '../controllers/user.controller.ts'
import { authenticate, authorizeAdmin, authorize} from '../middlewares/auth.middleware.ts'
import { ExpressRequest } from '../middlewares/auth.middleware.ts'
import { validatePagination } from '../validations/validationMiddlewares/pagination.validation.ts'
import { validateUpdateUser } from '../validations/validationMiddlewares/user.validation.ts'
export const userRouter=express.Router()

userRouter.get('/', authenticate, validatePagination, getAllUsers)   // done
userRouter.get('/:username', authenticate, getUserByUsername)  // done
userRouter.patch('/:username', authenticate, authorize, validateUpdateUser, updateUserByUsername) // done
userRouter.delete('/:username', authenticate, authorizeAdmin, deleteUserByUsername)  // done
