import * as ProximityService from "../services/proximity.service.js";
import * as UserService from "../services/user.service.js";
import * as WishlistService from "../services/wishlist.service.js";
import { getDistanceInKm } from "../utils/getDistance.js";
export const createProximity = async (req, res, next) => {
    try {
        // retrieving user_id 
        const user = await UserService.getUserByUsername(req.username);
        // only adding for wishlist now. later may consider other services
        const payload = {
            user_id: user.user_id,
            type: req.body.type,
            reference_id: req.body.reference_id,
            radius: req.body.radius
        };
        const result = await ProximityService.createProximity(payload);
        res.status(201).json(result);
    }
    catch (error) {
        next(error);
    }
};
export const findUserProximity = async (req, res, next) => {
    try {
        const user = await UserService.getUserByUsername(req.username);
        const result = await ProximityService.findUserProximity(user.user_id);
        res.status(201).json(result);
    }
    catch (error) {
        next(error);
    }
};
export const updateProximity = async (req, res, next) => {
    try {
        // retrieving user_id 
        const user = await UserService.getUserByUsername(req.username);
        // only adding for wishlist now. later may consider other services
        const payload = {
            user_id: user.user_id,
            type: req.body.type,
            reference_id: req.body.reference_id,
            radius: req.body.radius
        };
        const result = await ProximityService.updateProximity(payload);
        res.status(200).json(result);
    }
    catch (error) {
        next(error);
    }
};
export const deleteProximity = async (req, res, next) => {
    try {
        // retrieving user_id 
        const user = await UserService.getUserByUsername(req.username);
        // only adding for wishlist now. later may consider other services
        const payload = {
            user_id: user.user_id,
            type: req.body.type,
            reference_id: req.body.reference_id,
            radius: req.body.radius
        };
        const result = await ProximityService.deleteProximity(payload);
        res.status(204).json(result);
    }
    catch (error) {
        next(error);
    }
};
export const checkProximities = async (req, res, next) => {
    try {
        const alerts = [];
        const user = await UserService.getUserByUsername(req.username);
        const { userLat, userLong } = req.body;
        const proximities = await ProximityService.findUserProximity(user.user_id);
        for (const proximity of proximities) {
            const wishlist = await WishlistService.getWishlistById(proximity.reference_id);
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
};
