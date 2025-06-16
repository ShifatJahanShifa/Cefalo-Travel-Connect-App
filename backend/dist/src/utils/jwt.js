import dotenv from 'dotenv';
dotenv.config();
// import { sign } from 'jsonwebtoken'  
import jwt from 'jsonwebtoken';
const { sign, verify } = jwt;
export const generateJWT = (user) => {
    return sign({ username: user.username, email: user.email, role: user.role }, process.env.SECRET_KEY, { expiresIn: '1hr' });
};
export const generateAccessToken = (user) => {
    return sign({ username: user.username, email: user.email, role: user.role }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1hr' });
};
export const generateRefreshToken = (user) => {
    return sign({ email: user.email }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '365d' });
};
export const verifyAccessToken = (token) => {
    return verify(token, process.env.ACCESS_TOKEN_SECRET);
};
export const verifyRefreshToken = (token) => {
    return verify(token, process.env.REFRESH_TOKEN_SECRET);
};
