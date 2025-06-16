import { v4 as uuidv4 } from 'uuid';
import { IAuth } from '../interfaces/auth.interface.ts';
import { KnexDatabaseClient } from '../../db/dbclients/knexorm.ts';
import { createdUser } from '../../types/auth.type.ts';
import { Role } from '../../enums/role.ts';
import { Knex } from 'knex';
import { dbClient } from '../../db/db.ts';
const db: Knex = dbClient.getConnection()


class AuthDAO implements IAuth{

  async insertUser(username: string, email: string, password: string): Promise<createdUser> {
    const [createdUser] = await db('users')
      .insert({
        username: username,
        email: email,
        hashed_password: password
      })
      .returning('*');
    
    return createdUser;
  }

  async findUserByEmail(email: string): Promise<createdUser> {
    const user: createdUser = await db('users')
      .select('*')
      .where({ email: email})
      .first();

    return user;
  }

  async findUserByUsername(username: string): Promise<createdUser> {
    const user: createdUser = await db('users')
      .select('*')
      .where({ username: username})
      .first();

    return user;
  }
}

const authDAO = new AuthDAO()
export default authDAO