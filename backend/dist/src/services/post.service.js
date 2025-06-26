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
import postImageDao from "../repositories/dao/post_image.dao.js";
import posttDAO from "../repositories/dao/postt.dao.js";
import { dbClient } from "../db/db.js";
import { AppError } from "../utils/appError.js";
import postInteractionDao from "../repositories/dao/post_interaction.dao.js";
import postFoodDao from "../repositories/dao/post_food.dao.js";
import userDAO from "../repositories/dao/user.dao.js";
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
                // create  
                const data = {
                    accommodation_name: input.accommodations[index].accommodation_name,
                    accommodation_type: input.accommodations[index].accommodation_type,
                    latitude: input.accommodations[index].latitude,
                    longitude: input.accommodations[index].longitude
                };
                const accommodation = yield accommodationDao.createAccommodation(data);
                yield postAccommodationDao.createPostAccommodation(post_id, accommodation.accommodation_id, input.accommodations[index].cost, input.accommodations[index].rating, input.accommodations[index].review);
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
                const data = {
                    transport_type: input.transports[index].transport_type,
                    transport_name: input.transports[index].transport_name,
                };
                const transport = yield transportDao.createTransport(data);
                yield postTransportDao.createPostTransport(post_id, transport.transport_id, input.transports[index].cost, input.transports[index].rating, input.transports[index].review);
            }
        }
    }
    if ((_e = input.places) === null || _e === void 0 ? void 0 : _e.length) {
        for (let index = 0; index < ((_f = input.places) === null || _f === void 0 ? void 0 : _f.length); index++) {
            const placeRecord = yield placeDao.getPlaceByName(input.places[index].place_name);
            if (placeRecord) {
                yield postPlaceDao.createPostPlace(post_id, placeRecord.place_id, input.places[index].cost, input.places[index].rating, input.places[index].review);
            }
            else {
                // nothing
                const data = {
                    place_name: input.places[index].place_name,
                    latitude: input.places[index].latitude,
                    longitude: input.places[index].longitude
                };
                const place = yield placeDao.createPlace(data);
                yield postPlaceDao.createPostPlace(post_id, place.place_id, input.places[index].cost, input.places[index].rating, input.places[index].review);
            }
        }
    }
    if ((_g = input.foods) === null || _g === void 0 ? void 0 : _g.length) {
        for (let index = 0; index < ((_h = input.foods) === null || _h === void 0 ? void 0 : _h.length); index++) {
            yield postFoodDao.createPostFood(post_id, input.foods[index].food_name, input.foods[index].cost, input.foods[index].rating, input.foods[index].review);
        }
    }
    if ((_j = input.images) === null || _j === void 0 ? void 0 : _j.length) {
        for (let index = 0; index < ((_k = input.images) === null || _k === void 0 ? void 0 : _k.length); index++) {
            yield postImageDao.createPostImage(post_id, input.images[index].image_url, input.images[index].caption);
        }
    }
    // update role 
    const user = yield userDAO.getUserByID(createdPost.user_id);
    const data = {
        role: "traveller"
    };
    yield userDAO.updateUser(user.username, data);
    return true;
});
export const getAllPosts = (page, limit) => __awaiter(void 0, void 0, void 0, function* () {
    const offset = (page - 1) * limit;
    const posts = yield posttDAO.getAllPosts(page, limit);
    const enrichedPosts = yield Promise.all(posts.map((post) => __awaiter(void 0, void 0, void 0, function* () {
        const post_id = post.post_id;
        const [postTransports, postPlaces, postAccommodations, postFoods, images] = yield Promise.all([
            postTransportDao.getById(post_id),
            postPlaceDao.getById(post_id),
            postAccommodationDao.getById(post_id),
            postFoodDao.getById(post_id),
            postImageDao.getById(post_id)
        ]);
        const transportIds = postTransports.map((t) => t.transport_id).filter(Boolean);
        const placeIds = postPlaces.map((p) => p.place_id).filter(Boolean);
        const accommodationIds = postAccommodations.map(a => a.accommodation_id).filter(Boolean);
        // const restaurantIds = postfoods.map((r: any) => r.restaurant_id).filter(Boolean);
        const [transportsData, placesData, accommodationsData,] = yield Promise.all([
            transportIds.length ? transportDao.getById(transportIds) : [],
            placeIds.length ? placeDao.getById(placeIds) : [],
            accommodationIds.length ? accommodationDao.getById(accommodationIds) : [],
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
        // const foods = postfoods.map((postItem: any) => {
        //     const core = foodsData.find(r => r.restaurant_id === postItem.restaurant_id);
        //     return { ...(core ?? {}), ...postItem };
        // });
        return Object.assign(Object.assign({}, post), { transports,
            places,
            accommodations,
            postFoods,
            images });
    })));
    return enrichedPosts.map((post) => new PostResponseDTO(post));
});
export const getPostByPostID = (post_id) => __awaiter(void 0, void 0, void 0, function* () {
    const post = yield posttDAO.getPostByPostID(post_id);
    if (!post) {
        throw new AppError('post not found', 404);
    }
    const [postTransports, postPlaces, postAccommodations, postFoods, images] = yield Promise.all([
        postTransportDao.getById(post_id),
        postPlaceDao.getById(post_id),
        postAccommodationDao.getById(post_id),
        postFoodDao.getById(post_id),
        postImageDao.getById(post_id)
    ]);
    const transportIds = postTransports.map((t) => t.transport_id).filter(Boolean);
    const placeIds = postPlaces.map((p) => p.place_id).filter(Boolean);
    const accommodationIds = postAccommodations.map(a => a.accommodation_id).filter(Boolean);
    // const restaurantIds = postfoods.map((r: any) => r.restaurant_id).filter(Boolean);
    const [transportsData, placesData, accommodationsData] = yield Promise.all([
        transportIds.length ? transportDao.getById(transportIds) : [],
        placeIds.length ? placeDao.getById(placeIds) : [],
        accommodationIds.length ? accommodationDao.getById(accommodationIds) : [],
        // restaurantIds.length ? restaurantDao.getById(restaurantIds) : []
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
    // const foods = postfoods.map((postItem: any) => {
    //     const core = foodsData.find(r => r.restaurant_id === postItem.restaurant_id);
    //     return { ...(core ?? {}), ...postItem };
    // });
    const enrichedPost = Object.assign(Object.assign({}, post), { transports,
        places,
        accommodations,
        postFoods,
        images });
    return new PostResponseDTO(enrichedPost);
});
export const updatePost = (post_id, input) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f;
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
                yield postPlaceDao.updatePostPlace(post_id, placeRecord.place_id, pl.cost, pl.rating, pl.review);
            }
        }
    }
    if ((_d = input.foods) === null || _d === void 0 ? void 0 : _d.length) {
        for (let index = 0; index < ((_e = input.foods) === null || _e === void 0 ? void 0 : _e.length); index++) {
            yield postFoodDao.updatePostFood(post_id, input.foods[index].food_name, input.foods[index].cost, input.foods[index].rating, input.foods[index].review);
        }
    }
    if ((_f = input.images) === null || _f === void 0 ? void 0 : _f.length) {
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
        const [postTransports, postPlaces, postAccommodations, postFoods, images] = yield Promise.all([
            postTransportDao.getById(post_id),
            postPlaceDao.getById(post_id),
            postAccommodationDao.getById(post_id),
            postFoodDao.getById(post_id),
            postImageDao.getById(post_id)
        ]);
        const transportIds = postTransports.map((t) => t.transport_id).filter(Boolean);
        const placeIds = postPlaces.map((p) => p.place_id).filter(Boolean);
        const accommodationIds = postAccommodations.map(a => a.accommodation_id).filter(Boolean);
        // const restaurantIds = postfoods.map((r: any) => r.restaurant_id).filter(Boolean);
        const [transportsData, placesData, accommodationsData,
        // foodsData
        ] = yield Promise.all([
            transportIds.length ? transportDao.getById(transportIds) : [],
            placeIds.length ? placeDao.getById(placeIds) : [],
            accommodationIds.length ? accommodationDao.getById(accommodationIds) : [],
            // restaurantIds.length ? restaurantDao.getById(restaurantIds) : []
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
        return Object.assign(Object.assign({}, post), { transports,
            places,
            accommodations,
            postFoods,
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
