var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { dbClient } from "../../db/db.js";
const db = dbClient.getConnection();
class Notifcation {
    createNotification(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const [result] = yield db("notifications").insert({
                user_id: data.user_id,
                type: data.type,
                reference_id: data.reference_id
            }).returning("*");
            return result;
        });
    }
    getNotificationByUserId(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db("notifications").select("*").where({ user_id: user_id }).orderBy("created_at", "desc");
            return result;
        });
    }
    getNotificationByNotificationId(notification_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db("notifications").select("*").where({ notification_id: notification_id }).first();
            return result;
        });
    }
    markAsRead(notification_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const [result] = yield db("notifications").update({
                read: true
            }).where({ notification_id: notification_id }).returning("*");
            return result;
        });
    }
    deleteNotiffication(notification_id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield db("notifications").where({ notification_id: notification_id }).del();
            return true;
        });
    }
}
const notifcationRepository = new Notifcation();
export default notifcationRepository;
