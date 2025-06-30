"use strict";
// import * as authService from '../../../src/services/auth.service';
// import authDAO from '../../../src/repositories/dao/auth.repository';
// import userDAO from '../../../src/repositories/dao/user.respository';
// import * as jwtUtils from '../../../src/utils/jwt';
// import { signupUser, signinUser, createdUser } from '../../../src/types/auth.type';
// import { Role } from '../../../src/enums/role';
// import { AuthDTO } from '../../../src/DTOs/auth.dto';
// import { AppError } from '../../../src/utils/appError';
// jest.mock('../../../src/repositories/dao/auth.repository');
// jest.mock('../../../src/repositories/dao/user.respository');
// jest.mock('../../../src/utils/jwt');
// const mockUser: createdUser = {
//     user_id: 'user123',
//     username: 'testuser',
//     email: 'test@example.com',
//     hashed_password: 'hashedpass',
//     role: Role.TRAVELLER,
//     profile_picture_url: null,
//     bio: null,
//     created_at: new Date(),
//     updated_at: new Date()
// };
// describe('Auth Service', () => {
//     afterEach(() => {
//         jest.clearAllMocks();
//     });
//     describe('signup', () => {
//         it('should create a new user and return AuthDTO', async () => {
//         (authDAO.findUserByEmail as jest.Mock).mockResolvedValue(null);
//         (authDAO.findUserByUsername as jest.Mock).mockResolvedValue(null);
//         (authDAO.insertUser as jest.Mock).mockResolvedValue(mockUser);
//         (authDAO.insertRefreshToken as jest.Mock).mockResolvedValue(undefined);
//         (jwtUtils.generateAccessToken as jest.Mock).mockReturnValue('access.token');
//         (jwtUtils.generateRefreshToken as jest.Mock).mockReturnValue('refresh.token');
//         const result = await authService.signup({
//             username: mockUser.username,
//             email: mockUser.email,
//             password: 'plaintext'
//         });
//         expect(result).toBeInstanceOf(AuthDTO);
//         expect(result.accessToken).toBe('access.token');
//         expect(result.refreshToken).toBe('refresh.token');
//         });
//         it('should throw error if email exists', async () => {
//         (authDAO.findUserByEmail as jest.Mock).mockResolvedValue(mockUser);
//         await expect(authService.signup({
//             username: 'newuser',
//             email: mockUser.email,
//             password: '123'
//         })).rejects.toThrow('email is already taken');
//         });
//     });
//     describe('signin', () => {
//         it('should return AuthDTO for valid credentials', async () => {
//         (authDAO.findUserByEmail as jest.Mock).mockResolvedValue(mockUser);
//         jest.spyOn(require('bcrypt'), 'compare').mockResolvedValue(true);
//         (jwtUtils.generateAccessToken as jest.Mock).mockReturnValue('access.token');
//         (jwtUtils.generateRefreshToken as jest.Mock).mockReturnValue('refresh.token');
//         (authDAO.findRefreshToken as jest.Mock).mockResolvedValue(null);
//         (authDAO.insertRefreshToken as jest.Mock).mockResolvedValue(undefined);
//         const result = await authService.signin({
//             email: mockUser.email,
//             password: 'plaintext'
//         });
//         expect(result).toBeInstanceOf(AuthDTO);
//         });
//         it('should throw error for invalid password', async () => {
//         (authDAO.findUserByEmail as jest.Mock).mockResolvedValue(mockUser);
//         jest.spyOn(require('bcrypt'), 'compare').mockResolvedValue(false);
//         await expect(authService.signin({
//             email: mockUser.email,
//             password: 'wrong'
//         })).rejects.toThrow('invalid credential');
//         });
//     });
//     describe('signout', () => {
//         it('should clear refresh token and respond', async () => {
//         const mockReq = { username: mockUser.username } as any;
//         const mockRes = {
//             clearCookie: jest.fn(),
//             status: jest.fn().mockReturnThis(),
//             json: jest.fn()
//         };
//         (userDAO.getUserByUsername as jest.Mock).mockResolvedValue(mockUser);
//         (authDAO.deleteRefreshToken as jest.Mock).mockResolvedValue(undefined);
//         await authService.signout(mockReq, mockRes);
//         expect(mockRes.clearCookie).toHaveBeenCalledWith('refreshToken');
//         expect(mockRes.status).toHaveBeenCalledWith(200);
//         expect(mockRes.json).toHaveBeenCalledWith({ message: 'signed out successfully' });
//         });
//     });
//     describe('refreshAccessToken', () => {
//         it('should return new access token if refresh token valid', async () => {
//         (jwtUtils.verifyRefreshToken as jest.Mock).mockReturnValue({ email: mockUser.email });
//         (authDAO.findUserByEmail as jest.Mock).mockResolvedValue(mockUser);
//         (authDAO.findRefreshToken as jest.Mock).mockResolvedValue('refresh.token');
//         (jwtUtils.generateAccessToken as jest.Mock).mockReturnValue('new.access.token');
//         const token = await authService.refreshAccessToken('refresh.token');
//         expect(token).toBe('new.access.token');
//         });
//         it('should throw error if token not found', async () => {
//         (jwtUtils.verifyRefreshToken as jest.Mock).mockReturnValue({ email: mockUser.email });
//         (authDAO.findUserByEmail as jest.Mock).mockResolvedValue(mockUser);
//         (authDAO.findRefreshToken as jest.Mock).mockResolvedValue(null);
//         await expect(authService.refreshAccessToken('token')).rejects.toThrow('Invalid refresh token');
//         });
//     });
// });
