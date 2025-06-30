import { dbClient } from "../../db/db.js";
const db = dbClient.getConnection();
class AuthDAO {
    async insertUser(username, email, password) {
        const [createdUser] = await db('users')
            .insert({
            username: username,
            email: email,
            hashed_password: password
        })
            .returning('*');
        return createdUser;
    }
    async findUserByEmail(email) {
        const user = await db('users')
            .select('*')
            .where({ email: email })
            .first();
        return user;
    }
    async findUserByUsername(username) {
        const user = await db('users')
            .select('*')
            .where({ username: username })
            .first();
        return user;
    }
    async insertRefreshToken(user_id, token, expires_at) {
        await db('refresh_tokens')
            .insert({
            user_id: user_id,
            token: token,
            expires_at: expires_at
        });
    }
    async updateRefreshToken(user_id, token, expires_at) {
        await db('refresh_tokens')
            .where({ user_id: user_id })
            .update({
            token: token,
            expires_at: expires_at,
            updated_at: db.fn.now()
        });
    }
    async deleteRefreshToken(user_id) {
        await db('refresh_tokens')
            .where({ user_id: user_id })
            .del();
    }
    async findRefreshToken(user_id) {
        const token = await db('refresh_tokens')
            .select('token')
            .where({ user_id: user_id })
            .first();
        return token;
    }
}
const authDAO = new AuthDAO();
export default authDAO;
