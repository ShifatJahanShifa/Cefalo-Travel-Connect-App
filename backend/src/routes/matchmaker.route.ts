import express, { Request, Response } from 'express'
import { authenticate } from '../middlewares/auth.middleware.ts'
import { createWishlist, deleteWishlist, getWishlistById, getWishlists, updateWishlist, shareWishlist, toggleVisibility, groupUsersByWishlistTheme } from '../controllers/wishlist.controller.ts'
import { validateWishlistCreationData } from '../validations/validationMiddlewares/wishlist.validation.ts'
export const groupRouter = express.Router()

groupRouter.get('/users', (req: Request, res: Response) => {
  res.json({ message: 'Route works!' })})

