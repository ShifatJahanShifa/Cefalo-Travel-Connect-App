import { compare, hash } from 'bcrypt';
import { generateJWT } from '../utils/jwt.ts';
import { createdUser } from '../types/auth.type';
import authDAO from '../repository/dao/auth.dao.ts';
import userDAO from '../repository/dao/user.dao.ts';
import { Request, Response } from 'express';
import { ExpressRequest } from '../middlewares/auth.middleware.ts';
import { UserDTO } from '../DTOs/user.dto.ts';
import { updateUserInfo } from '../types/user.tpye.ts';
import { AppError } from '../utils/appError.ts';
 

export async function getAllUsers(page: number, limit: number) {
    const data: createdUser[] = await userDAO.getAllUsers(page, limit)
    console.log(data)
    return data.map((user) => new UserDTO(user))
}

export async function getUserByUsername(username: string) {
  const data: createdUser = await userDAO.getUserByUsername(username)
  return new UserDTO(data)
}

export async function updateUser(username: string, updateUser: updateUserInfo) {
    const user = await userDAO.getUserByUsername(username);
    if (!user) {
      throw new AppError("user not found",404)
    }

    const updatedUser: createdUser = await userDAO.updateUser(username, updateUser);
    if (!updatedUser) {
      throw new AppError("Internal server error",500)
    }

    return new UserDTO(updatedUser)
}

export async function deleteUser(username: string) {
    const user = await userDAO.getUserByUsername(username);
    if (!user) {
      throw new AppError("user not found",404)
    }
    const result: createdUser = await userDAO.deleteUser(username);
    if (!result) {
        throw new AppError("Internal server error",500)
    }
    console.log(result)
    return new UserDTO(result); 
}

export async function getAllAdmins() {
    const data: createdUser[] = await userDAO.getAllAdmins()
    return data.map((user) => new UserDTO(user))
}