import { Request, Response, NextFunction } from "express"
import jwt from 'jsonwebtoken';
import userDAO from '../repositories/dao/auth.dao.ts'
import { Role } from "../enums/role.ts";
import { DecodedUser, verifyAccessToken } from "../utils/jwt.ts";
import dotenv from "dotenv"
dotenv.config()

const { sign, verify } = jwt

// let's see later
export interface ExpressRequest extends Request{
    username?: string
    role?: string
    email?: string
} 


// define the return type
// the goal of this function is to call the next function when everything is ok. so the return type will be void
export const authenticate = async (req: ExpressRequest, res: Response, next: NextFunction): Promise<void> =>{
    try {
        const authHeader = req.headers.authorization;
        const accessToken = authHeader && authHeader.split(' ')[1];

        if(!accessToken) 
        {
            res.status(401).send("Cannot access this route");
            return;
        }        
      
        const decode: DecodedUser=verifyAccessToken(accessToken);
      
        req.username=decode.username;
        req.email=decode.email;
        req.role=decode.role;
 
        next();
    }
    catch(error) {
        res.status(401).send("Unauthorized User");
    }
    
}

export const authorize = async (req: ExpressRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const loggedInUsername = req.username!;
        const isAdmin = req.role === Role.ADMIN;
        const targetUsername = req.params.username;

        if (req.body.role && req.body.role === Role.ADMIN && !isAdmin) {
            res.status(403).json({ message: "Only admin can set admin role." });
            return;
        }
        // Check if attempting to update someone else's profile info except role
        else if (!req.body.role && loggedInUsername !== targetUsername) {
            res.status(403).json({ message: "You can only update your own profile." });
            return;
        }
        next();
    }
    catch(err) {
        res.status(403).json({ message: "access forbidden"});
    }
}

export const authorizeAdmin = async (req: ExpressRequest, res: Response, next: NextFunction): Promise<void> =>{
    try{
        if (req.role !== Role.ADMIN) {
            res.status(403).json({ message: "Unauthorized to perform the action" });
            return;
        }
        next();
    }
    catch(err) {
        res.status(403).json({ message: "access forbidden"});
    }
}
