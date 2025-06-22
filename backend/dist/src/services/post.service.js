var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { PostResponseDTO } from "../DTOs/post.dto.js";
import accommodationDao from "../repositories/dao/accommodation.dao.js";
import postAccommodationDao from "../repositories/dao/post_accommodation.dao.js";
import transportDao from "../repositories/dao/transport.dao.js";
import postTransportDao from "../repositories/dao/post_transport.dao.js";
import placeDao from "../repositories/dao/place.dao.js";
import postPlaceDao from "../repositories/dao/post_place.dao.js";
import restaurantDao from "../repositories/dao/restaurant.dao.js";
import postRestaurantDao from "../repositories/dao/post_restaurant.dao.js";
import postImageDao from "../repositories/dao/post_image.dao.js";
import posttDAO from "../repositories/dao/postt.dao.js";
import { dbClient } from "../db/db.js";
import { AppError } from "../utils/appError.js";
import postInteractionDao from "../repositories/dao/post_interaction.dao.js";
// import { AppError } from "../../utils/appError.ts";
const db = dbClient.getConnection();
export const createPost = (input) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
    const createdPost = yield posttDAO.createPost(input);
    const post_id = createdPost.post_id;
    if ((_a = input.accommodations) === null || _a === void 0 ? void 0 : _a.length) {
        // at first search in accommodations table
        for (let index = 0; index < ((_b = input.accommodations) === null || _b === void 0 ? void 0 : _b.length); index++) {
            const accommodationRecord = yield accommodationDao.getAccommodationByTypeAndName(input.accommodations[index].accommodation_type, input.accommodations[index].accommodation_name);
            if (accommodationRecord) {
                yield postAccommodationDao.createPostAccommodation(post_id, accommodationRecord.accommodation_id, input.accommodations[index].cost, input.accommodations[index].rating, input.accommodations[index].review);
            }
            else {
                // nothing
            }
        }
    }
    if ((_c = input.transports) === null || _c === void 0 ? void 0 : _c.length) {
        for (let index = 0; index < ((_d = input.transports) === null || _d === void 0 ? void 0 : _d.length); index++) {
            const transportRecord = yield transportDao.getTransportByTypeAndName(input.transports[index].transport_type, input.transports[index].transport_name);
            if (transportRecord) {
                yield postTransportDao.createPostTransport(post_id, transportRecord.transport_id, input.transports[index].cost, input.transports[index].rating, input.transports[index].review);
            }
            else {
                // nothing
            }
        }
    }
    if ((_e = input.places) === null || _e === void 0 ? void 0 : _e.length) {
        for (let index = 0; index < ((_f = input.places) === null || _f === void 0 ? void 0 : _f.length); index++) {
            const placeRecord = yield placeDao.getPlaceByName(input.places[index].place_name);
            if (placeRecord) {
                yield postPlaceDao.createPostPlace(post_id, placeRecord.place_id, input.places[index].rating, input.places[index].review);
            }
            else {
                // nothing
            }
        }
    }
    if ((_g = input.restaurants) === null || _g === void 0 ? void 0 : _g.length) {
        for (let index = 0; index < ((_h = input.restaurants) === null || _h === void 0 ? void 0 : _h.length); index++) {
            const restaurantRecord = yield restaurantDao.getRestaurantByName(input.restaurants[index].restaurant_name);
            if (restaurantRecord) {
                yield postRestaurantDao.createPostRestaurant(post_id, restaurantRecord.restaurant_id, input.restaurants[index].cost, input.restaurants[index].rating, input.restaurants[index].review);
            }
            else {
                // nothing
            }
        }
    }
    if ((_j = input.images) === null || _j === void 0 ? void 0 : _j.length) {
        for (let index = 0; index < ((_k = input.images) === null || _k === void 0 ? void 0 : _k.length); index++) {
            yield postImageDao.createPostImage(post_id, input.images[index].image_url, input.images[index].caption);
        }
    }
    return "post created";
});
export const getAllPosts = (page, limit) => __awaiter(void 0, void 0, void 0, function* () {
    const offset = (page - 1) * limit;
    const posts = yield posttDAO.getAllPosts(page, limit);
    const enrichedPosts = yield Promise.all(posts.map((post) => __awaiter(void 0, void 0, void 0, function* () {
        const post_id = post.post_id;
        const [postTransports, postPlaces, postAccommodations, postRestaurants, images] = yield Promise.all([
            postTransportDao.getById(post_id),
            postPlaceDao.getById(post_id),
            postAccommodationDao.getById(post_id),
            postRestaurantDao.getById(post_id),
            postImageDao.getById(post_id)
        ]);
        const transportIds = postTransports.map((t) => t.transport_id).filter(Boolean);
        const placeIds = postPlaces.map((p) => p.place_id).filter(Boolean);
        const accommodationIds = postAccommodations.map(a => a.accommodation_id).filter(Boolean);
        const restaurantIds = postRestaurants.map((r) => r.restaurant_id).filter(Boolean);
        const [transportsData, placesData, accommodationsData, restaurantsData] = yield Promise.all([
            transportIds.length ? transportDao.getById(transportIds) : [],
            placeIds.length ? placeDao.getById(placeIds) : [],
            accommodationIds.length ? accommodationDao.getById(accommodationIds) : [],
            restaurantIds.length ? restaurantDao.getById(restaurantIds) : []
        ]);
        const transports = postTransports.map((postItem) => {
            const core = transportsData.find(t => t.transport_id === postItem.transport_id);
            return Object.assign(Object.assign({}, (core !== null && core !== void 0 ? core : {})), postItem);
        });
        const places = postPlaces.map((postItem) => {
            const core = placesData.find(p => p.place_id === postItem.place_id);
            return Object.assign(Object.assign({}, (core !== null && core !== void 0 ? core : {})), postItem);
        });
        const accommodations = postAccommodations.map(postItem => {
            const core = accommodationsData.find(a => a.accommodation_id === postItem.accommodation_id);
            return Object.assign(Object.assign({}, (core !== null && core !== void 0 ? core : {})), postItem);
        });
        const restaurants = postRestaurants.map((postItem) => {
            const core = restaurantsData.find(r => r.restaurant_id === postItem.restaurant_id);
            return Object.assign(Object.assign({}, (core !== null && core !== void 0 ? core : {})), postItem);
        });
        return Object.assign(Object.assign({}, post), { transports,
            places,
            accommodations,
            restaurants,
            images });
    })));
    return enrichedPosts.map((post) => new PostResponseDTO(post));
});
export const getPostByPostID = (post_id) => __awaiter(void 0, void 0, void 0, function* () {
    const post = yield posttDAO.getPostByPostID(post_id);
    if (!post) {
        throw new AppError('post not found', 404);
    }
    const [postTransports, postPlaces, postAccommodations, postRestaurants, images] = yield Promise.all([
        postTransportDao.getById(post_id),
        postPlaceDao.getById(post_id),
        postAccommodationDao.getById(post_id),
        postRestaurantDao.getById(post_id),
        postImageDao.getById(post_id)
    ]);
    const transportIds = postTransports.map((t) => t.transport_id).filter(Boolean);
    const placeIds = postPlaces.map((p) => p.place_id).filter(Boolean);
    const accommodationIds = postAccommodations.map(a => a.accommodation_id).filter(Boolean);
    const restaurantIds = postRestaurants.map((r) => r.restaurant_id).filter(Boolean);
    const [transportsData, placesData, accommodationsData, restaurantsData] = yield Promise.all([
        transportIds.length ? transportDao.getById(transportIds) : [],
        placeIds.length ? placeDao.getById(placeIds) : [],
        accommodationIds.length ? accommodationDao.getById(accommodationIds) : [],
        restaurantIds.length ? restaurantDao.getById(restaurantIds) : []
    ]);
    const transports = postTransports.map((postItem) => {
        const core = transportsData.find(t => t.transport_id === postItem.transport_id);
        return Object.assign(Object.assign({}, (core !== null && core !== void 0 ? core : {})), postItem);
    });
    const places = postPlaces.map((postItem) => {
        const core = placesData.find(p => p.place_id === postItem.place_id);
        return Object.assign(Object.assign({}, (core !== null && core !== void 0 ? core : {})), postItem);
    });
    const accommodations = postAccommodations.map(postItem => {
        const core = accommodationsData.find(a => a.accommodation_id === postItem.accommodation_id);
        return Object.assign(Object.assign({}, (core !== null && core !== void 0 ? core : {})), postItem);
    });
    const restaurants = postRestaurants.map((postItem) => {
        const core = restaurantsData.find(r => r.restaurant_id === postItem.restaurant_id);
        return Object.assign(Object.assign({}, (core !== null && core !== void 0 ? core : {})), postItem);
    });
    const enrichedPost = Object.assign(Object.assign({}, post), { transports,
        places,
        accommodations,
        restaurants,
        images });
    return new PostResponseDTO(enrichedPost);
});
export const updatePost = (post_id, input) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e;
    const existingPost = yield posttDAO.updatePost(post_id, input);
    if (!existingPost) {
        throw new AppError("Post not found", 404);
    }
    if ((_a = input.accommodations) === null || _a === void 0 ? void 0 : _a.length) {
        for (const acc of input.accommodations) {
            const accommodationRecord = yield accommodationDao.getAccommodationByTypeAndName(acc.accommodation_type, acc.accommodation_name);
            if (accommodationRecord) {
                yield postAccommodationDao.updatePostAccommodation(post_id, accommodationRecord.accommodation_id, acc.cost, acc.rating, acc.review);
            }
        }
    }
    if ((_b = input.transports) === null || _b === void 0 ? void 0 : _b.length) {
        for (const tr of input.transports) {
            const transportRecord = yield transportDao.getTransportByTypeAndName(tr.transport_type, tr.transport_name);
            if (transportRecord) {
                yield postTransportDao.updatePostTransport(post_id, transportRecord.transport_id, tr.cost, tr.rating, tr.review);
            }
        }
    }
    if ((_c = input.places) === null || _c === void 0 ? void 0 : _c.length) {
        for (const pl of input.places) {
            const placeRecord = yield placeDao.getPlaceByName(pl.place_name);
            if (placeRecord) {
                yield postPlaceDao.updatePostPlace(post_id, placeRecord.place_id, pl.rating, pl.review);
            }
        }
    }
    if ((_d = input.restaurants) === null || _d === void 0 ? void 0 : _d.length) {
        for (const res of input.restaurants) {
            const restaurantRecord = yield restaurantDao.getRestaurantByName(res.restaurant_name);
            if (restaurantRecord) {
                yield postRestaurantDao.updatePostRestaurant(post_id, restaurantRecord.restaurant_id, res.cost, res.rating, res.review);
            }
        }
    }
    if ((_e = input.images) === null || _e === void 0 ? void 0 : _e.length) {
        yield postImageDao.deleteById(post_id);
        for (const img of input.images) {
            yield postImageDao.createPostImage(post_id, img.image_url, img.caption);
        }
    }
    return "Post updated successfully";
});
export const deletePost = (post_id) => __awaiter(void 0, void 0, void 0, function* () {
    const status = yield posttDAO.deletePost(post_id);
    return status;
});
export const getPostsByUserID = (user_id) => __awaiter(void 0, void 0, void 0, function* () {
    const posts = yield posttDAO.getPostsByUserID(user_id);
    const enrichedPosts = yield Promise.all(posts.map((post) => __awaiter(void 0, void 0, void 0, function* () {
        const post_id = post.post_id;
        const [postTransports, postPlaces, postAccommodations, postRestaurants, images] = yield Promise.all([
            postTransportDao.getById(post_id),
            postPlaceDao.getById(post_id),
            postAccommodationDao.getById(post_id),
            postRestaurantDao.getById(post_id),
            postImageDao.getById(post_id)
        ]);
        const transportIds = postTransports.map((t) => t.transport_id).filter(Boolean);
        const placeIds = postPlaces.map((p) => p.place_id).filter(Boolean);
        const accommodationIds = postAccommodations.map(a => a.accommodation_id).filter(Boolean);
        const restaurantIds = postRestaurants.map((r) => r.restaurant_id).filter(Boolean);
        const [transportsData, placesData, accommodationsData, restaurantsData] = yield Promise.all([
            transportIds.length ? transportDao.getById(transportIds) : [],
            placeIds.length ? placeDao.getById(placeIds) : [],
            accommodationIds.length ? accommodationDao.getById(accommodationIds) : [],
            restaurantIds.length ? restaurantDao.getById(restaurantIds) : []
        ]);
        const transports = postTransports.map((postItem) => {
            const core = transportsData.find(t => t.transport_id === postItem.transport_id);
            return Object.assign(Object.assign({}, (core !== null && core !== void 0 ? core : {})), postItem);
        });
        const places = postPlaces.map((postItem) => {
            const core = placesData.find(p => p.place_id === postItem.place_id);
            return Object.assign(Object.assign({}, (core !== null && core !== void 0 ? core : {})), postItem);
        });
        const accommodations = postAccommodations.map(postItem => {
            const core = accommodationsData.find(a => a.accommodation_id === postItem.accommodation_id);
            return Object.assign(Object.assign({}, (core !== null && core !== void 0 ? core : {})), postItem);
        });
        const restaurants = postRestaurants.map((postItem) => {
            const core = restaurantsData.find(r => r.restaurant_id === postItem.restaurant_id);
            return Object.assign(Object.assign({}, (core !== null && core !== void 0 ? core : {})), postItem);
        });
        return Object.assign(Object.assign({}, post), { transports,
            places,
            accommodations,
            restaurants,
            images });
    })));
    return enrichedPosts;
});
export const searchPosts = (filters) => __awaiter(void 0, void 0, void 0, function* () {
    const posts = yield posttDAO.searchPosts(filters);
    console.log(posts);
    const enrichedPosts = yield Promise.all(posts.map(p => {
        return getPostByPostID(p.post_id);
    }));
    return enrichedPosts.map((post) => new PostResponseDTO(post));
});
export const togglePostLike = (post_id, user_id) => __awaiter(void 0, void 0, void 0, function* () {
    // at first check whether the entry is in the post interaction tablke or not 
    const data = yield postInteractionDao.getPostInteraction(post_id, user_id, "like");
    let status;
    if (data) {
        // dele 
        yield postInteractionDao.deletePostInteraction(post_id, user_id, "like");
        status = yield posttDAO.togglePostLike(post_id, false);
    }
    else {
        const data = yield postInteractionDao.createPostInteraction(post_id, user_id, "like", "liked");
        status = yield posttDAO.togglePostLike(post_id, true);
    }
    return status;
});
