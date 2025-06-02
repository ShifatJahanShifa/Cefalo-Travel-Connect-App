var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { v4 as uuidv4 } from 'uuid';
import { db } from "../../db/dbclients/knexorm.js";
class UsersDAO {
    insertPerson(username, email, password, role) {
        return __awaiter(this, void 0, void 0, function* () {
            const [createdUser] = yield db('users')
                .insert({
                id: uuidv4(),
                username: username,
                email: email,
                password: password,
                role: role
            })
                .returning(['id', 'username', 'email', 'role']);
            return createdUser;
        });
    }
    findUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield db('users')
                .select('username', 'email', 'password', 'role')
                .where({ email: email })
                .first();
            if (!user) {
                throw new Error('Email is not correct');
            }
            return user;
        });
    }
}
const userDAO = new UsersDAO();
export default userDAO;
// table.uuid('id').primary()
//     table.string('username').unique()
//     table.string('email').unique()
//     table.string('password')
//     table.string('role')
//     table.timestamps(true, true)
