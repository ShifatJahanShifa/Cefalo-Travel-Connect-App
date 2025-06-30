import { hash } from 'bcrypt';
import userDAO from "../repositories/dao/user.respository.js";
import { UserDTO } from "../DTOs/user.dto.js";
import { AppError } from "../utils/appError.js";
export async function getAllUsers(page, limit) {
    const data = await userDAO.getAllUsers(page, limit);
    return data.map((user) => new UserDTO(user));
}
export async function getUserByUsername(username) {
    const data = await userDAO.getUserByUsername(username);
    return new UserDTO(data);
}
export async function updateUser(username, updateUser) {
    const user = await userDAO.getUserByUsername(username);
    if (!user) {
        throw new AppError("user not found", 404);
    }
    if (updateUser.hashed_password) {
        const hashedPassword = await hash(updateUser.hashed_password, 10);
        updateUser.hashed_password = hashedPassword;
    }
    const updatedUser = await userDAO.updateUser(username, updateUser);
    return new UserDTO(updatedUser);
}
export async function deleteUser(username) {
    const user = await userDAO.getUserByUsername(username);
    if (!user) {
        throw new AppError("user not found", 404);
    }
    const result = await userDAO.deleteUser(username);
    if (!result) {
        throw new AppError("Internal server error", 500);
    }
    console.log(result);
    return new UserDTO(result);
}
export async function getUserByUserID(user_id) {
    const data = await userDAO.getUserByID(user_id);
    return new UserDTO(data);
}
