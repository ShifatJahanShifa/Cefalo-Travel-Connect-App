import {
  createNotification,
  getNotificationByUserId,
  getNotificationByNotificationId,
  markAsRead,
  deleteNotiffication
} from '../../../src/controllers/notification.controller.ts';

import * as NotificationService from '../../../src/services/notification.service.ts';
import * as UserService from '../../../src/services/user.service.ts';
import { Request, Response, NextFunction } from 'express';
import { notificationDTO } from '../../../src/DTOs/notification.dto.ts';
import { UserDTO } from '../../../src/DTOs/user.dto.ts';
import { notification } from '../../../src/types/notifcation.type.ts';
import { mockNotificationDTO } from '../../__mocks__/notification.dto.mock.ts'
import { ExpressRequest } from '../../../src/middlewares/auth.middleware.ts';

jest.mock('../../../src/services/notification.service.ts');
jest.mock('../../../src/services/user.service.ts');


const mockUser: UserDTO = {
  user_id: 'u001',
  username: 'john_doe',
  email: 'john@example.com',
  role: 'user',
  profile_picture_url: null, 
  bio: null
};


describe('Notification Controller', () => {
    let req: Partial<ExpressRequest>;
    let res: Partial<Response>;
    let next: NextFunction;

    beforeEach(() => {
        req = {};
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        };
        next = jest.fn();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('createNotification', () => {
        it('should create and return a notification', async () => {
            req.body = {
                user_id: 'user1',
                type: 'travel_plan_invite',
                reference_id: 'travel-123'
            } as notification;

            (NotificationService.createNotification as jest.Mock).mockResolvedValue(mockNotificationDTO);

            await createNotification(req as Request, res as Response, next);

            expect(NotificationService.createNotification).toHaveBeenCalledWith(req.body);
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(mockNotificationDTO);
        });

        it('should call next on error', async () => {
            const error = new Error('Failed');
            (NotificationService.createNotification as jest.Mock).mockRejectedValue(error);

            await createNotification(req as Request, res as Response, next);
            expect(next).toHaveBeenCalledWith(error);
        });
    });

    describe('getNotificationByUserId', () => {
        it('should return notifications by username', async () => {
            req.params = { username: 'john_doe' };

            (UserService.getUserByUsername as jest.Mock).mockResolvedValue(mockUser);
            (NotificationService.getNotificationByUserId as jest.Mock).mockResolvedValue([mockNotificationDTO]);

            await getNotificationByUserId(req as Request, res as Response, next);

            expect(UserService.getUserByUsername).toHaveBeenCalledWith('john_doe');
            expect(NotificationService.getNotificationByUserId).toHaveBeenCalledWith('u001');
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith([mockNotificationDTO]);
        });

        it('should call next on error', async () => {
            req.params = { username: 'john_doe' };
            const error = new Error('User error');
            (NotificationService.getNotificationByUserId as jest.Mock).mockRejectedValue(error);

            await getNotificationByUserId(req as ExpressRequest, res as Response, next);
            expect(next).toHaveBeenCalledWith(error);
        });
    });

    describe('getNotificationByNotificationId', () => {
        it('should return a notification by ID', async () => {
            req.params = { notification_id: 'n001' };

            (NotificationService.getNotificationByNotificationId as jest.Mock).mockResolvedValue(mockNotificationDTO);

            await getNotificationByNotificationId(req as Request, res as Response, next);

            expect(NotificationService.getNotificationByNotificationId).toHaveBeenCalledWith('n001');
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockNotificationDTO);
        });

        it('should call next on error', async () => {
            req.params = { notification_id: 'n001' };
            const error = new Error('Notification error');
            (NotificationService.getNotificationByNotificationId as jest.Mock).mockRejectedValue(error);

            await getNotificationByNotificationId(req as Request, res as Response, next);
            expect(next).toHaveBeenCalledWith(error);
        });
    });

    describe('markAsRead', () => {
        it('should mark notification as read', async () => {
            req.params = { notification_id: 'n001' };

            const updatedNotification = { ...mockNotificationDTO, read: true };

            (NotificationService.markAsRead as jest.Mock).mockResolvedValue(updatedNotification);

            await markAsRead(req as Request, res as Response, next);

            expect(NotificationService.markAsRead).toHaveBeenCalledWith('n001');
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(updatedNotification);
        });

        it('should call next on error', async () => {
            req.params = { notification_id: 'n001' };
            const error = new Error('Mark error');

            (NotificationService.markAsRead as jest.Mock).mockRejectedValue(error);

            await markAsRead(req as Request, res as Response, next);
            expect(next).toHaveBeenCalledWith(error);
        });
    });

    describe('deleteNotification', () => {
        it('should delete a notification and return true', async () => {
            req.params = { notification_id: 'n001' };
            (NotificationService.deleteNotiffication as jest.Mock).mockResolvedValue(true);

            await deleteNotiffication(req as Request, res as Response, next);

            expect(NotificationService.deleteNotiffication).toHaveBeenCalledWith('n001');
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(true);
        });

        it('should call next on error', async () => {
            req.params = { notification_id: 'n001' };
            const error = new Error('Delete error');

            (NotificationService.deleteNotiffication as jest.Mock).mockRejectedValue(error);

            await deleteNotiffication(req as Request, res as Response, next);
            expect(next).toHaveBeenCalledWith(error);
        });
    });
});
