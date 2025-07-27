import { notificationDTO } from "../DTOs/notification.dto.ts";
import notifcationRepository from "../repositories/dao/notification.repository.ts";
import { notification } from "../types/notifcation.type.ts";

export const createNotification = async(data: notification): Promise<notificationDTO> => {
    const result: notification= await notifcationRepository.createNotification(data)

    return new notificationDTO(result)
}

export const getNotificationByUserId = async(user_id: string): Promise<notificationDTO[]> => {
    const results: notification[] = await notifcationRepository.getNotificationByUserId(user_id)

    return results.map(result => new notificationDTO(result))
}

export const getNotificationByNotificationId = async(notification_id: string): Promise<notificationDTO> => {
    const result: notification = await notifcationRepository.getNotificationByNotificationId(notification_id)

    return new notificationDTO(result)
}

export const markAsRead = async(notification_id: string): Promise<notificationDTO> => {
    const result: notification = await notifcationRepository.markAsRead(notification_id)
    return new notificationDTO(result)
}

export const deleteNotiffication = async(notification_id: string): Promise<boolean> => {
    const result: boolean = await notifcationRepository.deleteNotiffication(notification_id)

    return result
}