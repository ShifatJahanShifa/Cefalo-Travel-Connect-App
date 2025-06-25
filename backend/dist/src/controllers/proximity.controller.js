var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as ProximityService from "../services/proximity.service.js";
import * as UserService from "../services/user.service.js";
import * as WishlistService from "../services/wishlist.service.js";
import { getDistanceInKm } from "../utils/getDistance.js";
export const createProximity = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // retrieving user_id 
        const user = yield UserService.getUserByUsername(req.username);
        // only adding for wishlist now. later may consider other services
        const payload = {
            user_id: user.user_id,
            type: req.body.type,
            reference_id: req.body.reference_id,
            radius: req.body.radius
        };
        const result = yield ProximityService.createProximity(payload);
        res.status(201).json(result);
    }
    catch (error) {
        next(error);
    }
});
export const findUserProximity = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield UserService.getUserByUsername(req.username);
        const result = yield ProximityService.findUserProximity(user.user_id);
        res.status(201).json(result);
    }
    catch (error) {
        next(error);
    }
});
export const updateProximity = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // retrieving user_id 
        const user = yield UserService.getUserByUsername(req.username);
        // only adding for wishlist now. later may consider other services
        const payload = {
            user_id: user.user_id,
            type: req.body.type,
            reference_id: req.body.reference_id,
            radius: req.body.radius
        };
        const result = yield ProximityService.updateProximity(payload);
        res.status(200).json(result);
    }
    catch (error) {
        next(error);
    }
});
export const deleteProximity = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // retrieving user_id 
        const user = yield UserService.getUserByUsername(req.username);
        // only adding for wishlist now. later may consider other services
        const payload = {
            user_id: user.user_id,
            type: req.body.type,
            reference_id: req.body.reference_id,
            radius: req.body.radius
        };
        const result = yield ProximityService.deleteProximity(payload);
        res.status(204).json(result);
    }
    catch (error) {
        next(error);
    }
});
export const checkProximities = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const alerts = [];
        const user = yield UserService.getUserByUsername(req.username);
        const { userLat, userLong } = req.body;
        const proximities = yield ProximityService.findUserProximity(user.user_id);
        for (const proximity of proximities) {
            const wishlist = yield WishlistService.getWishlistById(proximity.reference_id);
            const latitude = wishlist.place_latitude;
            const longitude = wishlist.place_longitude;
            const distance = getDistanceInKm(userLat, userLong, latitude, longitude);
            if (distance <= Number(proximity.radius)) {
                alerts.push({
                    wishlist_id: wishlist.wishlist_id,
                    title: wishlist.title,
                    place: wishlist.place_name,
                    distance,
                    threshold: proximity.radius,
                });
                ProximityService.deleteProximityById(proximity.proximity_id);
            }
        }
        res.status(200).json(alerts);
    }
    catch (error) {
        next(error);
    }
});
