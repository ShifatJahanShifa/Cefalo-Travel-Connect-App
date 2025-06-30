import { dbClient } from "../../db/db.js";
const db = dbClient.getConnection();
class PostImageDao {
    async createPostImage(post_id, image_url, caption) {
        await db('post_images').insert({
            post_id: post_id,
            image_url: image_url,
            caption: caption ? caption : null
        });
    }
    async getById(post_id) {
        const data = await db('post_images').where({ post_id });
        return data;
    }
    async updatePostImage(post_id, image_id, caption) {
        await db('post_images').where({ post_id: post_id, image_id: image_id }).update({
            caption: caption
        });
    }
    async deleteById(post_id) {
        await db('post_images').where({ post_id: post_id }).del();
    }
}
const postImageDao = new PostImageDao();
export default postImageDao;
