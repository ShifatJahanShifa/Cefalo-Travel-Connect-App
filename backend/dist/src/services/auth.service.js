var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { compare, hash } from 'bcrypt';
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from "../utils/jwt.js";
// import AuthDAO from '../repositories/dao/auth.dao.ts' 
import authDAO from "../repositories/dao/auth.dao.js";
import { AuthDTO } from "../DTOs/auth.dto.js";
import { AppError } from "../utils/appError.js";
import userDAO from "../repositories/dao/user.dao.js";
import dotenv from 'dotenv';
dotenv.config();
export const signup = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = userData;
    const userFoundByEmail = yield authDAO.findUserByEmail(email);
    if (userFoundByEmail) {
        throw new AppError("email is already taken", 400);
    }
    const userFoundByUsername = yield authDAO.findUserByUsername(username);
    if (userFoundByUsername) {
        throw new AppError("username is already taken", 400);
    }
    const hashedPassword = yield hash(password, 10);
    const user = yield authDAO.insertUser(username, email, hashedPassword);
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    const refreshTokenExpiry = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000);
    yield authDAO.insertRefreshToken(user.user_id, refreshToken, refreshTokenExpiry);
    return new AuthDTO(user, accessToken, refreshToken);
});
export const signin = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield authDAO.findUserByEmail(userData.email);
    if (!user) {
        throw new AppError("invalid credential", 401);
    }
    const isPasswordCorrect = yield compare(userData.password, user.hashed_password);
    if (!isPasswordCorrect) {
        throw new AppError("invalid credential", 401);
    }
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    const refreshTokenExpiry = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000);
    const token = yield authDAO.findRefreshToken(user.user_id); // if not, then null string 
    if (token) {
        yield authDAO.updateRefreshToken(user.user_id, refreshToken, refreshTokenExpiry);
    }
    else {
        yield authDAO.insertRefreshToken(user.user_id, refreshToken, refreshTokenExpiry);
    }
    return new AuthDTO(user, accessToken, refreshToken);
});
export const signout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userDAO.getUserByUsername(req.username);
    yield authDAO.deleteRefreshToken(user.user_id);
    res.clearCookie('refreshToken');
    res.status(200).json({ message: "signed out successfully" });
});
export const refreshAccessToken = (refreshToken) => __awaiter(void 0, void 0, void 0, function* () {
    const decoded = verifyRefreshToken(refreshToken);
    const user = yield authDAO.findUserByEmail(decoded.email);
    if (!user) {
        throw new AppError("Invalid refresh token", 401);
    }
    const token = yield authDAO.findRefreshToken(user.user_id);
    if (!token) {
        throw new AppError("Invalid refresh token", 401);
    }
    const newAccessToken = generateAccessToken(user);
    return newAccessToken;
});
