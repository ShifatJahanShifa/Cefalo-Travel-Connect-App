var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { dbClient } from "../../db/db.js";
const db = dbClient.getConnection();
class AuthDAO {
    insertUser(username, email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const [createdUser] = yield db('users')
                .insert({
                username: username,
                email: email,
                hashed_password: password
            })
                .returning('*');
            return createdUser;
        });
    }
    findUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield db('users')
                .select('*')
                .where({ email: email })
                .first();
            return user;
        });
    }
    findUserByUsername(username) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield db('users')
                .select('*')
                .where({ username: username })
                .first();
            return user;
        });
    }
}
const authDAO = new AuthDAO();
export default authDAO;
