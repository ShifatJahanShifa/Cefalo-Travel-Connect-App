import * as notificationService from '../../../src/services/notification.service.ts';
import notifcationRepository from '../../../src/repositories/dao/notification.repository.ts';
import { notificationDTO } from '../../../src/DTOs/notification.dto.ts';
import { notification } from '../../../src/types/notifcation.type.ts';
import { mockNotification, mockUpdatedNotification } from '../../__mocks__/notification.mock.ts';


jest.mock('../../../src/repositories/dao/notification.repository.ts');


describe('Notification Service', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('createNotification', () => {
        it('should create a notification and return DTO', async () => {
        (notifcationRepository.createNotification as jest.Mock).mockResolvedValue(mockNotification);

        const result = await notificationService.createNotification(mockNotification);

        expect(result).toBeInstanceOf(notificationDTO);
        expect(result.notification_id).toBe('notif-123');
        });
    });

    describe('getNotificationByUserId', () => {
        it('should return list of notificationDTOs', async () => {
            (notifcationRepository.getNotificationByUserId as jest.Mock).mockResolvedValue([mockNotification]);

            const result = await notificationService.getNotificationByUserId('user1');

            expect(result).toHaveLength(1);
            expect(result[0]).toBeInstanceOf(notificationDTO);
        });

        it('should return empty array if no notifications found', async () => {
            (notifcationRepository.getNotificationByUserId as jest.Mock).mockResolvedValue([]);

            const result = await notificationService.getNotificationByUserId('user1');

            expect(result).toEqual([]);
        });
    });

    describe('getNotificationByNotificationId', () => {
        it('should return a single notificationDTO', async () => {
            (notifcationRepository.getNotificationByNotificationId as jest.Mock).mockResolvedValue(mockNotification);

            const result = await notificationService.getNotificationByNotificationId('notif-123');

            expect(result).toBeInstanceOf(notificationDTO);
            expect(result.notification_id).toBe('notif-123');
        });
    });

    describe('markAsRead', () => {
        it('should mark notification as read and return DTO', async () => {
            const updatedNotification = { ...mockNotification, read: true };
            (notifcationRepository.markAsRead as jest.Mock).mockResolvedValue(mockUpdatedNotification);

            const result = await notificationService.markAsRead('notif-123');

            expect(result).toBeInstanceOf(notificationDTO);
            expect(result.read).toBe(true);
        });
    });

    describe('deleteNotiffication', () => {
        it('should delete a notification and return true', async () => {
            (notifcationRepository.deleteNotiffication as jest.Mock).mockResolvedValue(true);

            const result = await notificationService.deleteNotiffication('notif-123');

            expect(result).toBe(true);
        });

        it('should return false if deletion failed', async () => {
            (notifcationRepository.deleteNotiffication as jest.Mock).mockResolvedValue(false);

            const result = await notificationService.deleteNotiffication('notif-123');

            expect(result).toBe(false);
        });
    });
});
