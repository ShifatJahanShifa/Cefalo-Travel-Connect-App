var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { notificationDTO } from "../DTOs/notification.dto.js";
import notifcationRepository from "../repositories/dao/notification.repository.js";
export const createNotification = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield notifcationRepository.createNotification(data);
    return new notificationDTO(result);
});
export const getNotificationByUserId = (user_id) => __awaiter(void 0, void 0, void 0, function* () {
    const results = yield notifcationRepository.getNotificationByUserId(user_id);
    return results.map(result => new notificationDTO(result));
});
export const getNotificationByNotificationId = (notification_id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield notifcationRepository.getNotificationByNotificationId(notification_id);
    return new notificationDTO(result);
});
export const markAsRead = (notification_id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield notifcationRepository.markAsRead(notification_id);
    return new notificationDTO(result);
});
export const deleteNotiffication = (notification_id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield notifcationRepository.deleteNotiffication(notification_id);
    return result;
});
