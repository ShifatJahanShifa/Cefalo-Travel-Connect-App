import { NextFunction, Response } from "express"
import { ExpressRequest } from "../middlewares/auth.middleware.ts"
import * as NotificationService from "../services/notification.service.ts" 
import { notification } from "../types/notifcation.type.ts"
import { notificationDTO } from "../DTOs/notification.dto.ts"
import { UserDTO } from "../DTOs/user.dto.ts"
import * as UserService from '../services/user.service.ts'

export const createNotification = async( req: ExpressRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const data: notification = req.body
        const result: notificationDTO = await NotificationService.createNotification(data)

        res.status(201).json(result)
    }
    catch(error) 
    {
        next(error)
    }
}

export const getNotificationByUserId = async( req: ExpressRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const user_name: string = req.params.username 
        const user: UserDTO = await UserService.getUserByUsername(user_name)
        const result: notificationDTO[] = await NotificationService.getNotificationByUserId(user.user_id)

        res.status(200).json(result)
    }
    catch(error) 
    {
        next(error)
    }
}

export const getNotificationByNotificationId = async( req: ExpressRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const notification_id: string = req.params.notification_id
        const result: notificationDTO = await NotificationService.getNotificationByNotificationId(notification_id)
        res.status(200).json(result)
    }
    catch(error) 
    {
        next(error)
    }
}

export const markAsRead = async( req: ExpressRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const notification_id: string = req.params.notification_id
        const result: notificationDTO = await NotificationService.markAsRead(notification_id)
        res.status(200).json(result)
    }
    catch(error) 
    {
        next(error)
    }
}


export const deleteNotiffication = async( req: ExpressRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const notification_id: string = req.params.notification_id
        const result: boolean= await NotificationService.deleteNotiffication(notification_id)
        res.status(200).json(result)
    }
    catch(error) 
    {
        next(error)
    }
}
