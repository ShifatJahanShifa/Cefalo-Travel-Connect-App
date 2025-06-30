import * as PostService from "../services/post.service.js";
import * as UserService from "../services/user.service.js";
export const createPost = async (req, res, next) => {
    try {
        const post = await PostService.createPost(req.body);
        res.status(201).send(post);
    }
    catch (error) {
        next(error);
    }
};
export const getAllPosts = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);
        const posts = await PostService.getAllPosts(page, limit);
        res.status(200).json(posts);
    }
    catch (error) {
        next(error);
    }
};
export const getPostByPostID = async (req, res, next) => {
    try {
        const post_id = (req.params.post_id);
        const post = await PostService.getPostByPostID(post_id);
        res.status(200).json(post);
    }
    catch (error) {
        next(error);
    }
};
export const updatePost = async (req, res, next) => {
    try {
        const post_id = (req.params.post_id);
        // const user: UserDTO = await UserService.getUserByUsername()
        const updatedPostData = req.body;
        const status = await PostService.updatePost(post_id, updatedPostData);
        res.status(200).send(status);
    }
    catch (error) {
        next(error);
    }
};
export const deletePost = async (req, res, next) => {
    try {
        const post_id = (req.params.post_id);
        const user = await UserService.getUserByUsername(req.username);
        const status = await PostService.deletePost(post_id, user.user_id);
        res.status(204).send(status);
    }
    catch (error) {
        next(error);
    }
};
export const getPostsByUserID = async (req, res, next) => {
    try {
        // at first i will get user_id from user table
        const username = req.params.username;
        const user = await UserService.getUserByUsername(username);
        // call the post service 
        const posts = await PostService.getPostsByUserID(user.user_id);
        res.status(200).json(posts);
    }
    catch (error) {
        next(error);
    }
};
export const searchPosts = async (req, res, next) => {
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
        const posts = await PostService.searchPosts(filters);
        res.status(200).json(posts);
    }
    catch (err) {
        next(err);
    }
};
export const togglePostLike = async (req, res, next) => {
    try {
        const post_id = (req.params.postId);
        const username = req.username;
        const user = await UserService.getUserByUsername(username);
        const result = await PostService.togglePostLike(post_id, user.user_id);
        res.status(200).json(result);
    }
    catch (error) {
        next(error);
    }
};
