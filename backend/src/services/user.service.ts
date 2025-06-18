import { compare, hash } from 'bcrypt';
import { createdUser } from '../types/auth.type';
// import authDAO from '../repositories/dao/auth.dao.ts';
import authDAO from '../repositories/dao/auth.dao.ts';
import userDAO from '../repositories/dao/user.dao.ts';
import { Request, Response } from 'express';
import { ExpressRequest } from '../middlewares/auth.middleware.ts';
import { UserDTO } from '../DTOs/user.dto.ts';
import { updateUserInfo } from '../types/user.tpye.ts';
import { AppError } from '../utils/appError.ts';
 

export async function getAllUsers(page: number, limit: number): Promise<UserDTO[]> {
    const data: createdUser[] = await userDAO.getAllUsers(page, limit)
    return data.map((user) => new UserDTO(user))
}

export async function getUserByUsername(username: string):  Promise<UserDTO> {
  const data: createdUser = await userDAO.getUserByUsername(username)
  return new UserDTO(data)
}

export async function updateUser(username: string, updateUser: updateUserInfo):  Promise<UserDTO> {
    const user = await userDAO.getUserByUsername(username);
    if (!user) {
      throw new AppError("user not found",404)
    }

    // need to change this error
    const updatedUser: createdUser = await userDAO.updateUser(username, updateUser);
    if (!updatedUser) {
      throw new AppError("Internal server error",500)
    }

    return new UserDTO(updatedUser)
}

export async function deleteUser(username: string):  Promise<UserDTO> {
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
