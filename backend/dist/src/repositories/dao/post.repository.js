"use strict";
// import { CreatedPost, CreatePostInput, getPost, UpdatePostInput } from "../../types/post.type.ts";
// import { IPost } from "../interfaces/post.interface.ts";
// import { Knex } from "knex";
// import { dbClient } from "../../db/db.ts";
// import { AppError } from "../../utils/appError.ts";
// const db: Knex = dbClient.getConnection();
// class PostDAO implements IPost {
//     async createPost(input: CreatePostInput): Promise<CreatedPost> {
//         const [post] = await db('posts')
//                         .insert({
//                         user_id: input.user_id,
//                         title: input.title,
//                         description: input.description,
//                         total_cost: input.total_cost,
//                         duration: input.duration,
//                         effort: input.effort,
//                         categories: input.categories  // will change it. 
//                     })
//                     .returning('*');
//         const post_id = post.post_id;
//         if(input.hotels?.length) {
//             // at first search in hotels table
//             for (let index=0; index<input.hotels?.length;index++) {
//                 const hotelRecord = await db('hotels')
//                     .select('hotel_id')
//                     .where({ hotel_name: input.hotels[index].hotel_name })
//                     .first();
//                 if (hotelRecord) {
//                     await db('post_hotels').insert({
//                     post_id,
//                     hotel_id: hotelRecord.hotel_id,
//                     cost: input.hotels[index].cost,
//                     rating: input.hotels[index].rating,
//                     review: input.hotels[index].review,
//                     });
//                 } else {
//                     // later will include creation logic
//                 }
//             }
//         }
//         if(input.transports?.length) {
//             for (let index=0; index<input.transports?.length;index++) {
//                 const transportRecord = await db('transports')
//                     .select('transport_id')
//                     .where({ transport_type: input.transports[index].transport_type,
//                         transport_provider: input.transports[index].transport_provider
//                     })
//                     .first();
//                 if (transportRecord) {
//                     await db('post_transports').insert({
//                     post_id,
//                     transport_id: transportRecord.transport_id,
//                     cost: input.transports[index].cost,
//                     rating: input.transports[index].rating,
//                     review: input.transports[index].review,
//                     });
//                 } else {
//                     // later will include creation logic
//                 }
//             }   
//         }
//         if(input.places?.length) {
//             for (let index=0; index<input.places?.length;index++) {
//                 const placeRecord = await db('places')
//                     .select('place_id')
//                     .where({ place_name: input.places[index].place_name })
//                     .first();
//                 if (placeRecord) {
//                     await db('post_places').insert({
//                     post_id,
//                     place_id: placeRecord.place_id,
//                     rating: input.places[index].rating,
//                     review: input.places[index].review,
//                     });
//                 } else {
//                     // later will include creation logic
//                 }
//             }
//         }
//         if(input.foods?.length) {
//             await db('post_foods').insert(
//                 input.foods.map(food => ({ post_id, ...food }))
//             );
//         }
//         if(input.images?.length) {
//             await db('post_images').insert(
//                 input.images.map(image => ({ post_id, ...image }))
//             );
//         }
//         return post;
//     };
//     async getAllPosts(page: number, limit: number): Promise<getPost[]> {
//         const offset=(page-1)*limit;
//         const posts: CreatedPost[] = await db('posts').select('*').orderBy('created_at','desc').limit(limit).offset(offset);
//         const enrichedPosts: getPost[] = await Promise.all(
//             posts.map(async post => {
//             const [hotels, transports, places, foods, images] = await Promise.all([
//                 db('post_hotels').where('post_id', post.post_id),
//                 db('post_transports').where('post_id', post.post_id),
//                 db('post_places').where('post_id', post.post_id),
//                 db('post_foods').where('post_id', post.post_id),
//                 db('post_images').where('post_id', post.post_id),
//             ]);
//             return {
//                 ...post,
//                 hotels,
//                 transports,
//                 places,
//                 foods,
//                 images,
//             };
//             })
//         );
//         return enrichedPosts;
//     }
//     async getPostByPostID(post_id: number): Promise<getPost> {
//         const post: CreatedPost = await db('posts').select('*').where({post_id: post_id}).first();
//         if(!post) 
//         {
//             throw new AppError("post not found",404);
//         }
//         const [hotels, transports, places, foods, images] = await Promise.all([
//             db('post_hotels').where('post_id', post.post_id),
//             db('post_transports').where('post_id', post.post_id),
//             db('post_places').where('post_id', post.post_id),
//             db('post_foods').where('post_id', post.post_id),
//             db('post_images').where('post_id', post.post_id),
//         ]);
//         const enrichedPost: getPost = {
//                 ...post,
//                 hotels,
//                 transports,
//                 places,
//                 foods,
//                 images
//             };
//         return enrichedPost;
//     }
//     async updatePost(post_id: number, updatedPostData: UpdatePostInput): Promise<string> {
//         await db('posts').where({ post_id: post_id }).update({
//             title: updatedPostData.title,
//             description: updatedPostData.description,
//             total_cost: updatedPostData.total_cost,
//             duration: updatedPostData.duration,
//             effort: updatedPostData.effort,
//             categories: updatedPostData.categories,
//             updated_at: db.fn.now()});
//         if (updatedPostData.hotels && updatedPostData.hotels.length>0) {
//             for (let index=0; index<updatedPostData.hotels?.length;index++) {
//                 const hotelRecord = await db('hotels')
//                     .select('hotel_id')
//                     .where({ hotel_name: updatedPostData.hotels[index].hotel_name })
//                     .first();
//                 if (hotelRecord) {
//                     await db('post_hotels').where({post_id: post_id, hotel_id: hotelRecord.hotel_id}).update({
//                     cost: updatedPostData.hotels[index].cost,
//                     rating: updatedPostData.hotels[index].rating,
//                     review: updatedPostData.hotels[index].review,
//                     });
//                 } else {
//                     // later will include creation logic
//                 }
//             }
//         }
//         if (updatedPostData.transports && updatedPostData.transports.length>0) {
//              for (let index=0; index<updatedPostData.transports?.length;index++) {
//                 const transportRecord = await db('transports')
//                     .select('transport_id')
//                     .where({ transport_type: updatedPostData.transports[index].transport_type,
//                         transport_provider: updatedPostData.transports[index].transport_provider
//                     })
//                     .first();
//                 if (transportRecord) {
//                     await db('post_transports').where({post_id: post_id,
//                     transport_id: transportRecord.transport_id,}).update({
//                     cost: updatedPostData.transports[index].cost,
//                     rating: updatedPostData.transports[index].rating,
//                     review: updatedPostData.transports[index].review,
//                     });
//                 } else {
//                     // later will include creation logic
//                 }
//             }   
//         }
//         if (updatedPostData.places && updatedPostData.places.length>0) {
//             for (let index=0; index<updatedPostData.places?.length;index++) {
//                 const placeRecord = await db('places')
//                     .select('place_id')
//                     .where({ place_name: updatedPostData.places[index].place_name })
//                     .first();
//                 if (placeRecord) {
//                     await db('post_places').where({ post_id,
//                     place_id: placeRecord.place_id,}).update({
//                     rating: updatedPostData.places[index].rating,
//                     review: updatedPostData.places[index].review,
//                 });
//                 } else {
//                     // later will include creation logic
//                 }
//             }
//         }
//         if (updatedPostData.foods && updatedPostData.foods.length>0) {
//             await db('post_foods').where({ post_id }).del();
//             const foodRecords = updatedPostData.foods.map(food => ({ post_id, ...food }));
//             await db('post_foods').insert(foodRecords);
//         }
//         if (updatedPostData.images && updatedPostData.images.length>0) {
//             await db('post_images').where({ post_id }).del();
//             const imageRecords = updatedPostData.images.map(img => ({ post_id, ...img }));
//             await db('post_images').insert(imageRecords);
//         }
//         return "successfully updated post"
//     }
//     async deletePost(post_id: number): Promise<string> {
//         const postDeleted = await db("posts").where({post_id: post_id}).del()
//         return "successfully deleted the post"
//     }
//     async getPostsByUserID(user_id: number): Promise<getPost[]> {
//         // i am not applying pagination rn
//         const posts: getPost[] = await db("posts").select('*').where({ user_id: user_id}).orderBy('created_at','desc')
//         const enrichedPosts: getPost[] = await Promise.all(
//             posts.map(async post => {
//             const [hotels, transports, places, foods, images] = await Promise.all([
//                 db('post_hotels').where('post_id', post.post_id),
//                 db('post_transports').where('post_id', post.post_id),
//                 db('post_places').where('post_id', post.post_id),
//                 db('post_foods').where('post_id', post.post_id),
//                 db('post_images').where('post_id', post.post_id),
//             ]);
//             return {
//                 ...post,
//                 hotels,
//                 transports,
//                 places,
//                 foods,
//                 images,
//             };
//             })
//         );
//         return enrichedPosts;
//     }
// }
// const postDAO = new PostDAO();
// export default postDAO;
