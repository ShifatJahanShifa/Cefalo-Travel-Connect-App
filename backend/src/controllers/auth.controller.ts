import { Request, Response } from 'express';
import * as authService from '../services/auth.service.ts';
import { ExpressRequest } from '../middlewares/auth.middleware.ts';

export const signup = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log('jsdj')
    const result = await authService.signup(req.body);
    res.cookie('token',result.token)
    res.status(201).json(result);
    console.log('i got result', result)
  } catch (error) {
    res.status(400).json({ error: 'Email is not unique' });
  }
};

export const signin = async (req: Request, res: Response): Promise<void> => {
    try {
        const result = await authService.signin(req.body);
        res.cookie('token',result.token)
        res.status(200).json(result);
    } catch (error) {
        res.status(401).json({ error: 'Email or password is wrong' });
    }
};


export const signout=async (req: Request, res: Response): Promise<void> =>{
    try {
        await authService.signout(req, res)
    }
    catch(error) {
        res.status(404).json({message: "user was not logged in"})
    }
}

export const getUser = async (req: ExpressRequest, res: Response): Promise<void> => {
    try {
        if (!req.email) 
        {
            res.sendStatus(401);
            return;
        }
        const userData = await authService.getUser(req, res)
        res.status(200).json(userData)

    } 
    catch (error) {
        res.status(404).json({ error: 'User not found' });
    }
};