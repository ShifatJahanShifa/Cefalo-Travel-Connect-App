var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as NotificationService from "../services/notification.service.js";
import * as UserService from "../services/user.service.js";
export const createNotification = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const result = yield NotificationService.createNotification(data);
        res.status(201).json(result);
    }
    catch (error) {
        next(error);
    }
});
export const getNotificationByUserId = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user_name = req.params.username;
        const user = yield UserService.getUserByUsername(user_name);
        const result = yield NotificationService.getNotificationByUserId(user.user_id);
        res.status(200).json(result);
    }
    catch (error) {
        next(error);
    }
});
export const getNotificationByNotificationId = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const notification_id = req.params.notification_id;
        const result = yield NotificationService.getNotificationByNotificationId(notification_id);
        res.status(200).json(result);
    }
    catch (error) {
        next(error);
    }
});
export const markAsRead = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const notification_id = req.params.notification_id;
        const result = yield NotificationService.markAsRead(notification_id);
        res.status(200).json(result);
    }
    catch (error) {
        next(error);
    }
});
export const deleteNotiffication = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const notification_id = req.params.notification_id;
        const result = yield NotificationService.deleteNotiffication(notification_id);
        res.status(200).json(result);
    }
    catch (error) {
        next(error);
    }
});
