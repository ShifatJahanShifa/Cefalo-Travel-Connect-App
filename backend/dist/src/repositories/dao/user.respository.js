import { dbClient } from "../../db/db.js";
const db = dbClient.getConnection();
class UserDAO {
    async getAllUsers(page, limit) {
        const offset = (page - 1) * limit;
        const result = await db('users')
            .select('*')
            .orderBy('username', 'asc')
            .limit(limit)
            .offset(offset);
        return result;
    }
    async getUserByUsername(username) {
        const result = await db('users')
            .where({ username: username })
            .first();
        return result;
    }
    async updateUser(username, updateUser) {
        const [result] = await db('users')
            .where({ username: username })
            .update({
            ...updateUser,
            updated_at: db.fn.now()
        })
            .returning('*');
        return result;
    }
    async deleteUser(username) {
        const [result] = await db('users')
            .where({ username: username })
            .del()
            .returning('*');
        return result;
    }
    async getUserByID(user_id) {
        const result = await db('users')
            .where({ user_id: user_id })
            .first();
        return result;
    }
}
const userDAO = new UserDAO();
export default userDAO;
