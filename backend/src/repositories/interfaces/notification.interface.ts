import { notification } from "../../types/notifcation.type.ts";

export interface INotification {
    createNotification(data: notification): Promise<notification>   
    getNotificationByUserId(user_id: string): Promise<notification[]>  
    getNotificationByNotificationId(notification_id: string): Promise<notification>
    markAsRead(notification_id: string): Promise<notification>
    deleteNotiffication(notification_id: string): Promise<boolean>
}