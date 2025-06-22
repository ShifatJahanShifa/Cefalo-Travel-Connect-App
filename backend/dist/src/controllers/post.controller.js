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
import * as UserService from "../services/user.service.js";
export const createPost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield PostService.createPost(req.body);
        res.status(201).send(post);
    }
    catch (error) {
        next(error);
    }
});
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
export const getPostsByUserID = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // at first i will get user_id from user table
        const username = req.params.username;
        const user = yield UserService.getUserByUsername(username);
        // call the post service 
        const posts = yield PostService.getPostsByUserID(user.user_id);
        res.status(200).json(posts);
    }
    catch (error) {
        next(error);
    }
});
export const searchPosts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('in the con');
        const { title, min_cost, max_cost, transport_type, place_name, restaurant_name, accommodation_type } = req.query;
        const filters = {
            title: title,
            min_cost: min_cost ? Number(min_cost) : undefined,
            max_cost: max_cost ? Number(max_cost) : undefined,
            transport_type: transport_type,
            place_name: place_name,
            restaurant_name: restaurant_name,
            accommodation_type: accommodation_type
        };
        const posts = yield PostService.searchPosts(filters);
        res.status(200).json(posts);
    }
    catch (err) {
        next(err);
    }
});
export const togglePostLike = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post_id = parseInt(req.params.postId);
        const username = req.username;
        const user = yield UserService.getUserByUsername(username);
        const result = yield PostService.togglePostLike(post_id, user.user_id);
        res.status(200).json(result);
    }
    catch (error) {
        next(error);
    }
});
