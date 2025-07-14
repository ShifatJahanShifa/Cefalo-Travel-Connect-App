import { IPostPlace } from "../interfaces/post_place.interface.ts";
import { Knex } from "knex";
import { dbClient } from "../../db/db.ts";
import { AppError } from "../../utils/appError.ts";
const db: Knex = dbClient.getConnection();

class PostPlaceDao implements IPostPlace {
    async createPostPlace(post_id: string, place_id: string, cost: number, rating: number, review: string): Promise<void> {
        await db('post_places').insert({
            post_id: post_id,
            place_id: place_id,
            cost: cost,
            rating: rating,
            review: review,
        });
    }

    async getById(post_id: string): Promise<any[]> {
        
        const data: any[] = await db('post_places').where({ post_id })
        
        return data
    }

    async updatePostPlace(post_id: string, place_id: string, cost: number, rating: number, review: string): Promise<any> {
        await db('post_places').where({post_id: post_id, place_id: place_id}).update({
                    cost: cost,
                    rating: rating,
                    review: review 
        })
    }
}

const postPlaceDao = new PostPlaceDao()
export default postPlaceDao