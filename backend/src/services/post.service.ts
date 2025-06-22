import { NextFunction } from "express";
import { ExpressRequest } from "../middlewares/auth.middleware.ts";
// import postDAO from "../repositories/dao/post.dao.ts"; 
import { CreatedPost, CreatePostInput, UpdatePostInput } from "../types/post.type.ts";
import { PostResponseDTO } from "../DTOs/post.dto.ts";
import { getPost } from "../types/post.type.ts";
import accommodationDao from "../repositories/dao/accommodation.dao.ts";
import postAccommodationDao from "../repositories/dao/post_accommodation.dao.ts";
import transportDao from "../repositories/dao/transport.dao.ts";
import postTransportDao from "../repositories/dao/post_transport.dao.ts";
import placeDao from "../repositories/dao/place.dao.ts";
import postPlaceDao from "../repositories/dao/post_place.dao.ts";
import restaurantDao from "../repositories/dao/restaurant.dao.ts";
import postRestaurantDao from "../repositories/dao/post_restaurant.dao.ts";
import postImageDao from "../repositories/dao/post_image.dao.ts";
import posttDAO from "../repositories/dao/postt.dao.ts";
import { getTransport } from "../types/transport.type.ts";
import { getAccommodation } from "../types/accommodation.type.ts";
import { SearchFilters } from "../types/post.type.ts";

import { Knex } from "knex";
import { dbClient } from "../db/db.ts";
import { Console } from "console";
import { AppError } from "../utils/appError.ts";
import postInteractionDao from "../repositories/dao/post_interaction.dao.ts";
// import { AppError } from "../../utils/appError.ts";
const db: Knex = dbClient.getConnection();




export const createPost = async(input: CreatePostInput): Promise<string> => {
    const createdPost: any = await posttDAO.createPost(input)
    
    const post_id = createdPost.post_id 

    if(input.accommodations?.length) {
    // at first search in accommodations table

        for (let index=0; index<input.accommodations?.length;index++) {
            const accommodationRecord = await accommodationDao.getAccommodationByTypeAndName(input.accommodations[index].accommodation_type,
                input.accommodations[index].accommodation_name
            )

            if (accommodationRecord) {
                await postAccommodationDao.createPostAccommodation(
                post_id,
                accommodationRecord.accommodation_id,
                input.accommodations[index].cost,
                input.accommodations[index].rating,
                input.accommodations[index].review,
                );
            } else {
                // nothing
            }
        }
    }

    if(input.transports?.length) {
        for (let index=0; index<input.transports?.length;index++) {
            const transportRecord = await transportDao.getTransportByTypeAndName(input.transports[index].transport_type,
                input.transports[index].transport_name
            )

            if (transportRecord) {
                await postTransportDao.createPostTransport(
                post_id,
                transportRecord.transport_id,
                input.transports[index].cost,
                input.transports[index].rating,
                input.transports[index].review,
            );
            } else {
                // nothing
            }
        }   
    }
    
    if(input.places?.length) 
    {
        for (let index=0; index<input.places?.length;index++) {
            const placeRecord = await placeDao.getPlaceByName(input.places[index].place_name)

            if (placeRecord) {
                await postPlaceDao.createPostPlace(
                post_id,
                placeRecord.place_id,
                input.places[index].rating,
                input.places[index].review,
            );
            } else {
                // nothing
            }
        }
    }

     
    if(input.restaurants?.length) 
    {
        for (let index=0; index<input.restaurants?.length;index++) {
            const restaurantRecord = await restaurantDao.getRestaurantByName(input.restaurants[index].restaurant_name)

            if (restaurantRecord) {
                await postRestaurantDao.createPostRestaurant(
                post_id,
                restaurantRecord.restaurant_id,
                input.restaurants[index].cost,
                input.restaurants[index].rating,
                input.restaurants[index].review
            );
            } else {
                // nothing
            }
        }
    }

    if(input.images?.length) {
       
        for (let index=0; index<input.images?.length;index++) {
            await postImageDao.createPostImage(
            post_id,
            input.images[index].image_url,
            input.images[index].caption
        )}
    }
    
    return "post created"
}

