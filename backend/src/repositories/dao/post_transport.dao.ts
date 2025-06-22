import { IPostTransport } from "../interfaces/post_transport.interface.ts";
import { Knex } from "knex";
import { dbClient } from "../../db/db.ts";
import { AppError } from "../../utils/appError.ts";
const db: Knex = dbClient.getConnection();

class PostTransportDao implements IPostTransport {
    async createPostTransport(post_id: number, transport_id: number, cost: number, rating: number, review: string): Promise<void> {
        await db('post_transports').insert({
            post_id: post_id,
            transport_id: transport_id,
            cost: cost,
            rating: rating,
            review: review,
        });
    }

    async getById(post_id: number): Promise<any[]> {
         if(!post_id) 
        {
            throw new AppError("not valid id", 400)
        }
        const data: any[] = await db('post_transports').where({ post_id: post_id }) 
        console.log(data, 'wee')
        return data
    }

    async updatePostTransport(post_id: number, transport_id: number, cost: number, rating: number, review: string): Promise<any> {
         await db('post_transports').where({post_id: post_id, transport_id: transport_id}).update({
                    cost: cost,
                    rating: rating,
                    review: review 
        })
    }
}

const postTransportDao = new PostTransportDao()
export default postTransportDao