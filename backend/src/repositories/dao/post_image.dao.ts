import { IPostImage } from "../interfaces/post_image.interface.ts";
import { Knex } from "knex";
import { dbClient } from "../../db/db.ts";
import { AppError } from "../../utils/appError.ts";
const db: Knex = dbClient.getConnection();

class PostImageDao implements IPostImage {
    async createPostImage(post_id: number, image_url: string, caption?: string): Promise<void> {
        await db('post_images').insert({
            post_id: post_id,
            image_url: image_url,
            caption: caption?caption:null
        });
    }

    async getById(post_id: number): Promise<any[]> {
        if(!post_id) 
        {
            throw new AppError("not valid id", 400)
        }
       const data: any[] = await db('post_images').where({ post_id })
       console.log(data)
       return data
    }

    async updatePostImage(post_id: number, image_id: number, caption?: string): Promise<any> {
        await db('post_images').where({post_id: post_id, image_id: image_id}).update({
                    caption: caption
        })
    }

    async deleteById(post_id: number): Promise<void> {
        await db('post_images').where({post_id: post_id}).del()
    }
}

const postImageDao = new PostImageDao()
export default postImageDao