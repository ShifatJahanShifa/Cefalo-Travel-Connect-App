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
import { Role } from "../../enums/role.js";
const db = dbClient.getConnection();
class UserDAO {
    getAllUsers(page, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            const offset = (page - 1) * limit;
            const result = yield db('users')
                .select('*')
                .orderBy('username', 'asc')
                .limit(limit)
                .offset(offset);
            console.log(result);
            return result;
        });
    }
    getUserByUsername(username) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db('users')
                .where({ username: username })
                .first();
            return result;
        });
    }
    updateUser(username, updateUser) {
        return __awaiter(this, void 0, void 0, function* () {
            const [result] = yield db('users')
                .where({ username: username })
                .update(Object.assign(Object.assign({}, updateUser), { updated_at: db.fn.now() }))
                .returning('*');
            return result;
        });
    }
    deleteUser(username) {
        return __awaiter(this, void 0, void 0, function* () {
            const [result] = yield db('users')
                .where({ username: username })
                .del()
                .returning('*');
            console.log('hh', result);
            return result;
        });
    }
    getAllAdmins() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db('users')
                .select('*')
                .where({
                role: Role.ADMIN
            })
                .orderBy('username', 'asc');
            return result;
        });
    }
}
const userDAO = new UserDAO();
export default userDAO;
