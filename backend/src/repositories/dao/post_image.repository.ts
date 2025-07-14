import { IPostImage } from "../interfaces/post_image.interface.ts";
import { Knex } from "knex";
import { dbClient } from "../../db/db.ts";
import { AppError } from "../../utils/appError.ts";
const db: Knex = dbClient.getConnection();

class PostImageDao implements IPostImage {
    async createPostImage(post_id: string, image_url: string, caption?: string): Promise<void> {
        await db('post_images').insert({
            post_id: post_id,
            image_url: image_url,
            caption: caption?caption:null
        });
    }

    async getById(post_id: string): Promise<any[]> {
       
       const data: any[] = await db('post_images').where({ post_id });
      
       return data;
    }

    async updatePostImage(post_id: string, image_id: string, caption?: string): Promise<any> {
        await db('post_images').where({post_id: post_id, image_id: image_id}).update({
                    caption: caption
        });
    }

    async deleteById(post_id: string): Promise<void> {
        await db('post_images').where({post_id: post_id}).del();
    }
}

const postImageDao = new PostImageDao();
export default postImageDao;