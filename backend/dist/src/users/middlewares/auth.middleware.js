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
import dotenv from "dotenv";
dotenv.config();
const { sign, verify } = jwt;
// define the return type
// the goal of this function is to call the next function when everything is ok. so the return type will be void
export const authenticate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let accessToken = req.cookies.token;
        if (!accessToken) {
            res.status(403).send("Cannot access this route");
            return;
        }
        const decode = verify(accessToken, process.env.SECRET_KEY);
        req.email = decode.email;
        next();
    }
    catch (error) {
        res.status(401).send("Unauthorized User");
    }
});
