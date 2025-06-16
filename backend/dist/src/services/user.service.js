var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import userDAO from "../repository/dao/user.dao.js";
import { UserDTO } from "../DTOs/user.dto.js";
import { AppError } from "../utils/appError.js";
export function getAllUsers(page, limit) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield userDAO.getAllUsers(page, limit);
        console.log(data);
        return data.map((user) => new UserDTO(user));
    });
}
export function getUserByUsername(username) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield userDAO.getUserByUsername(username);
        return new UserDTO(data);
    });
}
export function updateUser(username, updateUser) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield userDAO.getUserByUsername(username);
        if (!user) {
            throw new AppError("user not found", 404);
        }
        const updatedUser = yield userDAO.updateUser(username, updateUser);
        if (!updatedUser) {
            throw new AppError("Internal server error", 500);
        }
        return new UserDTO(updatedUser);
    });
}
export function deleteUser(username) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield userDAO.getUserByUsername(username);
        if (!user) {
            throw new AppError("user not found", 404);
        }
        const result = yield userDAO.deleteUser(username);
        if (!result) {
            throw new AppError("Internal server error", 500);
        }
        console.log(result);
        return new UserDTO(result);
    });
}
export function getAllAdmins() {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield userDAO.getAllAdmins();
        return data.map((user) => new UserDTO(user));
    });
}
