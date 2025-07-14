import { Request, Response,NextFunction } from 'express';
import * as userService from '../services/user.service.ts';
import { ExpressRequest } from '../middlewares/auth.middleware.ts';
import { UserDTO } from '../DTOs/user.dto.ts';
import { updateUserInfo } from '../types/user.type.ts';
import { HTTP_STATUS } from '../constants/httpStatus.ts';


export const getAllUsers = async (req: ExpressRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const page: number = parseInt(req.query.page as string);
        const limit: number = parseInt(req.query.limit as string);

        const data: UserDTO[] = await userService.getAllUsers(page,limit);
        res.status(HTTP_STATUS.OK).json(data);
      } 
      catch (err) {
        next(err);
      }
}


export const getUserByUsername = async (req: ExpressRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const username: string = req.params.username;
    const data: UserDTO = await userService.getUserByUsername(username);
   
    res.status(HTTP_STATUS.OK).json(data);

  } catch (err) {
    next(err);
  }
}


export const updateUserByUsername = async (req: ExpressRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const username: string = req.params.username;
    const updatePayload: updateUserInfo = req.body;
    const updatedUser: UserDTO = await userService.updateUser(username, updatePayload);

    res.status(HTTP_STATUS.OK).json(updatedUser);

  } catch (err) {
    next(err);
  }
}


export const deleteUserByUsername = async (req: ExpressRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const username: string = req.params.username;
    const deletedUser: UserDTO = await userService.deleteUser(username);
    res.status(HTTP_STATUS.NO_CONTENT).json(deletedUser);

  } 
  catch (err) {
    next(err);
  }
}


export const getUserByUserId = async (req: ExpressRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user_id: string = (req.params.userId);
    const data: UserDTO = await userService.getUserByUserID(user_id);
   
    res.status(HTTP_STATUS.OK).json(data);

    } catch (err) {
        next(err);
    }
}

export const getMe = async(req: ExpressRequest, res: Response, next: NextFunction): Promise<void> => {
  try{
    const username: string = req.username!; 
    const data: UserDTO = await userService.getUserByUsername(username);
   
    res.status(HTTP_STATUS.OK).json(data);
  }
  catch(error)
  {
    next(error);
  }
}