import { compare, hash } from 'bcrypt';
import { createdUser } from '../types/auth.type';
import authDAO from '../repositories/dao/auth.repository.ts';
import userDAO from '../repositories/dao/user.respository.ts';
import { Request, Response } from 'express';
import { ExpressRequest } from '../middlewares/auth.middleware.ts';
import { UserDTO } from '../DTOs/user.dto.ts';
import { updateUserInfo } from '../types/user.type.ts';
import { AppError } from '../utils/appError.ts';
import { HTTP_STATUS } from '../constants/httpStatus.ts';

export async function getAllUsers(page: number, limit: number): Promise<UserDTO[]> {
  const data: createdUser[] = await userDAO.getAllUsers(page, limit);
  return data.map((user) => new UserDTO(user));
}

export async function getUserByUsername(username: string):  Promise<UserDTO> {
  const data: createdUser = await userDAO.getUserByUsername(username);
  return new UserDTO(data);
}

export async function updateUser(username: string, updateUser: updateUserInfo):  Promise<UserDTO> {
    const user = await userDAO.getUserByUsername(username);
    if (!user) {
      throw new AppError("user not found", HTTP_STATUS.NOT_FOUND);
    }
   
    if(updateUser.hashed_password) 
    {
      const hashedPassword = await hash(updateUser.hashed_password, 10);
      updateUser.hashed_password=hashedPassword;
    }
   
    const updatedUser: createdUser = await userDAO.updateUser(username, updateUser);
   
    return new UserDTO(updatedUser);
}

export async function deleteUser(username: string):  Promise<UserDTO> {
    const user = await userDAO.getUserByUsername(username);
    if (!user) {
      throw new AppError("user not found", HTTP_STATUS.NOT_FOUND);
    }
    const result: createdUser = await userDAO.deleteUser(username);
 
    return new UserDTO(result); 
}


export async function getUserByUserID(user_id: string):  Promise<UserDTO> {
  const data: createdUser = await userDAO.getUserByID(user_id);
  return new UserDTO(data);
}