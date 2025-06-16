import { v4 as uuidv4 } from 'uuid';
import { IAuth } from '../interfaces/auth.interface.ts';
import { KnexDatabaseClient } from '../../db/dbclients/knexorm.ts';
import { createdUser } from '../../types/auth.type.ts';
import { Knex } from 'knex';
import { dbClient } from '../../db/db.ts';
import { IUser } from '../interfaces/user.interface.ts';
import { updateUserInfo } from '../../types/user.tpye.ts';
import { Role } from '../../enums/role.ts';
const db: Knex = dbClient.getConnection();


class UserDAO implements IUser{

    async getAllUsers(page: number, limit: number): Promise<createdUser[]> {
        const offset=(page-1)*limit;

        const result: createdUser[] = await db('users')
            .select('*')
            .orderBy('username', 'asc')
            .limit(limit)
            .offset(offset);
        
        return result;
    }

    async getUserByUsername(username: string): Promise<createdUser> {
        const result: createdUser = await db('users')
            .where({ username: username })
            .first();

        return result;
    }

    async updateUser(username: string, updateUser: updateUserInfo): Promise<createdUser> {
        const [result] = await db('users')
            .where({ username: username })
            .update({
            ... updateUser,
            updated_at: db.fn.now()
            })
            .returning('*');

        return result;
    }

    async deleteUser (username: string): Promise<createdUser> {
        const [result] = await db('users')
            .where({ username: username })
            .del()
            .returning('*');

        return result;
    }
}

const userDAO = new UserDAO();
export default userDAO;

