import { compare, hash } from 'bcrypt'
import { generateAccessToken, generateRefreshToken, verifyAccessToken, verifyRefreshToken, DecodedUser } from '../utils/jwt.ts'
import { createdUser, signupUser, signinUser } from '../types/auth.type.ts'
import authDAO from '../repositories/dao/auth.repository.ts'
import { Request, Response } from 'express'
import { ExpressRequest } from '../middlewares/auth.middleware.ts'
import { AuthDTO } from '../DTOs/auth.dto.ts'
import { Role } from '../enums/role.ts'
import { AppError } from '../utils/appError.ts'
import userDAO from '../repositories/dao/user.respository.ts'
import dotenv from 'dotenv'
import { UserDTO } from '../DTOs/user.dto.ts'
import { HTTP_STATUS } from '../constants/httpStatus.ts'
import { ONE_YEAR_IN_MS, ONE_DAY_IN_MS } from '../constants/time.ts'
dotenv.config()

export const signup = async (userData: signupUser): Promise<AuthDTO> => {
    const { username, email, password } = userData

    const userFoundByEmail: createdUser = await authDAO.findUserByEmail(email)

    if(userFoundByEmail) 
    {
      throw new AppError("email is already taken",HTTP_STATUS.BAD_REQUEST)
    }

    const userFoundByUsername: createdUser = await authDAO.findUserByUsername(username)

    if(userFoundByUsername) 
    {
      throw new AppError("username is already taken",HTTP_STATUS.BAD_REQUEST)
    }

    const hashedPassword = await hash(password, 10)

    const user: createdUser=await authDAO.insertUser(username,email,hashedPassword)
    
    const accessToken: string = generateAccessToken(user)
    const refreshToken: string = generateRefreshToken(user)

    const refreshTokenExpiry = new Date(Date.now() + ONE_YEAR_IN_MS)
    await authDAO.insertRefreshToken(user.user_id, refreshToken, refreshTokenExpiry)

    return new AuthDTO(user, accessToken, refreshToken)
}


export const signin = async (userData: signinUser): Promise<AuthDTO> => {
  const user: createdUser = await authDAO.findUserByEmail(userData.email)
  
  if (!user) 
  {
    throw new AppError("invalid credential", HTTP_STATUS.UNAUTHORIZED)
  }
    
  const isPasswordCorrect = await compare(userData.password, user.hashed_password)

  if (!isPasswordCorrect) 
  {
    throw new AppError("invalid credential", HTTP_STATUS.UNAUTHORIZED)
  }
  
  const accessToken: string = generateAccessToken(user)
  const refreshToken: string = generateRefreshToken(user)

  
  const refreshTokenExpiry = new Date(Date.now() + ONE_YEAR_IN_MS)
  const token: string = await authDAO.findRefreshToken(user.user_id) 
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
    res.status(HTTP_STATUS.OK).json({message: "signed out successfully"})
}

export const refreshAccessToken = async (refreshToken: string): Promise<string> => {
  const decoded: DecodedUser = verifyRefreshToken(refreshToken)
  const user: createdUser = await authDAO.findUserByEmail(decoded.email)

  if (!user) 
  {
    throw new AppError("Invalid refresh token", HTTP_STATUS.UNAUTHORIZED)
  }

  const token: string = await authDAO.findRefreshToken(user.user_id)
  if(!token) 
  {
    throw new AppError("Invalid refresh token", HTTP_STATUS.UNAUTHORIZED)
  }

  const newAccessToken: string = generateAccessToken(user)
  return newAccessToken
}
