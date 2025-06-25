import express from 'express';
import { authenticate } from "../middlewares/auth.middleware.js";
import { createNotification, deleteNotiffication, getNotificationByNotificationId, markAsRead } from "../controllers/notification.controller.js";
export const notificationRouter = express.Router();
notificationRouter.post('/', createNotification);
notificationRouter.get('/:notification_id', authenticate, getNotificationByNotificationId);
notificationRouter.patch('/:notification_id', authenticate, markAsRead);
notificationRouter.delete('/:notification_id', authenticate, deleteNotiffication);
