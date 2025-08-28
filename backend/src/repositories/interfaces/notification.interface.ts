import { notification } from "../../types/notifcation.type.ts";

export interface INotification {
    createNotification(data: notification): Promise<notification>   
    getNotificationByUserId(userId: string): Promise<notification[]>  
    getNotificationByNotificationId(notificationId: string): Promise<notification>
    markAsRead(notificationId: string): Promise<notification>
    deleteNotiffication(notificationId: string): Promise<boolean>
}