import { IPostFood } from "../interfaces/post_food.interface";
import { Knex } from "knex";
import { dbClient } from "../../db/db.ts";
import { AppError } from "../../utils/appError.ts";
const db: Knex = dbClient.getConnection();

class PostFood implements IPostFood {
    async createPostFood(post_id: string, food_name: string, cost: number, rating: number, review: string): Promise<void> {
        await db("post_foods").insert({
            post_id: post_id,
            food_name: food_name,
            cost: cost,
            rating: rating,
            review: review
        })
        .returning("*") 
    }

    async getById(post_id: string): Promise<any[]> {
        const results = await db("post_foods").select("*").where({ post_id: post_id})
        return results;
    }

    async updatePostFood(post_id: string, food_name: string, cost: number, rating: number, review: string): Promise<any> {
        await db("post_foods").where({post_id: post_id, food_name}).update({
            cost: cost,
            rating: rating,
            review: review 
        })
    }
}

const postFoodDao = new PostFood()
export default postFoodDao