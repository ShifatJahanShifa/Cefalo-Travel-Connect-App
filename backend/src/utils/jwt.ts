import { User, createdUser } from "../DTOs/auth.dto.ts"
import dotenv from 'dotenv'
dotenv.config()
// import { sign } from 'jsonwebtoken'  
import jwt from 'jsonwebtoken';
const { sign, verify } = jwt;


export const generateJWT=(user: createdUser): string =>{
    return sign({username: user.username, email: user.email, role: user.role}, process.env.SECRET_KEY!, { expiresIn: '1hr'})
}

