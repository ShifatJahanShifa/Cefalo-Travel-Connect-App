import { notificationDTO } from "../DTOs/notification.dto.js";
import notifcationRepository from "../repositories/dao/notification.repository.js";
export const createNotification = async (data) => {
    const result = await notifcationRepository.createNotification(data);
    return new notificationDTO(result);
};
export const getNotificationByUserId = async (user_id) => {
    const results = await notifcationRepository.getNotificationByUserId(user_id);
    return results.map(result => new notificationDTO(result));
};
export const getNotificationByNotificationId = async (notification_id) => {
    const result = await notifcationRepository.getNotificationByNotificationId(notification_id);
    return new notificationDTO(result);
};
export const markAsRead = async (notification_id) => {
    const result = await notifcationRepository.markAsRead(notification_id);
    return new notificationDTO(result);
};
export const deleteNotiffication = async (notification_id) => {
    const result = await notifcationRepository.deleteNotiffication(notification_id);
    return result;
};
