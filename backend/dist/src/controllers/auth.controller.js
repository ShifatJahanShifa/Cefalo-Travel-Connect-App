import * as authService from "../services/auth.service.js";
export const signup = async (req, res, next) => {
    try {
        const result = await authService.signup(req.body);
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
};
export const signin = async (req, res, next) => {
    try {
        const result = await authService.signin(req.body);
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
};
export const signout = async (req, res, next) => {
    try {
        await authService.signout(req, res);
    }
    catch (error) {
        next(error);
    }
};
export const refreshAccessToken = async (req, res, next) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
        res.status(401).json({ message: 'Missing refresh token' });
        return;
    }
    try {
        const newAccessToken = await authService.refreshAccessToken(refreshToken);
        res.header('Authorization', `Bearer ${newAccessToken}`)
            .status(200)
            .json({ accessToken: newAccessToken });
    }
    catch (error) {
        next(error);
    }
};
