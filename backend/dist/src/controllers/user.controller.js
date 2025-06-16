var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as userService from "../services/user.service.js";
export const getAllUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const data = yield userService.getAllUsers(page, limit);
        res.status(200).json(data);
    }
    catch (err) {
        next(err);
    }
});
export const getUserByUsername = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const username = req.params.username;
        const data = yield userService.getUserByUsername(username);
        res.status(200).json(data);
    }
    catch (err) {
        next(err);
    }
});
export const updateUserByUsername = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const username = req.params.username;
        const updatePayload = req.body;
        const updatedUser = yield userService.updateUser(username, updatePayload);
        res.status(200).json(updatedUser);
    }
    catch (err) {
        next(err);
    }
});
export const deleteUserByUsername = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const username = req.params.username;
        console.log('deleted user');
        const deletedUser = yield userService.deleteUser(username);
        console.log('deleted user', deletedUser);
        res.status(204).json(deletedUser);
    }
    catch (err) {
        next(err);
    }
});
// not used now
export const getAllAdmins = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // i need to add pagination later
    try {
        const data = yield userService.getAllAdmins();
        res.status(200).json(data);
    }
    catch (err) {
        next(err);
    }
});
