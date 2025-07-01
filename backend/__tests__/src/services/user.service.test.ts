import * as userService from '../../../src/services/user.service.ts';
import userDAO from '../../../src/repositories/dao/user.respository.ts';
import { createdUser } from '../../../src/types/auth.type.ts';
import { UserDTO } from '../../../src/DTOs/user.dto.ts';
import { AppError } from '../../../src/utils/appError.ts';
import { hash } from 'bcrypt';
import { mockCreatedUser } from '../../__mocks__/user.mock.ts';

jest.mock('../../../src/repositories/dao/user.respository');
jest.mock('bcrypt');


describe('User Service', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('getAllUsers', () => {
        it('should return list of users wrapped in UserDTOs', async () => {
            (userDAO.getAllUsers as jest.Mock).mockResolvedValue([mockCreatedUser]);

            const result = await userService.getAllUsers(1, 10);

            expect(result).toHaveLength(1);
            expect(result[0]).toBeInstanceOf(UserDTO);
        });
    });

    describe('getUserByUsername', () => {
        it('should return user as UserDTO', async () => {
            (userDAO.getUserByUsername as jest.Mock).mockResolvedValue(mockCreatedUser);

            const result = await userService.getUserByUsername('john');

            expect(result).toBeInstanceOf(UserDTO);
            expect(result.username).toBe('testuser');
        });
    });

    describe('updateUser', () => {
        it('should hash password if provided and update user', async () => {

            (userDAO.getUserByUsername as jest.Mock).mockResolvedValue(mockCreatedUser);
            (hash as jest.Mock).mockResolvedValue('newHashed');
            (userDAO.updateUser as jest.Mock).mockResolvedValue({ ...mockCreatedUser, bio: 'updated bio' });

            const result = await userService.updateUser('testuser', {
                hashed_password: 'plain',
                bio: 'updated bio'
            });

            expect(hash).toHaveBeenCalledWith('plain', 10);
            expect(result).toBeInstanceOf(UserDTO);
            expect(result.bio).toBe('updated bio');
        });

        it('should throw if user not found', async () => {
            (userDAO.getUserByUsername as jest.Mock).mockResolvedValue(null);

            await expect(userService.updateUser('john', {})).rejects.toThrow('user not found');
        });


        it('should update user without password hashing if no password provided', async () => {
            (userDAO.getUserByUsername as jest.Mock).mockResolvedValue(mockCreatedUser);
            (userDAO.updateUser as jest.Mock).mockResolvedValue({ ...mockCreatedUser, bio: 'bio change' });

            const result = await userService.updateUser('testuser', {
                bio: 'bio change'
            });

            expect(hash).not.toHaveBeenCalled();
            expect(result.bio).toBe('bio change');
        });

    });

    describe('deleteUser', () => {
        it('should delete user and return UserDTO', async () => {
            (userDAO.getUserByUsername as jest.Mock).mockResolvedValue(mockCreatedUser);
            (userDAO.deleteUser as jest.Mock).mockResolvedValue(mockCreatedUser);

            const result = await userService.deleteUser('testuser');

            expect(result).toBeInstanceOf(UserDTO);
        });

        it('should throw if user not found before delete', async () => {
            (userDAO.getUserByUsername as jest.Mock).mockResolvedValue(null);

            await expect(userService.deleteUser('john')).rejects.toThrow('user not found');
        });

        it('should throw if deleteUser returns null', async () => {
            (userDAO.getUserByUsername as jest.Mock).mockResolvedValue(mockCreatedUser);
            (userDAO.deleteUser as jest.Mock).mockResolvedValue(null);

            await expect(userService.deleteUser('john')).rejects.toThrow('Internal server error');
        });
    });

    describe('getUserByUserID', () => {
        it('should return user by user_id', async () => {
        (userDAO.getUserByID as jest.Mock).mockResolvedValue(mockCreatedUser);

        const result = await userService.getUserByUserID('test-id-123');

        expect(result).toBeInstanceOf(UserDTO);
        expect(result.username).toBe('testuser');
        });
    });
});
