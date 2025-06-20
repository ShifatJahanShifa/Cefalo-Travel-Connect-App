var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import postDAO from "../repositories/dao/post.dao.js";
import { PostResponseDTO } from "../DTOs/post.dto.js";
export const createPost = (input) => __awaiter(void 0, void 0, void 0, function* () {
    const createdPost = yield postDAO.createPost(input);
    // not calling dto now
    return createdPost;
});
export const getAllPosts = (page, limit) => __awaiter(void 0, void 0, void 0, function* () {
    const posts = yield postDAO.getAllPosts(page, limit);
    return posts.map((post) => new PostResponseDTO(post));
});
export const getPostByPostID = (post_id) => __awaiter(void 0, void 0, void 0, function* () {
    const post = yield postDAO.getPostByPostID(post_id);
    return new PostResponseDTO(post);
});
export const updatePost = (post_id, updatedPostData) => __awaiter(void 0, void 0, void 0, function* () {
    const status = yield postDAO.updatePost(post_id, updatedPostData);
    return status;
});
export const deletePost = (post_id) => __awaiter(void 0, void 0, void 0, function* () {
    const status = yield postDAO.deletePost(post_id);
    return status;
});
export const getPostsByUserID = (user_id) => __awaiter(void 0, void 0, void 0, function* () {
    const posts = yield postDAO.getPostsByUserID(user_id);
    return posts;
});
