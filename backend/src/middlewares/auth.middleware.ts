import { Request, Response, NextFunction } from "express"
import jwt from 'jsonwebtoken';
import { User } from "../DTOs/auth.dto.ts"
import userDAO from '../repository/dao/auth.dao.ts'
import dotenv from "dotenv"
dotenv.config()

const { sign, verify } = jwt

// let's see later
export interface ExpressRequest extends Request{
    email?: string
} 



// define the return type
// the goal of this function is to call the next function when everything is ok. so the return type will be void
export const authenticate=async(req: ExpressRequest, res: Response, next: NextFunction): Promise<void> =>{
    try {
        
        let accessToken = req.cookies.token

        if(!accessToken) 
        {
            res.status(403).send("Cannot access this route")
            return
        }
        
        
        const decode=verify(accessToken, process.env.SECRET_KEY!) as { username: string, email: string, role: string }
        req.email=decode.email
    
        next()
    }
    catch(error) {
        res.status(401).send("Unauthorized User");
    }
    
}
