import { IPostAccommodation } from "../interfaces/post_accommodation.interface.ts";
import { Knex } from "knex";
import { dbClient } from "../../db/db.ts";
import { AppError } from "../../utils/appError.ts";
const db: Knex = dbClient.getConnection();

class PostAccommodationDao implements IPostAccommodation {
    async createPostAccommodation(post_id: number, accommodation_id: number, cost: number, rating: number, review: string): Promise<void> {
        await db('post_accommodations').insert({
            post_id: post_id,
            accommodation_id: accommodation_id,
            cost: cost,
            rating: rating,
            review: review,
        });
    }

    async getById(post_id: number): Promise<any[]> {
        if(!post_id) 
        {
            console.log('yesss')
            throw new AppError("not valid id", 400)
        }
        const data: any[] = await db('post_accommodations').where({post_id})
        console.log(data, 'jj')
        return data
    }

    async updatePostAccommodation(post_id: number, accommodation_id: number, cost: number, rating: number, review: string): Promise<any> {
        await db('post_accommodations').where({post_id: post_id, accommodation_id: accommodation_id}).update({
                    cost: cost,
                    rating: rating,
                    review: review 
        })
    }
}

const postAccommodationDao = new PostAccommodationDao()
export default postAccommodationDao