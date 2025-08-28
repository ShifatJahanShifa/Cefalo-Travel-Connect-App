import { NextFunction, Response } from "express"
import { ExpressRequest } from "../middlewares/auth.middleware.ts"
import * as NotificationService from "../services/notification.service.ts" 
import { notification } from "../types/notifcation.type.ts"
import { NotificationDTO } from "../DTOs/notification.dto.ts"
import { UserDTO } from "../DTOs/user.dto.ts"
import * as UserService from '../services/user.service.ts'
import { HTTP_STATUS } from "../constants/httpStatus.ts"

export const createNotification = async( req: ExpressRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const data: notification = req.body
        const result: NotificationDTO = await NotificationService.createNotification(data)

        res.status(HTTP_STATUS.CREATED).json(result)
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
        const result: NotificationDTO[] = await NotificationService.getNotificationByUserId(user.user_id)
       

        res.status(HTTP_STATUS.OK).json(result)
    }
    catch(error) 
    {
        next(error)
    }
}

export const getNotificationByNotificationId = async( req: ExpressRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const notification_id: string = req.params.notification_id
        const result: NotificationDTO = await NotificationService.getNotificationByNotificationId(notification_id)
        res.status(HTTP_STATUS.OK).json(result)
    }
    catch(error) 
    {
        next(error)
    }
}

export const markAsRead = async( req: ExpressRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const notification_id: string = req.params.notification_id
        const result: NotificationDTO = await NotificationService.markAsRead(notification_id)
        res.status(HTTP_STATUS.OK).json(result)
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
        res.status(HTTP_STATUS.NO_CONTENT).json(result)
    }
    catch(error) 
    {
        next(error)
    }
}
