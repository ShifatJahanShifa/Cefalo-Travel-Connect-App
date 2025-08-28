import express, { Request, Response } from 'express'
import { authenticate } from '../middlewares/auth.middleware.ts'
import { createNotification, deleteNotiffication, getNotificationByNotificationId, markAsRead } from '../controllers/notification.controller.ts'


export const notificationRouter = express.Router()


notificationRouter.get('/:notification_id', authenticate, getNotificationByNotificationId)
notificationRouter.post('/', createNotification)
notificationRouter.patch('/:notification_id', authenticate, markAsRead)
notificationRouter.delete('/:notification_id', authenticate, deleteNotiffication)