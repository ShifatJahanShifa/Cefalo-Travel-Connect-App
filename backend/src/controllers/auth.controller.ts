import { NextFunction, Request, Response } from 'express';
import * as authService from '../services/auth.service.ts';
import { ExpressRequest } from '../middlewares/auth.middleware.ts';
import { AuthDTO } from '../DTOs/auth.dto.ts';
import { HTTP_STATUS } from '../constants/httpStatus.ts';
import { ONE_DAY_IN_MS, ONE_YEAR_IN_MS } from '../constants/time.ts';


export const signup = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const result: AuthDTO = await authService.signup(req.body);
   
    res
      .cookie('refreshToken', result.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'none',
        maxAge: ONE_YEAR_IN_MS
      })
      .header('Authorization', `Bearer ${result.accessToken}`)
      .status(HTTP_STATUS.CREATED).json(result);
      
  } catch (error) {
    next(error);
  }
}

export const signin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const result: AuthDTO = await authService.signin(req.body);
      
        res
        .cookie('refreshToken', result.refreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'none',
          maxAge: ONE_YEAR_IN_MS
        })
        .header('Authorization', `Bearer ${result.accessToken}`)
        .status(HTTP_STATUS.OK).json(result);

    } catch (error) {
       next(error);
    }
}


export const signout = async (req: ExpressRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        await authService.signout(req, res);
    }
    catch(error) {
        next(error);
    }
}

export const refreshAccessToken = async (req: ExpressRequest, res: Response, next: NextFunction): Promise<void> => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) 
  { 
    res.status(HTTP_STATUS.UNAUTHORIZED).json({ message: 'Missing refresh token' });
    return;
  }

  try {
    const newAccessToken = await authService.refreshAccessToken(refreshToken);
    res.header('Authorization', `Bearer ${newAccessToken}`)
       .status(HTTP_STATUS.OK)
       .json({ accessToken: newAccessToken });

  } catch (error) {
    next(error);
  }
}
