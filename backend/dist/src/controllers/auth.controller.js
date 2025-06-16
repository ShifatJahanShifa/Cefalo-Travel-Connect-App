var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as authService from "../services/auth.service.js";
export const signup = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield authService.signup(req.body);
        res
            .cookie('refreshToken', result.refreshToken, {
            httpOnly: true,
            sameSite: 'none',
            maxAge: 365 * 24 * 60 * 60 * 1000
        })
            .header('Authorization', `Bearer ${result.accessToken}`)
            .status(201).json(result);
    }
    catch (error) {
        next(error);
    }
});
export const signin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield authService.signin(req.body);
        res
            .cookie('refreshToken', result.refreshToken, {
            httpOnly: true,
            sameSite: 'none',
            maxAge: 365 * 24 * 60 * 60 * 1000
        })
            .header('Authorization', `Bearer ${result.accessToken}`)
            .status(200).json(result);
    }
    catch (error) {
        next(error);
    }
});
export const signout = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield authService.signout(req, res);
    }
    catch (error) {
        next(error);
    }
});
export const refreshAccessToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
        res.status(401).json({ message: 'Missing refresh token' });
        return;
    }
    try {
        const newAccessToken = yield authService.refreshAccessToken(refreshToken);
        res.header('Authorization', `Bearer ${newAccessToken}`)
            .status(200)
            .json({ accessToken: newAccessToken });
    }
    catch (error) {
        next(error);
    }
});
