import * as WishlistService from "../services/wishlist.service.js";
import * as UserService from "../services/user.service.js";
import * as PlaceService from "../services/place.service.js";
import dotenv from 'dotenv';
dotenv.config();
export const createWishlist = async (req, res, next) => {
    try {
        const user = await UserService.getUserByUsername(req.username);
        console.log(req.username);
        const payload = req.body;
        let place = await PlaceService.getPlaceByName(req.body.place_name);
        if (!place) {
            const data = {
                place_name: req.body.place_name,
                latitude: req.body.latitude,
                longitude: req.body.longitude
            };
            place = await PlaceService.createPlace(data);
        }
        payload.user_id = user.user_id;
        payload.reference_id = place.place_id;
        const wishlist = await WishlistService.createWishlist(payload);
        res.status(201).json(wishlist);
    }
    catch (error) {
        next(error);
    }
};
export const getWishlists = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);
        const wishlists = await WishlistService.getWishlists(page, limit);
        res.status(200).json(wishlists);
    }
    catch (err) {
        next(err);
    }
};
export const getWishlistById = async (req, res, next) => {
    try {
        const wishlist_id = (req.params.wishlist_id);
        const wishlist = await WishlistService.getWishlistById(wishlist_id);
        res.status(200).json(wishlist);
    }
    catch (err) {
        next(err);
    }
};
export const updateWishlist = async (req, res, next) => {
    try {
        const wishlist_id = (req.params.wishlist_id);
        const user = await UserService.getUserByUsername(req.username);
        const payload = req.body;
        const place = await PlaceService.getPlaceByName(req.body.place_name);
        payload.user_id = user.user_id;
        payload.reference_id = place?.place_id;
        const wishlist = await WishlistService.updateWishlist(wishlist_id, payload);
        res.status(200).json(wishlist);
    }
    catch (err) {
        next(err);
    }
};
export const deleteWishlist = async (req, res, next) => {
    try {
        const wishlist_id = (req.params.wishlist_id);
        const user = await UserService.getUserByUsername(req.username);
        const wishlist = await WishlistService.deleteWishlist(wishlist_id, user.user_id);
        res.status(204).json(wishlist);
    }
    catch (err) {
        next(err);
    }
};
export const getWishlistByUserid = async (req, res, next) => {
    try {
        // at first i will get user_id from user table
        const username = req.params.username;
        const user = await UserService.getUserByUsername(username);
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);
        // call the post service 
        const wishlists = await WishlistService.getWishlistByUserid(user.user_id, page, limit);
        res.status(200).json(wishlists);
    }
    catch (error) {
        next(error);
    }
};
export const shareWishlist = async (req, res) => {
    const wishlist_id = (req.params.wishlist_id);
    const shareURL = `${process.env.BASE_URL}/shared/${wishlist_id}`;
    res.status(200).json(shareURL);
};
export const toggleVisibility = async (req, res, next) => {
    try {
        const wishlist_id = req.params.wishlist_id;
        const result = await WishlistService.toggleVisibility(wishlist_id);
        res.status(200).json(result);
    }
    catch (err) {
        next(err);
    }
};
export const groupUsersByWishlistTheme = async (req, res, next) => {
    try {
        const theme = req.body.theme;
        const results = await WishlistService.groupUsersByWishlistTheme(theme);
        res.status(200).json(results);
    }
    catch (error) {
        next(error);
    }
};
