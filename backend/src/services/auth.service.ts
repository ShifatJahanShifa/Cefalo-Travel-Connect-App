import { compare, hash } from 'bcrypt'
import { generateAccessToken, generateRefreshToken, verifyAccessToken, verifyRefreshToken, DecodedUser } from '../utils/jwt.ts'
import { createdUser, signupUser, signinUser } from '../types/auth.type.ts'
// import AuthDAO from '../repositories/dao/auth.dao.ts' 
import authDAO from '../repositories/dao/auth.dao.ts'
import { Request, Response } from 'express'
import { ExpressRequest } from '../middlewares/auth.middleware.ts'
import { AuthDTO } from '../DTOs/auth.dto.ts'
import { Role } from '../enums/role.ts'
import { AppError } from '../utils/appError.ts'


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
  
  return new AuthDTO(user, accessToken, refreshToken)
}

export const signout = async (req: Request, res: Response): Promise<void> => {
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
  
  const newAccessToken: string = generateAccessToken(user)
  return newAccessToken
}
