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
export const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('jsdj');
        const result = yield authService.signup(req.body);
        res.cookie('token', result.token);
        res.status(201).json(result);
        console.log('i got result', result);
    }
    catch (error) {
        res.status(400).json({ error: 'Email is not unique' });
    }
});
export const signin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield authService.signin(req.body);
        res.status(200).json(result);
    }
    catch (error) {
        res.status(401).json({ error: 'Email or password is wrong' });
    }
});
export const signout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield authService.signout(req, res);
    }
    catch (error) {
        res.status(404).json({ message: "user was not logged in" });
    }
});
export const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.email) {
            res.sendStatus(401);
            return;
        }
        const userData = yield authService.getUser(req, res);
        res.status(200).json(userData);
    }
    catch (error) {
        res.status(404).json({ error: 'User not found' });
    }
});
