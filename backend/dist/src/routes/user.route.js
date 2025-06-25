import express from 'express';
import { getAllUsers, getUserByUsername, updateUserByUsername, deleteUserByUsername } from "../controllers/user.controller.js";
import { authenticate, authorizeAdmin, authorize } from "../middlewares/auth.middleware.js";
import { validatePagination } from "../validations/validationMiddlewares/pagination.validation.js";
import { validateUpdateUser } from "../validations/validationMiddlewares/user.validation.js";
import { getPostsByUserID } from "../controllers/post.controller.js";
import { getWishlistByUserid } from "../controllers/wishlist.controller.js";
import { getNotificationByUserId } from "../controllers/notification.controller.js";
import { getTravelPlanByMemberId } from "../controllers/travelplan.controller.js";
export const userRouter = express.Router();
userRouter.get('/', authenticate, validatePagination, getAllUsers); // done
// add getme 
userRouter.get('/:username', authenticate, getUserByUsername); // done
userRouter.patch('/:username', authenticate, authorize, validateUpdateUser, updateUserByUsername); // done
userRouter.delete('/:username', authenticate, authorizeAdmin, deleteUserByUsername); // done
userRouter.get('/:username/posts', authenticate, getPostsByUserID);
userRouter.get('/:username/wishlists', authenticate, getWishlistByUserid);
userRouter.get('/:username/travelplans', authenticate, getTravelPlanByMemberId);
userRouter.get('/:username/notifications', authenticate, getNotificationByUserId);
