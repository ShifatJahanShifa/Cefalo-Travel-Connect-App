import { compare, hash } from 'bcrypt';
import { generateJWT } from '../utils/jwt.ts';
import { User, createdUser, foundUser } from '../DTOs/auth.dto.ts';
import userDAO from '../repository/dao/auth.dao.ts';
import { Request, Response } from 'express';
import { ExpressRequest } from '../middlewares/auth.middleware.ts';

 

export const signup = async (userData: User) => {
    const { username, email, password } = userData
    const hashedPassword = await hash(password, 10)
    console.log('s-jsdj')

    const user=await userDAO.insertPerson(username,email,hashedPassword,'explorer')
    console.log('created user ', user)

    const token = generateJWT(user)
    console.log(token)

    return { ...user, token };
};

export const signin = async (userData: User) => {
  const user: foundUser = await userDAO.findUserByEmail(userData.email)

  const isPasswordCorrect = await compare(userData.password, user.password)

  if (!isPasswordCorrect) {
    throw new Error('Incorrect password');
  }

  const { password: _, ...userWithoutPassword } = user;
  const token = generateJWT(user);
  
  return { ...userWithoutPassword, token };
};

export const signout = async (req: Request, res: Response) => {
    console.log(req.cookies);

    res.clearCookie('token')
    res.status(200).json({message: "signed out successfully"})
}

export const getUser = async (req: ExpressRequest, res: Response) => {
    const user: User = await userDAO.findUserByEmail(req.email!)
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword
}