import { compare, hash } from 'bcrypt';
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from "../utils/jwt.js";
// import AuthDAO from '../repositories/dao/auth.dao.ts' 
import authDAO from "../repositories/dao/auth.repository.js";
import { AuthDTO } from "../DTOs/auth.dto.js";
import { AppError } from "../utils/appError.js";
import userDAO from "../repositories/dao/user.respository.js";
import dotenv from 'dotenv';
dotenv.config();
export const signup = async (userData) => {
    const { username, email, password } = userData;
    const userFoundByEmail = await authDAO.findUserByEmail(email);
    if (userFoundByEmail) {
        throw new AppError("email is already taken", 400);
    }
    const userFoundByUsername = await authDAO.findUserByUsername(username);
    if (userFoundByUsername) {
        throw new AppError("username is already taken", 400);
    }
    const hashedPassword = await hash(password, 10);
    const user = await authDAO.insertUser(username, email, hashedPassword);
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    const refreshTokenExpiry = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000);
    await authDAO.insertRefreshToken(user.user_id, refreshToken, refreshTokenExpiry);
    return new AuthDTO(user, accessToken, refreshToken);
};
export const signin = async (userData) => {
    const user = await authDAO.findUserByEmail(userData.email);
    if (!user) {
        throw new AppError("invalid credential", 401);
    }
    const isPasswordCorrect = await compare(userData.password, user.hashed_password);
    if (!isPasswordCorrect) {
        throw new AppError("invalid credential", 401);
    }
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    const refreshTokenExpiry = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000);
    const token = await authDAO.findRefreshToken(user.user_id); // if not, then null string 
    if (token) {
        await authDAO.updateRefreshToken(user.user_id, refreshToken, refreshTokenExpiry);
    }
    else {
        await authDAO.insertRefreshToken(user.user_id, refreshToken, refreshTokenExpiry);
    }
    return new AuthDTO(user, accessToken, refreshToken);
};
export const signout = async (req, res) => {
    const user = await userDAO.getUserByUsername(req.username);
    await authDAO.deleteRefreshToken(user.user_id);
    res.clearCookie('refreshToken');
    res.status(200).json({ message: "signed out successfully" });
};
export const refreshAccessToken = async (refreshToken) => {
    const decoded = verifyRefreshToken(refreshToken);
    const user = await authDAO.findUserByEmail(decoded.email);
    if (!user) {
        throw new AppError("Invalid refresh token", 401);
    }
    const token = await authDAO.findRefreshToken(user.user_id);
    if (!token) {
        throw new AppError("Invalid refresh token", 401);
    }
    const newAccessToken = generateAccessToken(user);
    return newAccessToken;
};
