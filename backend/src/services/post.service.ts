import { NextFunction } from "express";
import { ExpressRequest } from "../middlewares/auth.middleware.ts";
import { CreatedPost, CreatePostInput, UpdatePostInput } from "../types/post.type.ts";
import { PostResponseDTO } from "../DTOs/post.dto.ts";
import { getPost } from "../types/post.type.ts";
import accommodationDao from "../repositories/dao/accommodation.repository.ts";
import postAccommodationDao from "../repositories/dao/post_accommodation.repository.ts";
import transportDao from "../repositories/dao/transport.repository.ts";
import postTransportDao from "../repositories/dao/post_transport.repository.ts";
import placeDao from "../repositories/dao/place.repository.ts";
import postPlaceDao from "../repositories/dao/post_place.repository.ts";
import restaurantDao from "../repositories/dao/restaurant.repository.ts";
import postRestaurantDao from "../repositories/dao/post_restaurant.repository.ts";
import postImageDao from "../repositories/dao/post_image.repository.ts";
import postDAO from "../repositories/dao/post.repository.ts";
import { getTransport, transportCreation } from "../types/transport.type.ts";
import { accommodationCreation, getAccommodation } from "../types/accommodation.type.ts";
import { SearchFilters } from "../types/post.type.ts";

import { Knex } from "knex";
import { dbClient } from "../db/db.ts";
import { AppError } from "../utils/appError.ts";
import postInteractionDao from "../repositories/dao/post_interaction.repository.ts";
import postFoodDao from "../repositories/dao/post_food.repository.ts";
import { AccommodationDTO } from "../DTOs/accommodation.dto.ts";
import { getPlace, placeCreation } from "../types/place.type.ts";
import { UserDTO } from "../DTOs/user.dto.ts";
import userDAO from "../repositories/dao/user.respository.ts";
import { updateUserInfo } from "../types/user.type.ts";
import { HTTP_STATUS } from "../constants/httpStatus.ts";
const db: Knex = dbClient.getConnection();




export const createPost = async(input: CreatePostInput): Promise<boolean> => {
    const createdPost: any = await postDAO.createPost(input);
    
    const post_id = createdPost.post_id;

    if(input.accommodations?.length) 
    {
        for (let index=0; index<input.accommodations?.length;index++) {
            const accommodationRecord = await accommodationDao.getAccommodationByTypeAndName(input.accommodations[index].accommodation_type,
                input.accommodations[index].accommodation_name
            );

            if (accommodationRecord) {
                await postAccommodationDao.createPostAccommodation(
                    post_id,
                    accommodationRecord.accommodation_id,
                    input.accommodations[index].cost,
                    input.accommodations[index].rating,
                    input.accommodations[index].review,
                );
            } 
            else 
            {
               // create  
                const data: accommodationCreation = {
                    accommodation_name : input.accommodations[index].accommodation_name,
                    accommodation_type : input.accommodations[index].accommodation_type,
                    latitude : input.accommodations[index].latitude,
                    longitude : input.accommodations[index].longitude 
                };
                const accommodation: getAccommodation = await accommodationDao.createAccommodation(data); 

                await postAccommodationDao.createPostAccommodation(
                    post_id,
                    accommodation.accommodation_id,
                    input.accommodations[index].cost,
                    input.accommodations[index].rating,
                    input.accommodations[index].review,
                );
            }
        }
    }

    if(input.transports?.length) {
        for (let index=0; index<input.transports?.length;index++) 
        {
            const transportRecord = await transportDao.getTransportByTypeAndName(input.transports[index].transport_type,
                input.transports[index].transport_name
            );

            if (transportRecord) {
                await postTransportDao.createPostTransport(
                    post_id,
                    transportRecord.transport_id,
                    input.transports[index].cost,
                    input.transports[index].rating,
                    input.transports[index].review,
                );
            } 
            else 
            {   
                const data: transportCreation = {
                    transport_type : input.transports[index].transport_type,
                    transport_name : input.transports[index].transport_name,
                };

                const transport: getTransport = await transportDao.createTransport(data);

                await postTransportDao.createPostTransport(
                    post_id,
                    transport.transport_id,
                    input.transports[index].cost,
                    input.transports[index].rating,
                    input.transports[index].review,
                );
            }
        }   
    }
    
    if(input.places?.length) 
    {
        for (let index=0; index<input.places?.length;index++) {
            const placeRecord = await placeDao.getPlaceByName(input.places[index].place_name);

            if (placeRecord) {
                await postPlaceDao.createPostPlace(
                    post_id,
                    placeRecord.place_id,
                    input.places[index].cost,
                    input.places[index].rating,
                    input.places[index].review,
                );
            } 
            else 
            {
                const data: placeCreation = {
                    place_name : input.places[index].place_name,
                    
                    latitude : input.places[index].latitude,
                    longitude : input.places[index].longitude 
                };
                const place: getPlace = await placeDao.createPlace(data);

                await postPlaceDao.createPostPlace(
                    post_id,
                    place.place_id,
                    input.places[index].cost,
                    input.places[index].rating,
                    input.places[index].review,
                );
            }
        }
    }

     
    if(input.foods?.length) 
    {
        for (let index=0; index<input.foods?.length;index++) {
            await postFoodDao.createPostFood(
                post_id,
                input.foods[index].food_name,
                input.foods[index].cost,
                input.foods[index].rating,
                input.foods[index].review
            );
        }
    }

    if(input.images?.length) {
       
        for (let index=0; index<input.images?.length;index++) {
            await postImageDao.createPostImage(
                post_id,
                input.images[index].image_url,
                input.images[index].caption
            );
        }
    }

    
    // update role 
    const user: UserDTO = await userDAO.getUserByID(createdPost.user_id);
    if(user.role === "explorer") 
    {
        const data: updateUserInfo = {
            role: "traveller"
        };

        await userDAO.updateUser(user.username, data);
    }
    return true;
}

