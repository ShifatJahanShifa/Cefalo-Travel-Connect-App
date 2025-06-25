import express from 'express'
import { Request, Response, NextFunction } from 'express'
import { getAllUsers, getUserByUsername, updateUserByUsername, deleteUserByUsername } from '../controllers/user.controller.ts'
import { authenticate, authorizeAdmin, authorize} from '../middlewares/auth.middleware.ts'
import { ExpressRequest } from '../middlewares/auth.middleware.ts'
import { validatePagination } from '../validations/validationMiddlewares/pagination.validation.ts'
import { validateUpdateUser } from '../validations/validationMiddlewares/user.validation.ts'
import { getPostsByUserID } from '../controllers/post.controller.ts'
import { getWishlistByUserid } from '../controllers/wishlist.controller.ts'
import { getNotificationByUserId } from '../controllers/notification.controller.ts'
import { getTravelPlanByMemberId } from '../controllers/travelplan.controller.ts'
export const userRouter=express.Router()

userRouter.get('/', authenticate, validatePagination, getAllUsers)   // done
// add getme 
userRouter.get('/:username', authenticate, getUserByUsername)  // done
userRouter.patch('/:username', authenticate, authorize, validateUpdateUser, updateUserByUsername) // done
userRouter.delete('/:username', authenticate, authorizeAdmin, deleteUserByUsername)  // done
userRouter.get('/:username/posts', authenticate, getPostsByUserID)
userRouter.get('/:username/wishlists', authenticate, getWishlistByUserid)
userRouter.get('/:username/travelplans', authenticate, getTravelPlanByMemberId)
userRouter.get('/:username/notifications', authenticate, getNotificationByUserId)