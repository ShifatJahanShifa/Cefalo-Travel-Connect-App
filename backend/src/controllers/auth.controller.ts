import { NextFunction, Request, Response } from 'express';
import * as authService from '../services/auth.service.ts';
import { ExpressRequest } from '../middlewares/auth.middleware.ts';
import { AuthDTO } from '../DTOs/auth.dto.ts';


export const signup = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const result: AuthDTO = await authService.signup(req.body);
   
    res
      .cookie('refreshToken', result.refreshToken, {
        httpOnly: true,
        sameSite: 'none',
        maxAge: 365 * 24 * 60 * 60 * 1000 
      })
      .header('Authorization', `Bearer ${result.accessToken}`)
      .status(201).json(result)
      
 
  } catch (error) {
    next(error)
  }
};

export const signin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const result: AuthDTO = await authService.signin(req.body);
      
          res
        .cookie('refreshToken', result.refreshToken, {
          httpOnly: true,
          sameSite: 'none',
          maxAge: 365 * 24 * 60 * 60 * 1000 
        })
      .header('Authorization', `Bearer ${result.accessToken}`)
      .status(200).json(result)

    } catch (error) {
       next(error)
    }
};


export const signout = async (req: Request, res: Response, next: NextFunction): Promise<void> =>{
    try {
        await authService.signout(req, res)
    }
    catch(error) {
        next(error)
    }
}

export const refreshAccessToken = async (req: ExpressRequest, res: Response, next: NextFunction): Promise<void> => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) 
  { 
    res.status(401).json({ message: 'Missing refresh token' })
    return
  }

  try {
    const newAccessToken = await authService.refreshAccessToken(refreshToken)
    res.header('Authorization', `Bearer ${newAccessToken}`)
       .status(200)
       .json({ accessToken: newAccessToken })
  } catch (error) {
    next(error)
  }
};
