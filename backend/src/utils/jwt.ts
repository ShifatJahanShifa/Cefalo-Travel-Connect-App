import { createdUser } from "../types/auth.type";
import dotenv from 'dotenv';
dotenv.config();
// import { sign } from 'jsonwebtoken'  
import jwt, { JwtPayload} from 'jsonwebtoken';
const { sign, verify } = jwt;

export interface DecodedUser extends JwtPayload {
  username: string;
  email: string;
  role: string;
}


export const generateAccessToken = (user: createdUser): string => {
  return sign(
    { username: user.username, email: user.email, role: user.role },
    process.env.ACCESS_TOKEN_SECRET!,
    { expiresIn: '1hr' }
  );
}

export const generateRefreshToken = (user: createdUser): string => {
  return sign(
    { email: user.email },
    process.env.REFRESH_TOKEN_SECRET!,
    { expiresIn: '365d'}
  );
}

export const verifyAccessToken = (token: string): DecodedUser => {
  return verify(token, process.env.ACCESS_TOKEN_SECRET!) as DecodedUser;
};

export const verifyRefreshToken = (token: string): DecodedUser => {
  return verify(token, process.env.REFRESH_TOKEN_SECRET!) as DecodedUser;
};
