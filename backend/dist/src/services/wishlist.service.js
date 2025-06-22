var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { WishlistDTO } from "../DTOs/wishlist.dto.js";
import placeDao from "../repositories/dao/place.dao.js";
import wishlistDao from "../repositories/dao/wishlist.dao.js";
import { AppError } from "../utils/appError.js";
import dotenv from 'dotenv';
dotenv.config();
export const createWishlist = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield wishlistDao.createWishlist(data);
    return new WishlistDTO(result);
});
export const getWishlists = (page, limit) => __awaiter(void 0, void 0, void 0, function* () {
    const results = yield wishlistDao.getWishlists(page, limit);
    if (!results || results.length === 0) {
        throw new AppError("wishlist not found", 404);
    }
    // adding place info 
    const filteredResults = results.filter(result => result.type === "place");
    const ids = [];
    for (let index = 0; index < filteredResults.length; index++) {
        ids.push(filteredResults[index].reference_id);
    }
    let placeMap = {};
    if (ids.length) {
        const places = yield placeDao.getById(ids);
        placeMap = places.reduce((acc, place) => {
            acc[place.place_id] = place;
            return acc;
        }, {});
    }
    const enrichedWishlists = results.map(wishlist => {
        if (wishlist.type === 'place') {
            const place = placeMap[wishlist.reference_id];
            if (place) {
                return Object.assign(Object.assign({}, wishlist), { place_name: place.place_name, place_latitude: place.latitude, place_longitude: place.longitude });
            }
        }
        return wishlist;
    });
    return enrichedWishlists.map((result) => new WishlistDTO(result));
});
export const getWishlistById = (wishlist_id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield wishlistDao.getWishlistById(wishlist_id);
    if (!result) {
        throw new AppError("wishlist not found", 404);
    }
    if (!result.is_public) {
        throw new AppError("wishlist is not public", 400);
    }
    if (result.type === 'place') {
        let ids = [];
        ids.push(result.reference_id);
        const place = yield placeDao.getById(ids);
        if (place) {
            result.place_latitude = place[0].latitude;
            result.place_longitude = place[0].longitude;
        }
    }
    return new WishlistDTO(result);
});
export const updateWishlist = (wishlist_id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield wishlistDao.updateWishlist(wishlist_id, payload);
    return result;
});
export const deleteWishlist = (wishlist_id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield wishlistDao.deleteWishlist(wishlist_id);
    return result;
});
export const getWishlistByUserid = (user_id, page, limit) => __awaiter(void 0, void 0, void 0, function* () {
    const results = yield wishlistDao.getWishlistByUserid(user_id, page, limit);
    if (!results || results.length === 0) {
        throw new AppError("wishlist not found", 404);
    }
    return results.map((result) => new WishlistDTO(result));
});
export const toggleVisibility = (wishlist_id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield wishlistDao.toggleVisibility(wishlist_id);
    return result;
});
