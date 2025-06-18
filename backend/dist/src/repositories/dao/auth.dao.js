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
    insertRefreshToken(user_id, token, expires_at) {
        return __awaiter(this, void 0, void 0, function* () {
            yield db('refresh_tokens')
                .insert({
                user_id: user_id,
                token: token,
                expires_at: expires_at
            });
        });
    }
    updateRefreshToken(user_id, token, expires_at) {
        return __awaiter(this, void 0, void 0, function* () {
            yield db('refresh_tokens')
                .where({ user_id: user_id })
                .update({
                token: token,
                expires_at: expires_at,
                updated_at: db.fn.now()
            });
        });
    }
    deleteRefreshToken(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield db('refresh_tokens')
                .where({ user_id: user_id })
                .del();
        });
    }
    findRefreshToken(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = yield db('refresh_tokens')
                .select('token')
                .where({ user_id: user_id })
                .first();
            return token;
        });
    }
}
const authDAO = new AuthDAO();
export default authDAO;
