import { v4 as uuidv4 } from 'uuid';
import { IAuth } from '../interfaces/auth.interface.ts';
import { db } from '../../db/dbclients/knexorm.ts';
import { createdUser, foundUser } from '../../DTOs/auth.dto.ts';

class UsersDAO implements IAuth{

  async insertPerson(username: string, email: string, password: string, role: string): Promise<createdUser> {
    const [createdUser] = await db('users')
      .insert({
        id: uuidv4(),
        username: username,
        email: email,
        password: password,
        role: role
      })
      .returning(['id','username','email','role']);
    
    return createdUser;
  }

  async findUserByEmail(email: string): Promise<foundUser> {
    const user: foundUser = await db('users')
      .select('username', 'email', 'password', 'role')
      .where({ email: email})
      .first();

    if (!user) {
      throw new Error('Email is not correct');
    }

    return user;
  }

}

const userDAO = new UsersDAO()
export default userDAO

// table.uuid('id').primary()
//     table.string('username').unique()
//     table.string('email').unique()
//     table.string('password')
//     table.string('role')
//     table.timestamps(true, true)