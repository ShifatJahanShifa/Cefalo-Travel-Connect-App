import { IPostRestaurant } from "../interfaces/post_restaurant.interface.ts";
import { Knex } from "knex";
import { dbClient } from "../../db/db.ts";
import { AppError } from "../../utils/appError.ts";
const db: Knex = dbClient.getConnection();

class PostRestaurantDao implements IPostRestaurant {
    async createPostRestaurant(post_id: number, restaurant_id: number, cost: number, rating: number, review: string): Promise<void> {
        await db('post_restaurants').insert({
            post_id: post_id,
            restaurant_id: restaurant_id,
            cost: cost,
            rating: rating,
            review: review,
        })
    }

    async getById(post_id: number): Promise<any[]> {
         if(!post_id) 
        {
            throw new AppError("not valid id", 400)
        }
        const data: any[] = await db('post_restaurants').where({ post_id })
        console.log(data, 'gg')
        return data
    }

    async updatePostRestaurant(post_id: number, restaurant_id: number, cost: number, rating: number, review: string): Promise<any> {
        await db('post_restaurants').where({post_id: post_id, restaurant_id: restaurant_id}).update({
                    cost: cost,
                    rating: rating,
                    review: review 
        })
    }
}

const postRestaurantDao = new PostRestaurantDao()
export default postRestaurantDao