export const getAllPosts = async (page: number, limit: number): Promise<PostResponseDTO[]> => {
  const offset = (page - 1) * limit;

  const posts = await postDAO.getAllPosts(page, limit); 

  const enrichedPosts: getPost[] = await Promise.all(
        posts.map(async (post) => {
        const post_id = post.post_id;
      
        const [
            postTransports,
            postPlaces,
            postAccommodations,
            postFoods,
            images
        ] = await Promise.all([
            postTransportDao.getById(post_id),
            postPlaceDao.getById(post_id),
            postAccommodationDao.getById(post_id),
            postFoodDao.getById(post_id),
            postImageDao.getById(post_id)
        ]);

      
        const transportIds = postTransports.map((t: any) => t.transport_id).filter(Boolean);
        const placeIds = postPlaces.map((p: any) => p.place_id).filter(Boolean);
        const accommodationIds = postAccommodations.map(a => a.accommodation_id).filter(Boolean);
       

        
        const [
            transportsData,
            placesData,
            accommodationsData,
        ] = await Promise.all([
            transportIds.length ? transportDao.getById(transportIds) : [],
            placeIds.length ? placeDao.getById(placeIds) : [],
            accommodationIds.length ? accommodationDao.getById(accommodationIds) : [],
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

        return {
            ...post,
            transports,
            places,
            accommodations,
            postFoods,
            images
        };
        })
    );

  return enrichedPosts.map((post) => new PostResponseDTO(post));
};



export const getPostByPostID = async(post_id: string): Promise<PostResponseDTO> => {
    const post: CreatedPost = await postDAO.getPostByPostID(post_id)
   
    if(!post) 
    {
        throw new AppError('post not found', HTTP_STATUS.NOT_FOUND)
    }
        
    const [
        postTransports,
        postPlaces,
        postAccommodations,
        postFoods,
        images
    ] = await Promise.all([
        postTransportDao.getById(post_id),
        postPlaceDao.getById(post_id),
        postAccommodationDao.getById(post_id),
        postFoodDao.getById(post_id),
        postImageDao.getById(post_id)
    ]);

        
    const transportIds = postTransports.map((t: any) => t.transport_id).filter(Boolean);
    const placeIds = postPlaces.map((p: any) => p.place_id).filter(Boolean);
    const accommodationIds = postAccommodations.map(a => a.accommodation_id).filter(Boolean);
    
    
    const [
        transportsData,
        placesData,
        accommodationsData
        
    ] = await Promise.all([
        transportIds.length ? transportDao.getById(transportIds) : [],
        placeIds.length ? placeDao.getById(placeIds) : [],
        accommodationIds.length ? accommodationDao.getById(accommodationIds) : [],
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


    const enrichedPost= {
        ...post,
        transports,
        places,
        accommodations,
        postFoods,
        images
    };
    
    return new PostResponseDTO(enrichedPost);
}


export const updatePost = async (post_id: string, input: UpdatePostInput): Promise<string> => {
    
    const post: CreatedPost = await postDAO.getPostByPostID(post_id);
    if (!post) 
    {
        throw new AppError("Post not found", HTTP_STATUS.NOT_FOUND);
    }
    
    if(post.user_id !== (input.user_id as string)) 
    {
        throw new AppError("you are not authorized to update the post", HTTP_STATUS.FORBIDDEN);
    }
    const updatedPost = await postDAO.updatePost(post_id, input);

    if (input.accommodations?.length) {
        await postAccommodationDao.deleteById(post_id);
        
        for (let index=0; index<input.accommodations?.length;index++) {
            const accommodationRecord = await accommodationDao.getAccommodationByTypeAndName(input.accommodations[index].accommodation_type,
                input.accommodations[index].accommodation_name
            );

            if (accommodationRecord) {
                await postAccommodationDao.createPostAccommodation(
                    post_id,
                    accommodationRecord.accommodation_id,
                    input.accommodations[index].cost,
                    input.accommodations[index].rating,
                    input.accommodations[index].review,
                );
            } 
            else 
            {
               // create  
                const data: accommodationCreation = {
                    accommodation_name : input.accommodations[index].accommodation_name,
                    accommodation_type : input.accommodations[index].accommodation_type,
                    latitude : input.accommodations[index].latitude,
                    longitude : input.accommodations[index].longitude 
                };
                const accommodation: getAccommodation = await accommodationDao.createAccommodation(data);

                await postAccommodationDao.createPostAccommodation(
                    post_id,
                    accommodation.accommodation_id,
                    input.accommodations[index].cost,
                    input.accommodations[index].rating,
                    input.accommodations[index].review,
                );
            }
        }
    }

    if (input.transports?.length) {
        await postTransportDao.deleteById(post_id);
        for (let index=0; index<input.transports?.length;index++) 
        {
            const transportRecord = await transportDao.getTransportByTypeAndName(input.transports[index].transport_type,
                input.transports[index].transport_name
            );

            if (transportRecord) {
                await postTransportDao.createPostTransport(
                    post_id,
                    transportRecord.transport_id,
                    input.transports[index].cost,
                    input.transports[index].rating,
                    input.transports[index].review,
                );
            } 
            else 
            {   
                const data: transportCreation = {
                    transport_type : input.transports[index].transport_type,
                    transport_name : input.transports[index].transport_name,
                };

                const transport: getTransport = await transportDao.createTransport(data); 

                await postTransportDao.createPostTransport(
                    post_id,
                    transport.transport_id,
                    input.transports[index].cost,
                    input.transports[index].rating,
                    input.transports[index].review,
                );
            }
        }   
    }


    if (input.places?.length) {
   
        await postPlaceDao.deleteById(post_id);
        for (let index=0; index<input.places?.length;index++) {
            const placeRecord = await placeDao.getPlaceByName(input.places[index].place_name);

            if (placeRecord) {
                await postPlaceDao.createPostPlace(
                    post_id,
                    placeRecord.place_id,
                    input.places[index].cost,
                    input.places[index].rating,
                    input.places[index].review,
                );
            } 
            else 
            {
                const data: placeCreation = {
                    place_name : input.places[index].place_name,
                    
                    latitude : input.places[index].latitude!,
                    longitude : input.places[index].longitude! 
                };
                const place: getPlace = await placeDao.createPlace(data);

                await postPlaceDao.createPostPlace(
                    post_id,
                    place.place_id,
                    input.places[index].cost,
                    input.places[index].rating,
                    input.places[index].review,
                );
            }
        }
    }

    if(input.foods?.length) 
    {
        await postFoodDao.deleteById(post_id);
        for (let index=0; index<input.foods?.length;index++) {
            await postFoodDao.createPostFood(
                post_id,
                input.foods[index].food_name,
                input.foods[index].cost,
                input.foods[index].rating,
                input.foods[index].review
            );
        }
        
    }


    if (input.images?.length) {
        await postImageDao.deleteById(post_id);
        for (const img of input.images) 
        {
            await postImageDao.createPostImage(post_id, img.image_url, img.caption);
        }
    }

    return "Post updated successfully";
};



export const deletePost = async(post_id: string, user_id: string): Promise<string> => {
    const post: CreatedPost = await postDAO.getPostByPostID(post_id);
    if (!post) 
    {
        throw new AppError("Post not found", HTTP_STATUS.NOT_FOUND);
    }
    
    if(post.user_id !== user_id) 
    {
        throw new AppError("you are not authorized to delete the post", HTTP_STATUS.FORBIDDEN);
    }
    const status: string = await postDAO.deletePost(post_id);
    return status;
}

export const getPostsByUserID = async(user_id: string): Promise<PostResponseDTO[]> => {
    const posts: CreatedPost[] = await postDAO.getPostsByUserID(user_id);
   
    const enrichedPosts: getPost[] = await Promise.all(
            posts.map(async (post) => {
            const post_id = post.post_id;
           
            const [
                postTransports,
                postPlaces,
                postAccommodations,
                postFoods,
                images
            ] = await Promise.all([
                postTransportDao.getById(post_id),
                postPlaceDao.getById(post_id),
                postAccommodationDao.getById(post_id),
                postFoodDao.getById(post_id),
                postImageDao.getById(post_id)
            ]);

           
            
            const transportIds = postTransports.map((t: any) => t.transport_id).filter(Boolean);
            const placeIds = postPlaces.map((p: any) => p.place_id).filter(Boolean);
            const accommodationIds = postAccommodations.map(a => a.accommodation_id).filter(Boolean);
          

            
            const [
                transportsData,
                placesData,
                accommodationsData,
               
            ] = await Promise.all([
                transportIds.length ? transportDao.getById(transportIds) : [],
                placeIds.length ? placeDao.getById(placeIds) : [],
                accommodationIds.length ? accommodationDao.getById(accommodationIds) : [],
              
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


            return {
                ...post,
                transports,
                places,
                accommodations,
                postFoods,
                images
            };
        })
    );
    return enrichedPosts;
}


export const searchPosts = async (filters: SearchFilters): Promise<PostResponseDTO[]> => {
    const posts = await postDAO.searchPosts(filters);
    
    const enrichedPosts = await Promise.all(
                posts.map(p => {
                    return getPostByPostID(p.post_id);
                })
            );

    return enrichedPosts.map((post)=> new PostResponseDTO(post));
};


export const togglePostLike = async (post_id: string, user_id: string): Promise<string> => {
    // at first check whether the entry is in the post interaction table or not 
    const data = await postInteractionDao.getPostInteraction(post_id, user_id, "like");
    let status;
    if(data) 
    {
        await postInteractionDao.deletePostInteraction(post_id, user_id, "like");
        status = await postDAO.togglePostLike(post_id, false);
    }
    else 
    {
        const data = await postInteractionDao.createPostInteraction(post_id, user_id, "like", "liked");
        status = await postDAO.togglePostLike(post_id, true);
    }

    return status;
} 