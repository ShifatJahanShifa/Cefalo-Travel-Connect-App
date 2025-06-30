import * as NotificationService from "../services/notification.service.js";
import * as UserService from "../services/user.service.js";
export const createNotification = async (req, res, next) => {
    try {
        const data = req.body;
        const result = await NotificationService.createNotification(data);
        res.status(201).json(result);
    }
    catch (error) {
        next(error);
    }
};
export const getNotificationByUserId = async (req, res, next) => {
    try {
        const user_name = req.params.username;
        const user = await UserService.getUserByUsername(user_name);
        const result = await NotificationService.getNotificationByUserId(user.user_id);
        res.status(200).json(result);
    }
    catch (error) {
        next(error);
    }
};
export const getNotificationByNotificationId = async (req, res, next) => {
    try {
        const notification_id = req.params.notification_id;
        const result = await NotificationService.getNotificationByNotificationId(notification_id);
        res.status(200).json(result);
    }
    catch (error) {
        next(error);
    }
};
export const markAsRead = async (req, res, next) => {
    try {
        const notification_id = req.params.notification_id;
        const result = await NotificationService.markAsRead(notification_id);
        res.status(200).json(result);
    }
    catch (error) {
        next(error);
    }
};
export const deleteNotiffication = async (req, res, next) => {
    try {
        const notification_id = req.params.notification_id;
        const result = await NotificationService.deleteNotiffication(notification_id);
        res.status(200).json(result);
    }
    catch (error) {
        next(error);
    }
};
