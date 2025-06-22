var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as WishlistService from "../services/wishlist.service.js";
import * as UserService from "../services/user.service.js";
import * as PlaceService from "../services/place.service.js";
import dotenv from 'dotenv';
dotenv.config();
export const createWishlist = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield UserService.getUserByUsername(req.username);
        const payload = req.body;
        const place = yield PlaceService.getPlaceByName(req.body.place_name);
        payload.user_id = user.user_id;
        payload.reference_id = place.place_id;
        const wishlist = yield WishlistService.createWishlist(payload);
        res.status(201).json(wishlist);
    }
    catch (error) {
        next(error);
    }
});
export const getWishlists = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);
        const wishlists = yield WishlistService.getWishlists(page, limit);
        res.status(200).json(wishlists);
    }
    catch (err) {
        next(err);
    }
});
export const getWishlistById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const wishlist_id = (req.params.wishlist_id);
        const wishlist = yield WishlistService.getWishlistById(wishlist_id);
        res.status(200).json(wishlist);
    }
    catch (err) {
        next(err);
    }
});
export const updateWishlist = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const wishlist_id = (req.params.wishlist_id);
        const user = yield UserService.getUserByUsername(req.username);
        const payload = req.body;
        const place = yield PlaceService.getPlaceByName(req.body.place_name);
        payload.user_id = user.user_id;
        payload.reference_id = place.place_id;
        const wishlist = yield WishlistService.updateWishlist(wishlist_id, payload);
        res.status(200).json(wishlist);
    }
    catch (err) {
        next(err);
    }
});
export const deleteWishlist = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const wishlist_id = (req.params.wishlist_id);
        const wishlist = yield WishlistService.deleteWishlist(wishlist_id);
        console.log("heeee");
        res.status(204).json(wishlist);
    }
    catch (err) {
        next(err);
    }
});
export const getWishlistByUserid = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // at first i will get user_id from user table
        const username = req.params.username;
        const user = yield UserService.getUserByUsername(username);
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);
        // call the post service 
        const wishlists = yield WishlistService.getWishlistByUserid(user.user_id, page, limit);
        res.status(200).json(wishlists);
    }
    catch (error) {
        next(error);
    }
});
export const shareWishlist = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const wishlist_id = (req.params.wishlist_id);
    const shareURL = `${process.env.BASE_URL}/shared/${wishlist_id}`;
    res.status(200).json(shareURL);
});
export const toggleVisibility = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const wishlist_id = req.params.wishlist_id;
        const result = yield WishlistService.toggleVisibility(wishlist_id);
        res.status(200).json(result);
    }
    catch (err) {
        next(err);
    }
});
