import { IPostPlace } from "../interfaces/post_place.interface.ts";
import { Knex } from "knex";
import { dbClient } from "../../db/db.ts";
import { AppError } from "../../utils/appError.ts";
const db: Knex = dbClient.getConnection();

class PostPlaceDao implements IPostPlace {
    async createPostPlace(post_id: number, place_id: number, rating: number, review: string): Promise<void> {
        await db('post_places').insert({
            post_id: post_id,
            place_id: place_id,
            rating: rating,
            review: review,
        });
    }

    async getById(post_id: number): Promise<any[]> {
         if(!post_id) 
        {
            throw new AppError("not valid id", 400)
        }
        const data: any[] = await db('post_places').where({ post_id })
        console.log(data)
        return data
    }

    async updatePostPlace(post_id: number, place_id: number, rating: number, review: string): Promise<any> {
        await db('post_places').where({post_id: post_id, place_id: place_id}).update({
                    rating: rating,
                    review: review 
        })
    }
}

const postPlaceDao = new PostPlaceDao()
export default postPlaceDao