import { compare, hash } from 'bcrypt'
import { generateAccessToken, generateRefreshToken, verifyAccessToken, verifyRefreshToken, DecodedUser } from '../utils/jwt.ts'
import { createdUser, signupUser, signinUser } from '../types/auth.type.ts'
// import AuthDAO from '../repositories/dao/auth.dao.ts' 
import authDAO from '../repositories/dao/auth.repository.ts'
import { Request, Response } from 'express'
import { ExpressRequest } from '../middlewares/auth.middleware.ts'
import { AuthDTO } from '../DTOs/auth.dto.ts'
import { Role } from '../enums/role.ts'
import { AppError } from '../utils/appError.ts'
import userDAO from '../repositories/dao/user.respository.ts';
import dotenv from 'dotenv'
import { UserDTO } from '../DTOs/user.dto.ts'
dotenv.config()

export const signup = async (userData: signupUser): Promise<AuthDTO> => {
    const { username, email, password } = userData

    const userFoundByEmail: createdUser = await authDAO.findUserByEmail(email)

    if(userFoundByEmail) 
    {
      throw new AppError("email is already taken",400)
    }

    const userFoundByUsername: createdUser = await authDAO.findUserByUsername(username)

    if(userFoundByUsername) 
    {
      throw new AppError("username is already taken",400)
    }

    const hashedPassword = await hash(password, 10)

    const user: createdUser=await authDAO.insertUser(username,email,hashedPassword)
    
    const accessToken: string = generateAccessToken(user)
    const refreshToken: string = generateRefreshToken(user)

    const refreshTokenExpiry = new Date(Date.now() + 365* 24 * 60 * 60 * 1000)
    await authDAO.insertRefreshToken(user.user_id, refreshToken, refreshTokenExpiry)

    return new AuthDTO(user, accessToken, refreshToken)
}


export const signin = async (userData: signinUser): Promise<AuthDTO> => {
  const user: createdUser = await authDAO.findUserByEmail(userData.email)
  
  if (!user) 
  {
    throw new AppError("invalid credential",401)
  }
    
  const isPasswordCorrect = await compare(userData.password, user.hashed_password)

  if (!isPasswordCorrect) 
  {
    throw new AppError("invalid credential",401)
  }
  
  const accessToken: string = generateAccessToken(user)
  const refreshToken: string = generateRefreshToken(user)

  
  const refreshTokenExpiry = new Date(Date.now() + 365* 24 * 60 * 60 * 1000)
  const token: string = await authDAO.findRefreshToken(user.user_id) // if not, then null string 
  if(token) 
  {
    await authDAO.updateRefreshToken(user.user_id, refreshToken, refreshTokenExpiry)
  }
  else 
  {
    await authDAO.insertRefreshToken(user.user_id, refreshToken, refreshTokenExpiry)
  }
  return new AuthDTO(user, accessToken, refreshToken)
}

export const signout = async (req: ExpressRequest, res: Response): Promise<void> => {
    const user: UserDTO = await userDAO.getUserByUsername(req.username as string)
    await authDAO.deleteRefreshToken(user.user_id)
    res.clearCookie('refreshToken')
    res.status(200).json({message: "signed out successfully"})
}

export const refreshAccessToken = async (refreshToken: string): Promise<string> => {
  const decoded: DecodedUser = verifyRefreshToken(refreshToken)
  const user: createdUser = await authDAO.findUserByEmail(decoded.email)

  if (!user) 
  {
    throw new AppError("Invalid refresh token",401)
  }

  const token: string = await authDAO.findRefreshToken(user.user_id)
  if(!token) 
  {
    throw new AppError("Invalid refresh token",401)
  }

  const newAccessToken: string = generateAccessToken(user)
  return newAccessToken
}
