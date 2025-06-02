var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { compare, hash } from 'bcrypt';
import { generateJWT } from "../utils/jwt.js";
import userDAO from "../../repository/dao/auth.dao.js";
export const signup = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = userData;
    const hashedPassword = yield hash(password, 10);
    console.log('s-jsdj');
    const user = yield userDAO.insertPerson(username, email, hashedPassword, 'explorer');
    console.log('created user ', user);
    const token = generateJWT(user);
    console.log(token);
    return Object.assign(Object.assign({}, user), { token });
});
export const signin = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userDAO.findUserByEmail(userData.email);
    const isPasswordCorrect = yield compare(userData.password, user.password);
    if (!isPasswordCorrect) {
        throw new Error('Incorrect password');
    }
    const { password: _ } = user, userWithoutPassword = __rest(user, ["password"]);
    const token = generateJWT(user);
    return Object.assign(Object.assign({}, userWithoutPassword), { token });
});
export const signout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.cookies);
    res.clearCookie('token');
    res.status(200).json({ message: "signed out successfully" });
});
export const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userDAO.findUserByEmail(req.email);
    const { password: _ } = user, userWithoutPassword = __rest(user, ["password"]);
    return userWithoutPassword;
});
