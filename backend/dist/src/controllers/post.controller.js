var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as PostService from "../services/post.service.js";
export const createPost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield PostService.createPost(req.body);
        res.status(201).json(post);
    }
    catch (error) {
        next(error);
    }
});
// no auth middleware now
export const getAllPosts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);
        const posts = yield PostService.getAllPosts(page, limit);
        res.status(200).json(posts);
    }
    catch (error) {
        next(error);
    }
});
export const getPostByPostID = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post_id = parseInt(req.params.post_id, 10);
        const post = yield PostService.getPostByPostID(post_id);
        res.status(200).json(post);
    }
    catch (error) {
        next(error);
    }
});
export const updatePost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post_id = parseInt(req.params.post_id);
        const updatedPostData = req.body;
        const status = yield PostService.updatePost(post_id, updatedPostData);
        res.status(200).send(status);
    }
    catch (error) {
        next(error);
    }
});
export const deletePost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post_id = parseInt(req.params.post_id);
        const status = yield PostService.deletePost(post_id);
        res.status(204).send(status);
    }
    catch (error) {
        next(error);
    }
});