export const getAllPosts = async (page: number, limit: number): Promise<PostResponseDTO[]> => {
  const offset = (page - 1) * limit;

  const posts = await posttDAO.getAllPosts(page, limit); 

  const enrichedPosts: getPost[] = await Promise.all(
        posts.map(async (post) => {
        const post_id = post.post_id;
      
        const [
            postTransports,
            postPlaces,
            postAccommodations,
            postRestaurants,
            images
        ] = await Promise.all([
            postTransportDao.getById(post_id),
            postPlaceDao.getById(post_id),
            postAccommodationDao.getById(post_id),
            postRestaurantDao.getById(post_id),
            postImageDao.getById(post_id)
        ]);

      
        const transportIds = postTransports.map((t: any) => t.transport_id).filter(Boolean);
        const placeIds = postPlaces.map((p: any) => p.place_id).filter(Boolean);
        const accommodationIds = postAccommodations.map(a => a.accommodation_id).filter(Boolean);
        const restaurantIds = postRestaurants.map((r: any) => r.restaurant_id).filter(Boolean);

        
        const [
            transportsData,
            placesData,
            accommodationsData,
            restaurantsData
        ] = await Promise.all([
            transportIds.length ? transportDao.getById(transportIds) : [],
            placeIds.length ? placeDao.getById(placeIds) : [],
            accommodationIds.length ? accommodationDao.getById(accommodationIds) : [],
            restaurantIds.length ? restaurantDao.getById(restaurantIds) : []
        ]);

       
        const transports = postTransports.map((postItem: any) => {
            const core = transportsData.find(t => t.transport_id === postItem.transport_id);
            return { ...(core ?? {}), ...postItem };
        });

        const places = postPlaces.map((postItem: any) => {
            const core = placesData.find(p => p.place_id === postItem.place_id);
            return { ...(core ?? {}), ...postItem };
        });

        const accommodations = postAccommodations.map(postItem => {
            const core = accommodationsData.find(a => a.accommodation_id === postItem.accommodation_id);
            return { ...(core ?? {}), ...postItem };
        });

        const restaurants = postRestaurants.map((postItem: any) => {
            const core = restaurantsData.find(r => r.restaurant_id === postItem.restaurant_id);
            return { ...(core ?? {}), ...postItem };
        });

        return {
            ...post,
            transports,
            places,
            accommodations,
            restaurants,
            images
        };
        })
    );

  return enrichedPosts.map((post) => new PostResponseDTO(post));
};



export const getPostByPostID = async(post_id: number): Promise<PostResponseDTO> => {
    const post: CreatedPost = await posttDAO.getPostByPostID(post_id)
   
    if(!post) 
    {
        throw new AppError('post not found', 404)
    }
        
        const [
            postTransports,
            postPlaces,
            postAccommodations,
            postRestaurants,
            images
        ] = await Promise.all([
            postTransportDao.getById(post_id),
            postPlaceDao.getById(post_id),
            postAccommodationDao.getById(post_id),
            postRestaurantDao.getById(post_id),
            postImageDao.getById(post_id)
        ]);

        
        const transportIds = postTransports.map((t: any) => t.transport_id).filter(Boolean);
        const placeIds = postPlaces.map((p: any) => p.place_id).filter(Boolean);
        const accommodationIds = postAccommodations.map(a => a.accommodation_id).filter(Boolean);
        const restaurantIds = postRestaurants.map((r: any) => r.restaurant_id).filter(Boolean);

       
        const [
            transportsData,
            placesData,
            accommodationsData,
            restaurantsData
        ] = await Promise.all([
            transportIds.length ? transportDao.getById(transportIds) : [],
            placeIds.length ? placeDao.getById(placeIds) : [],
            accommodationIds.length ? accommodationDao.getById(accommodationIds) : [],
            restaurantIds.length ? restaurantDao.getById(restaurantIds) : []
        ]);

       
        const transports = postTransports.map((postItem: any) => {
            const core = transportsData.find(t => t.transport_id === postItem.transport_id);
            return { ...(core ?? {}), ...postItem };
        });

        const places = postPlaces.map((postItem: any) => {
            const core = placesData.find(p => p.place_id === postItem.place_id);
            return { ...(core ?? {}), ...postItem };
        });

        const accommodations = postAccommodations.map(postItem => {
            const core = accommodationsData.find(a => a.accommodation_id === postItem.accommodation_id);
            return { ...(core ?? {}), ...postItem };
        });

        const restaurants = postRestaurants.map((postItem: any) => {
            const core = restaurantsData.find(r => r.restaurant_id === postItem.restaurant_id);
            return { ...(core ?? {}), ...postItem };
        });

        const enrichedPost= {
            ...post,
            transports,
            places,
            accommodations,
            restaurants,
            images
        };
    
    return new PostResponseDTO(enrichedPost)
}


