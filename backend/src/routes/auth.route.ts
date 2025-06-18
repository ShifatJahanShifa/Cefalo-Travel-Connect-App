import express from 'express'
import { signup, signin, signout } from '../controllers/auth.controller.ts'
import { authenticate } from '../middlewares/auth.middleware.ts'
import { refreshAccessToken } from '../controllers/auth.controller.ts'
import { validateSignup, validateSignin} from '../validations/validationMiddlewares/auth.validation.ts'

export const authRouter=express.Router()

authRouter.post('/signup', validateSignup, signup)
authRouter.post('/signin', validateSignin, signin)
authRouter.post('/signout', authenticate, signout)
authRouter.get('/refresh-token', authenticate, refreshAccessToken)