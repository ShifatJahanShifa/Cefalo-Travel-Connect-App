import * as userService from "../services/user.service.js";
export const getAllUsers = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);
        const data = await userService.getAllUsers(page, limit);
        res.status(200).json(data);
    }
    catch (err) {
        next(err);
    }
};
export const getUserByUsername = async (req, res, next) => {
    try {
        const username = req.params.username;
        const data = await userService.getUserByUsername(username);
        res.status(200).json(data);
    }
    catch (err) {
        next(err);
    }
};
export const updateUserByUsername = async (req, res, next) => {
    try {
        const username = req.params.username;
        const updatePayload = req.body;
        const updatedUser = await userService.updateUser(username, updatePayload);
        res.status(200).json(updatedUser);
    }
    catch (err) {
        next(err);
    }
};
export const deleteUserByUsername = async (req, res, next) => {
    try {
        const username = req.params.username;
        const deletedUser = await userService.deleteUser(username);
        res.status(204).json(deletedUser);
    }
    catch (err) {
        next(err);
    }
};
export const getUserByUserId = async (req, res, next) => {
    try {
        const user_id = (req.params.userId);
        const data = await userService.getUserByUserID(user_id);
        res.status(200).json(data);
    }
    catch (err) {
        next(err);
    }
};
export const getMe = async (req, res, next) => {
    try {
        const username = req.username;
        const data = await userService.getUserByUsername(username);
        res.status(200).json(data);
    }
    catch (error) {
        next(error);
    }
};