export const updatePost = async (post_id: number, input: UpdatePostInput): Promise<string> => {
  const existingPost = await posttDAO.updatePost(post_id, input);
    if (!existingPost) 
    {
        throw new AppError("Post not found", 404);
    }


    if (input.accommodations?.length) {
        for (const acc of input.accommodations) {
        const accommodationRecord = await accommodationDao.getAccommodationByTypeAndName(
            acc.accommodation_type,
            acc.accommodation_name
        );

        if (accommodationRecord) {
            await postAccommodationDao.updatePostAccommodation(
            post_id,
            accommodationRecord.accommodation_id,
            acc.cost,
                acc.rating,
                acc.review
            
            );
        }
        }
    }

    if (input.transports?.length) {
        for (const tr of input.transports) {
        const transportRecord = await transportDao.getTransportByTypeAndName(
            tr.transport_type,
            tr.transport_name
        );

        if (transportRecord) {
            await postTransportDao.updatePostTransport(
            post_id,
            transportRecord.transport_id,
            
                tr.cost,
                tr.rating,
                tr.review
            
            );
        }
        }
    }


    if (input.places?.length) {
        for (const pl of input.places) {
        const placeRecord = await placeDao.getPlaceByName(pl.place_name);

        if (placeRecord) {
            await postPlaceDao.updatePostPlace(
            post_id,
            placeRecord.place_id,
            
                pl.rating,
                pl.review
            
            );
        }
        }
    }

    if (input.restaurants?.length) {
        for (const res of input.restaurants) {
        const restaurantRecord = await restaurantDao.getRestaurantByName(res.restaurant_name);

        if (restaurantRecord) {
            await postRestaurantDao.updatePostRestaurant(
            post_id,
            restaurantRecord.restaurant_id,
            
                res.cost,
                res.rating,
                res.review
            
            );
        }
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



export const deletePost = async(post_id: number): Promise<string> => {
    const status: string = await posttDAO.deletePost(post_id)
    return status
}

export const getPostsByUserID = async(user_id: number): Promise<PostResponseDTO[]> => {
    const posts: CreatedPost[] = await posttDAO.getPostsByUserID(user_id)
   
    const enrichedPosts: getPost[] = await Promise.all(
            posts.map(async (post) => {
            const post_id = post.post_id;
           
            const [
                postTransports,
                postPlaces,
                postAccommodations,
                postRestaurants,
                images
            ] = await Promise.all([
                postTransportDao.getById(post_id),
                postPlaceDao.getById(post_id),
                postAccommodationDao.getById(post_id),
                postRestaurantDao.getById(post_id),
                postImageDao.getById(post_id)
            ]);

           
            
            const transportIds = postTransports.map((t: any) => t.transport_id).filter(Boolean);
            const placeIds = postPlaces.map((p: any) => p.place_id).filter(Boolean);
            const accommodationIds = postAccommodations.map(a => a.accommodation_id).filter(Boolean);
            const restaurantIds = postRestaurants.map((r: any) => r.restaurant_id).filter(Boolean);

            
            const [
                transportsData,
                placesData,
                accommodationsData,
                restaurantsData
            ] = await Promise.all([
                transportIds.length ? transportDao.getById(transportIds) : [],
                placeIds.length ? placeDao.getById(placeIds) : [],
                accommodationIds.length ? accommodationDao.getById(accommodationIds) : [],
                restaurantIds.length ? restaurantDao.getById(restaurantIds) : []
            ]);

            
            const transports = postTransports.map((postItem: any) => {
                const core = transportsData.find(t => t.transport_id === postItem.transport_id);
                return { ...(core ?? {}), ...postItem };
            });

            const places = postPlaces.map((postItem: any) => {
                const core = placesData.find(p => p.place_id === postItem.place_id);
                return { ...(core ?? {}), ...postItem };
            });

            const accommodations = postAccommodations.map(postItem => {
                const core = accommodationsData.find(a => a.accommodation_id === postItem.accommodation_id);
                return { ...(core ?? {}), ...postItem };
            });

            const restaurants = postRestaurants.map((postItem: any) => {
                const core = restaurantsData.find(r => r.restaurant_id === postItem.restaurant_id);
                return { ...(core ?? {}), ...postItem };
            });

            return {
                ...post,
                transports,
                places,
                accommodations,
                restaurants,
                images
            };
        })
    );
    return enrichedPosts
}


export const searchPosts = async (filters: SearchFilters): Promise<PostResponseDTO[]> => {
  const posts = await posttDAO.searchPosts(filters);
  console.log(posts)
  const enrichedPosts = await Promise.all(
            posts.map(p => {
                return getPostByPostID(p.post_id);
            })
        );

    return enrichedPosts.map((post)=> new PostResponseDTO(post))
};


export const togglePostLike = async (post_id: number, user_id: number): Promise<string> => {
    // at first check whether the entry is in the post interaction tablke or not 
    const data = await postInteractionDao.getPostInteraction(post_id, user_id, "like")
    let status
    if(data) 
    {
        // dele 
        await postInteractionDao.deletePostInteraction(post_id, user_id, "like")
        status = await posttDAO.togglePostLike(post_id, false) 
    }
    else 
    {
        const data = await postInteractionDao.createPostInteraction(post_id, user_id, "like", "liked")
        status = await posttDAO.togglePostLike(post_id, true) 
    }

    return status
} 