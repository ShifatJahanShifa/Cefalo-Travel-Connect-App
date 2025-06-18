var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import jwt from 'jsonwebtoken';
import { Role } from "../enums/role.js";
import { verifyAccessToken } from "../utils/jwt.js";
import dotenv from "dotenv";
dotenv.config();
const { sign, verify } = jwt;
// define the return type
// the goal of this function is to call the next function when everything is ok. so the return type will be void
export const authenticate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authHeader = req.headers.authorization;
        const accessToken = authHeader && authHeader.split(' ')[1];
        if (!accessToken) {
            res.status(401).send("Cannot access this route");
            return;
        }
        const decode = verifyAccessToken(accessToken);
        req.username = decode.username;
        req.email = decode.email;
        req.role = decode.role;
        console.log(req.body, 'hsf');
        next();
    }
    catch (error) {
        res.status(401).send("Unauthorized User");
    }
});
export const authorize = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const loggedInUsername = req.username;
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
        console.log(req.body, 'hsf');
        next();
    }
    catch (err) {
        res.status(403).json({ message: "access forbidden" });
    }
});
export const authorizeAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.role !== Role.ADMIN) {
            res.status(403).json({ message: "Unauthorized to perform the action" });
            return;
        }
        next();
    }
    catch (err) {
        res.status(403).json({ message: "access forbidden" });
    }
});
