import {
  getAllUsers,
  getUserByUsername,
  updateUserByUsername,
  deleteUserByUsername,
  getUserByUserId,
  getMe
} from '../../../src/controllers/user.controller.ts';

import * as userService from '../../../src/services/user.service.ts';
import { UserDTO } from '../../../src/DTOs/user.dto.ts';
import { updateUserInfo } from '../../../src/types/user.tpye.ts';
import { Request, Response, NextFunction } from 'express';
import { mockUserDTO } from '../../__mocks__/user.dto.mock.ts'
import { ExpressRequest } from '../../../src/middlewares/auth.middleware.ts';

jest.mock('../../../src/services/user.service.ts');


describe('User Controller', () => {
    let req: Partial<ExpressRequest>;
    let res: Partial<Response>;
    let next: NextFunction;

    beforeEach(() => {
        req = {};
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis(),
        };
        next = jest.fn();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('getAllUsers', () => {
        it('should return paginated list of users', async () => {
            req.query = { page: '1', limit: '10' };
            (userService.getAllUsers as jest.Mock).mockResolvedValue([mockUserDTO]);

            await getAllUsers(req as Request, res as Response, next);

            expect(userService.getAllUsers).toHaveBeenCalledWith(1, 10);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith([mockUserDTO]);
        });

        it('should call next on error', async () => {
            const error = new Error('DB error');
            (userService.getAllUsers as jest.Mock).mockRejectedValue(error);

            req.query = { page: '1', limit: '10' };
            await getAllUsers(req as Request, res as Response, next);

            expect(next).toHaveBeenCalledWith(error);
        });
    });

    describe('getUserByUsername', () => {
        it('should return user data', async () => {
            req.params = { username: 'mockuser' };
            (userService.getUserByUsername as jest.Mock).mockResolvedValue(mockUserDTO);

            await getUserByUsername(req as Request, res as Response, next);

            expect(userService.getUserByUsername).toHaveBeenCalledWith('mockuser');
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockUserDTO);
        });

        it('should call next on error', async () => {
            const error = new Error('User not found');
            req.params = { username: 'mockuser' };
            (userService.getUserByUsername as jest.Mock).mockRejectedValue(error);

            await getUserByUsername(req as Request, res as Response, next);

            expect(next).toHaveBeenCalledWith(error);
        });
    });

    describe('updateUserByUsername', () => {
        it('should update user and return updated user', async () => {
            const updatedUser = { ...mockUserDTO, email: 'updated@example.com' };
            req.params = { username: 'mockuser' };
            req.body = { email: 'updated@example.com' } as updateUserInfo;

            (userService.updateUser as jest.Mock).mockResolvedValue(updatedUser);

            await updateUserByUsername(req as Request, res as Response, next);

            expect(userService.updateUser).toHaveBeenCalledWith('mockuser', req.body);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(updatedUser);
        });

        it('should call next on error', async () => {
            const error = new Error('Update failed');
            req.params = { username: 'mockuser' };
            req.body = { email: 'updated@example.com' } as updateUserInfo;

            (userService.updateUser as jest.Mock).mockRejectedValue(error);

            await updateUserByUsername(req as Request, res as Response, next);

            expect(next).toHaveBeenCalledWith(error);
        });
    });

    describe('deleteUserByUsername', () => {
        it('should delete user and return 204', async () => {
            req.params = { username: 'mockuser' };
            (userService.deleteUser as jest.Mock).mockResolvedValue(mockUserDTO);

            await deleteUserByUsername(req as Request, res as Response, next);

            expect(userService.deleteUser).toHaveBeenCalledWith('mockuser');
            expect(res.status).toHaveBeenCalledWith(204);
            expect(res.json).toHaveBeenCalledWith(mockUserDTO);
        });

        it('should call next on error', async () => {
            const error = new Error('Delete failed');
            req.params = { username: 'mockuser' };
            (userService.deleteUser as jest.Mock).mockRejectedValue(error);

            await deleteUserByUsername(req as Request, res as Response, next);
            expect(next).toHaveBeenCalledWith(error);
        });
    });

    describe('getUserByUserId', () => {
        it('should return user by user ID', async () => {
            req.params = { userId: '1' };
            (userService.getUserByUserID as jest.Mock).mockResolvedValue(mockUserDTO);

            await getUserByUserId(req as Request, res as Response, next);

            expect(userService.getUserByUserID).toHaveBeenCalledWith('1');
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockUserDTO);
        });

        it('should call next on error', async () => {
            const error = new Error('Not found');
            req.params = { userId: '1' };
            (userService.getUserByUserID as jest.Mock).mockRejectedValue(error);

            await getUserByUserId(req as Request, res as Response, next);
            expect(next).toHaveBeenCalledWith(error);
        });
    });

    describe('getMe', () => {
        it('should return logged-in user', async () => {
            req.username = 'mockuser';
            (userService.getUserByUsername as jest.Mock).mockResolvedValue(mockUserDTO);

            await getMe(req as any, res as Response, next);

            expect(userService.getUserByUsername).toHaveBeenCalledWith('mockuser');
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockUserDTO);
        });

        it('should call next on error', async () => {
            const error = new Error('Fail');
            req.username = 'mockuser';
            (userService.getUserByUsername as jest.Mock).mockRejectedValue(error);

            await getMe(req as any, res as Response, next);
            expect(next).toHaveBeenCalledWith(error);
        });
    });
});
