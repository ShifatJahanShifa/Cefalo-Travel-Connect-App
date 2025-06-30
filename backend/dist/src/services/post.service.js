import { PostResponseDTO } from "../DTOs/post.dto.js";
import accommodationDao from "../repositories/dao/accommodation.repository.js";
import postAccommodationDao from "../repositories/dao/post_accommodation.repository.js";
import transportDao from "../repositories/dao/transport.repository.js";
import postTransportDao from "../repositories/dao/post_transport.repository.js";
import placeDao from "../repositories/dao/place.repository.js";
import postPlaceDao from "../repositories/dao/post_place.repository.js";
import postImageDao from "../repositories/dao/post_image.repository.js";
import posttDAO from "../repositories/dao/postt.repository.js";
import { dbClient } from "../db/db.js";
import { AppError } from "../utils/appError.js";
import postInteractionDao from "../repositories/dao/post_interaction.repository.js";
import postFoodDao from "../repositories/dao/post_food.repository.js";
import userDAO from "../repositories/dao/user.respository.js";
// import { AppError } from "../../utils/appError.ts";
const db = dbClient.getConnection();
export const createPost = async (input) => {
    const createdPost = await posttDAO.createPost(input);
    const post_id = createdPost.post_id;
    if (input.accommodations?.length) {
        // at first search in accommodations table
        for (let index = 0; index < input.accommodations?.length; index++) {
            const accommodationRecord = await accommodationDao.getAccommodationByTypeAndName(input.accommodations[index].accommodation_type, input.accommodations[index].accommodation_name);
            if (accommodationRecord) {
                await postAccommodationDao.createPostAccommodation(post_id, accommodationRecord.accommodation_id, input.accommodations[index].cost, input.accommodations[index].rating, input.accommodations[index].review);
            }
            else {
                // create  
                const data = {
                    accommodation_name: input.accommodations[index].accommodation_name,
                    accommodation_type: input.accommodations[index].accommodation_type,
                    latitude: input.accommodations[index].latitude,
                    longitude: input.accommodations[index].longitude
                };
                const accommodation = await accommodationDao.createAccommodation(data);
                await postAccommodationDao.createPostAccommodation(post_id, accommodation.accommodation_id, input.accommodations[index].cost, input.accommodations[index].rating, input.accommodations[index].review);
            }
        }
    }
    if (input.transports?.length) {
        for (let index = 0; index < input.transports?.length; index++) {
            const transportRecord = await transportDao.getTransportByTypeAndName(input.transports[index].transport_type, input.transports[index].transport_name);
            if (transportRecord) {
                await postTransportDao.createPostTransport(post_id, transportRecord.transport_id, input.transports[index].cost, input.transports[index].rating, input.transports[index].review);
            }
            else {
                // nothing
                const data = {
                    transport_type: input.transports[index].transport_type,
                    transport_name: input.transports[index].transport_name,
                };
                const transport = await transportDao.createTransport(data);
                await postTransportDao.createPostTransport(post_id, transport.transport_id, input.transports[index].cost, input.transports[index].rating, input.transports[index].review);
            }
        }
    }
    if (input.places?.length) {
        for (let index = 0; index < input.places?.length; index++) {
            const placeRecord = await placeDao.getPlaceByName(input.places[index].place_name);
            if (placeRecord) {
                await postPlaceDao.createPostPlace(post_id, placeRecord.place_id, input.places[index].cost, input.places[index].rating, input.places[index].review);
            }
            else {
                // nothing
                const data = {
                    place_name: input.places[index].place_name,
                    latitude: input.places[index].latitude,
                    longitude: input.places[index].longitude
                };
                const place = await placeDao.createPlace(data);
                await postPlaceDao.createPostPlace(post_id, place.place_id, input.places[index].cost, input.places[index].rating, input.places[index].review);
            }
        }
    }
    if (input.foods?.length) {
        for (let index = 0; index < input.foods?.length; index++) {
            await postFoodDao.createPostFood(post_id, input.foods[index].food_name, input.foods[index].cost, input.foods[index].rating, input.foods[index].review);
        }
    }
    if (input.images?.length) {
        for (let index = 0; index < input.images?.length; index++) {
            await postImageDao.createPostImage(post_id, input.images[index].image_url, input.images[index].caption);
        }
    }
    // update role 
    const user = await userDAO.getUserByID(createdPost.user_id);
    if (user.role === "explorer") {
        const data = {
            role: "traveller"
        };
        await userDAO.updateUser(user.username, data);
    }
    return true;
};
export const getAllPosts = async (page, limit) => {
    const offset = (page - 1) * limit;
    const posts = await posttDAO.getAllPosts(page, limit);
    const enrichedPosts = await Promise.all(posts.map(async (post) => {
        const post_id = post.post_id;
        const [postTransports, postPlaces, postAccommodations, postFoods, images] = await Promise.all([
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
        const [transportsData, placesData, accommodationsData,] = await Promise.all([
            transportIds.length ? transportDao.getById(transportIds) : [],
            placeIds.length ? placeDao.getById(placeIds) : [],
            accommodationIds.length ? accommodationDao.getById(accommodationIds) : [],
        ]);
        const transports = postTransports.map((postItem) => {
            const core = transportsData.find(t => t.transport_id === postItem.transport_id);
            return { ...(core ?? {}), ...postItem };
        });
        const places = postPlaces.map((postItem) => {
            const core = placesData.find(p => p.place_id === postItem.place_id);
            return { ...(core ?? {}), ...postItem };
        });
        const accommodations = postAccommodations.map(postItem => {
            const core = accommodationsData.find(a => a.accommodation_id === postItem.accommodation_id);
            return { ...(core ?? {}), ...postItem };
        });
        // const foods = postfoods.map((postItem: any) => {
        //     const core = foodsData.find(r => r.restaurant_id === postItem.restaurant_id);
        //     return { ...(core ?? {}), ...postItem };
        // });
        return {
            ...post,
            transports,
            places,
            accommodations,
            postFoods,
            images
        };
    }));
    return enrichedPosts.map((post) => new PostResponseDTO(post));
};
export const getPostByPostID = async (post_id) => {
    const post = await posttDAO.getPostByPostID(post_id);
    if (!post) {
        throw new AppError('post not found', 404);
    }
    const [postTransports, postPlaces, postAccommodations, postFoods, images] = await Promise.all([
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
    const [transportsData, placesData, accommodationsData] = await Promise.all([
        transportIds.length ? transportDao.getById(transportIds) : [],
        placeIds.length ? placeDao.getById(placeIds) : [],
        accommodationIds.length ? accommodationDao.getById(accommodationIds) : [],
        // restaurantIds.length ? restaurantDao.getById(restaurantIds) : []
    ]);
    const transports = postTransports.map((postItem) => {
        const core = transportsData.find(t => t.transport_id === postItem.transport_id);
        return { ...(core ?? {}), ...postItem };
    });
    const places = postPlaces.map((postItem) => {
        const core = placesData.find(p => p.place_id === postItem.place_id);
        return { ...(core ?? {}), ...postItem };
    });
    const accommodations = postAccommodations.map(postItem => {
        const core = accommodationsData.find(a => a.accommodation_id === postItem.accommodation_id);
        return { ...(core ?? {}), ...postItem };
    });
    // const foods = postfoods.map((postItem: any) => {
    //     const core = foodsData.find(r => r.restaurant_id === postItem.restaurant_id);
    //     return { ...(core ?? {}), ...postItem };
    // });
    const enrichedPost = {
        ...post,
        transports,
        places,
        accommodations,
        postFoods,
        images
    };
    return new PostResponseDTO(enrichedPost);
};
export const updatePost = async (post_id, input) => {
    const post = await posttDAO.getPostByPostID(post_id);
    if (!post) {
        throw new AppError("Post not found", 404);
    }
    if (post.user_id !== input.user_id) {
        throw new AppError("you are not authorized to update the post", 403);
    }
    const updatedPost = await posttDAO.updatePost(post_id, input);
    if (input.accommodations?.length) {
        for (const acc of input.accommodations) {
            const accommodationRecord = await accommodationDao.getAccommodationByTypeAndName(acc.accommodation_type, acc.accommodation_name);
            if (accommodationRecord) {
                await postAccommodationDao.updatePostAccommodation(post_id, accommodationRecord.accommodation_id, acc.cost, acc.rating, acc.review);
            }
        }
    }
    if (input.transports?.length) {
        for (const tr of input.transports) {
            const transportRecord = await transportDao.getTransportByTypeAndName(tr.transport_type, tr.transport_name);
            if (transportRecord) {
                await postTransportDao.updatePostTransport(post_id, transportRecord.transport_id, tr.cost, tr.rating, tr.review);
            }
        }
    }
    if (input.places?.length) {
        for (const pl of input.places) {
            const placeRecord = await placeDao.getPlaceByName(pl.place_name);
            if (placeRecord) {
                await postPlaceDao.updatePostPlace(post_id, placeRecord.place_id, pl.cost, pl.rating, pl.review);
            }
        }
    }
    if (input.foods?.length) {
        for (let index = 0; index < input.foods?.length; index++) {
            await postFoodDao.updatePostFood(post_id, input.foods[index].food_name, input.foods[index].cost, input.foods[index].rating, input.foods[index].review);
        }
    }
    if (input.images?.length) {
        await postImageDao.deleteById(post_id);
        for (const img of input.images) {
            await postImageDao.createPostImage(post_id, img.image_url, img.caption);
        }
    }
    return "Post updated successfully";
};
export const deletePost = async (post_id, user_id) => {
    const post = await posttDAO.getPostByPostID(post_id);
    if (!post) {
        throw new AppError("Post not found", 404);
    }
    if (post.user_id !== user_id) {
        throw new AppError("you are not authorized to delete the post", 403);
    }
    const status = await posttDAO.deletePost(post_id);
    return status;
};
export const getPostsByUserID = async (user_id) => {
    const posts = await posttDAO.getPostsByUserID(user_id);
    const enrichedPosts = await Promise.all(posts.map(async (post) => {
        const post_id = post.post_id;
        const [postTransports, postPlaces, postAccommodations, postFoods, images] = await Promise.all([
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
        ] = await Promise.all([
            transportIds.length ? transportDao.getById(transportIds) : [],
            placeIds.length ? placeDao.getById(placeIds) : [],
            accommodationIds.length ? accommodationDao.getById(accommodationIds) : [],
            // restaurantIds.length ? restaurantDao.getById(restaurantIds) : []
        ]);
        const transports = postTransports.map((postItem) => {
            const core = transportsData.find(t => t.transport_id === postItem.transport_id);
            return { ...(core ?? {}), ...postItem };
        });
        const places = postPlaces.map((postItem) => {
            const core = placesData.find(p => p.place_id === postItem.place_id);
            return { ...(core ?? {}), ...postItem };
        });
        const accommodations = postAccommodations.map(postItem => {
            const core = accommodationsData.find(a => a.accommodation_id === postItem.accommodation_id);
            return { ...(core ?? {}), ...postItem };
        });
        return {
            ...post,
            transports,
            places,
            accommodations,
            postFoods,
            images
        };
    }));
    return enrichedPosts;
};
export const searchPosts = async (filters) => {
    const posts = await posttDAO.searchPosts(filters);
    console.log(posts);
    const enrichedPosts = await Promise.all(posts.map(p => {
        return getPostByPostID(p.post_id);
    }));
    return enrichedPosts.map((post) => new PostResponseDTO(post));
};
export const togglePostLike = async (post_id, user_id) => {
    // at first check whether the entry is in the post interaction table or not 
    const data = await postInteractionDao.getPostInteraction(post_id, user_id, "like");
    let status;
    if (data) {
        // delete 
        await postInteractionDao.deletePostInteraction(post_id, user_id, "like");
        status = await posttDAO.togglePostLike(post_id, false);
    }
    else {
        const data = await postInteractionDao.createPostInteraction(post_id, user_id, "like", "liked");
        status = await posttDAO.togglePostLike(post_id, true);
    }
    return status;
};
