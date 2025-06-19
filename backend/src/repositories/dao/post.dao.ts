import { CreatedPost, CreatePostInput, getPost, UpdatePostInput } from "../../types/post.type.ts";
import { IPost } from "../interfaces/post.interface.ts";
import { Knex } from "knex";
import { dbClient } from "../../db/db.ts";
import { AppError } from "../../utils/appError.ts";
const db: Knex = dbClient.getConnection();

class PostDAO implements IPost {
    async createPost(input: CreatePostInput): Promise<CreatedPost> {
        const [post] = await db('posts')
                        .insert({
                        user_id: input.user_id,
                        title: input.title,
                        description: input.description,
                        total_cost: input.total_cost,
                        duration: input.duration,
                        effort: input.effort
                    })
                    .returning('*');

        const post_id = post.post_id;

        if(input.hotels?.length) {
            await db('post_hotels').insert(
                input.hotels.map(hotel => ({ post_id, ...hotel }))
            );
        }

        if(input.transports?.length) {
            await db('post_transports').insert(
                input.transports.map(transport => ({ post_id, ...transport }))
            );
        }

        if(input.places?.length) {
            await db('post_places').insert(
                input.places.map(place => ({ post_id, ...place }))
            );
        }

        if(input.foods?.length) {
            await db('post_foods').insert(
                input.foods.map(food => ({ post_id, ...food }))
            );
        }

        if(input.category_names?.length) {
            const categories = await db('post_categories')
                .whereIn('category_name', input.category_names)
                .select('category_id');

            const links = categories.map(({ category_id }) => ({ post_id, category_id }));
            await db('post_category_links').insert(links);
        }

        if(input.images?.length) {
            await db('post_images').insert(
                input.images.map(image => ({ post_id, ...image }))
            );
        }

        if(input.geo_locations?.length) {
            await db('post_geo_locations').insert(
                input.geo_locations.map(loc => ({ post_id, ...loc }))
            );
        }

        return post;
    };

    async getAllPosts(page: number, limit: number): Promise<getPost[]> {
        const offset=(page-1)*limit;
        const posts: CreatedPost[] = await db('posts').select('*').orderBy('created_at','desc').limit(limit).offset(offset);

        const enrichedPosts: getPost[] = await Promise.all(
            posts.map(async post => {
            const [hotels, transports, places, foods, images, geo_locations, categories] = await Promise.all([
                db('post_hotels').where('post_id', post.post_id),
                db('post_transports').where('post_id', post.post_id),
                db('post_places').where('post_id', post.post_id),
                db('post_foods').where('post_id', post.post_id),
                db('post_images').where('post_id', post.post_id),
                db('post_geo_locations').where('post_id', post.post_id),
                db('post_category_links')
                .join('post_categories', 'post_category_links.category_id', 'post_categories.category_id')
                .where('post_category_links.post_id', post.post_id)
                .pluck('post_categories.category_name'),
            ]);

            return {
                ...post,
                hotels,
                transports,
                places,
                foods,
                images,
                geo_locations,
                categories,
            };
            })
        );

        return enrichedPosts;
    }

    async getPostByPostID(post_id: number): Promise<getPost> {
        const post: CreatedPost = await db('posts').select('*').where({post_id: post_id}).first();

        if(!post) 
        {
            throw new AppError("post not found",404);
        }
      
        const [hotels, transports, places, foods, images, geo_locations, categories] = await Promise.all([
            db('post_hotels').where('post_id', post.post_id),
            db('post_transports').where('post_id', post.post_id),
            db('post_places').where('post_id', post.post_id),
            db('post_foods').where('post_id', post.post_id),
            db('post_images').where('post_id', post.post_id),
            db('post_geo_locations').where('post_id', post.post_id),
            db('post_category_links')
            .join('post_categories', 'post_category_links.category_id', 'post_categories.category_id')
            .where('post_category_links.post_id', post.post_id)
            .pluck('post_categories.category_name'),
        ]);

        const enrichedPost: getPost = {
                ...post,
                hotels,
                transports,
                places,
                foods,
                images,
                geo_locations,
                categories,
            };

        return enrichedPost;
    }


    async updatePost(post_id: number, updatedPostData: UpdatePostInput): Promise<string> {
       
        await db('posts').where({ post_id: post_id }).update({
            title: updatedPostData.title,
            description: updatedPostData.description,
            total_cost: updatedPostData.total_cost,
            duration: updatedPostData.duration,
            effort: updatedPostData.effort,
            updated_at: db.fn.now()});

       
        if (updatedPostData.hotels && updatedPostData.hotels.length>0) {
            await db('post_hotels').where({ post_id }).del();
            const hotelRecords = updatedPostData.hotels.map(hotel => ({ post_id, ...hotel })); 
            await db('post_hotels').insert(hotelRecords);
        }

        if (updatedPostData.transports && updatedPostData.transports.length>0) {
            await db('post_transports').where({ post_id }).del();
            const transportRecords = updatedPostData.transports.map(transport => ({ post_id, ...transport }));
            await db('post_transports').insert(transportRecords);
        }

        if (updatedPostData.places && updatedPostData.places.length>0) {
            await db('post_places').where({ post_id }).del();
            const placeRecords = updatedPostData.places.map(place => ({ post_id, ...place }));
            await db('post_places').insert(placeRecords);
        }

        if (updatedPostData.foods && updatedPostData.foods.length>0) {
            await db('post_foods').where({ post_id }).del();
            const foodRecords = updatedPostData.foods.map(food => ({ post_id, ...food }));
            await db('post_foods').insert(foodRecords);
        }

        if (updatedPostData.images && updatedPostData.images.length>0) {
            await db('post_images').where({ post_id }).del();
            const imageRecords = updatedPostData.images.map(img => ({ post_id, ...img }));
            await db('post_images').insert(imageRecords);
        }

        if (updatedPostData.geo_locations && updatedPostData.geo_locations.length>0) {
            await db('post_geo_locations').where({ post_id }).del();
            const geoRecords = updatedPostData.geo_locations.map(geo => ({post_id,...geo }));
            await db('post_geo_locations').insert(geoRecords);
        }

        if (updatedPostData.category_names && updatedPostData.category_names.length>0) {
            const categories = await db('post_categories')
                .whereIn('category_name', updatedPostData.category_names)
                .select('category_id');

            const categoryRecords = categories.map(category => ({
                post_id,
                category_id: category.category_id,
            }));

            await db('post_category_links').where({ post_id }).del();
            await db('post_category_links').insert(categoryRecords);
        }
        return "successfully updated post"
    }

    async deletePost(post_id: number): Promise<string> {
        const postDeleted = await db("posts").where({post_id: post_id}).del()
        return "successfully deleted the post"
    }
}


const postDAO = new PostDAO();
export default postDAO;