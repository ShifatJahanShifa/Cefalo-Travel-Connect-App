import express from 'express';
import { authenticate } from "../middlewares/auth.middleware.js";
import { createWishlist, deleteWishlist, getWishlistById, getWishlists, updateWishlist, shareWishlist, toggleVisibility } from "../controllers/wishlist.controller.js";
import { validateWishlistCreationData } from "../validations/validationMiddlewares/wishlist.validation.js";
export const wishlistRouter = express.Router();
wishlistRouter.get('/grouped/users', (req, res) => {
    res.json({ message: 'Route works!' });
});
wishlistRouter.post('/', authenticate, validateWishlistCreationData, createWishlist);
wishlistRouter.get('/', authenticate, getWishlists);
wishlistRouter.get('/shared/:wishlist_id', getWishlistById);
wishlistRouter.get('/:wishlist_id', authenticate, getWishlistById);
wishlistRouter.patch('/:wishlist_id', authenticate, validateWishlistCreationData, updateWishlist);
wishlistRouter.delete('/:wishlist_id', authenticate, deleteWishlist);
wishlistRouter.get('/:wishlist_id/share', authenticate, shareWishlist);
wishlistRouter.patch('/:wishlist_id/visibility', authenticate, toggleVisibility);
