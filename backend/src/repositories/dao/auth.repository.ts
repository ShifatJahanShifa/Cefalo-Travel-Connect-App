import { v4 as uuidv4 } from 'uuid';
import { IAuth } from '../interfaces/auth.interface.ts';
import { KnexDatabaseClient } from '../../db/dbclients/knexorm.ts';
import { createdUser } from '../../types/auth.type.ts';
import { Role } from '../../enums/role.ts';
import { Knex } from 'knex';
import { dbClient } from '../../db/db.ts';
const db: Knex = dbClient.getConnection();


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

  async insertRefreshToken(user_id: string, token: string, expires_at: Date): Promise<void> {
    await db('refresh_tokens') 
      .insert({
        user_id: user_id,
        token: token,
        expires_at: expires_at
      });
  }


  async updateRefreshToken(user_id: string, token: string, expires_at: Date ): Promise<void> {
    await db('refresh_tokens') 
      .where({ user_id: user_id })
      .update({
        token: token,
        expires_at: expires_at,
        updated_at: db.fn.now()
      });
  }

  async deleteRefreshToken(user_id: string): Promise<void> {
    await db('refresh_tokens')
      .where({ user_id: user_id })
      .del();
  }

  async findRefreshToken(user_id: string): Promise<string> {
    const token: string = await db('refresh_tokens').select('token').where({ user_id: user_id}).first();

    return token;
  }
}

const authDAO: AuthDAO = new AuthDAO();
export default authDAO;