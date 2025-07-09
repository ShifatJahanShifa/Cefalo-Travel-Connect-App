import express, { Request, Response } from 'express'
import { authenticate } from '../middlewares/auth.middleware.ts'
import { createWishlist, deleteWishlist, getWishlistById, getWishlists, updateWishlist, shareWishlist, toggleVisibility, groupUsersByWishlistTheme } from '../controllers/wishlist.controller.ts'
import { validateWishlistCreationData } from '../validations/validationMiddlewares/wishlist.validation.ts'
export const wishlistRouter = express.Router()

// add authorization
// will fix it later
wishlistRouter.post('/grouped/users', authenticate, groupUsersByWishlistTheme)
wishlistRouter.post('/', authenticate, validateWishlistCreationData, createWishlist)
wishlistRouter.get('/', authenticate, getWishlists)
wishlistRouter.get('/shared/:wishlist_id', getWishlistById)
wishlistRouter.get('/:wishlist_id', authenticate, getWishlistById)
wishlistRouter.patch('/:wishlist_id', authenticate, validateWishlistCreationData, updateWishlist)
wishlistRouter.delete('/:wishlist_id', authenticate, deleteWishlist)
wishlistRouter.get('/:wishlist_id/share', authenticate, shareWishlist)
wishlistRouter.patch('/:wishlist_id/visibility', authenticate, toggleVisibility)
