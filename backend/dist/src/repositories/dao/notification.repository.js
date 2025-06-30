import { dbClient } from "../../db/db.js";
const db = dbClient.getConnection();
class Notifcation {
    async createNotification(data) {
        const [result] = await db("notifications").insert({
            user_id: data.user_id,
            type: data.type,
            reference_id: data.reference_id
        }).returning("*");
        return result;
    }
    async getNotificationByUserId(user_id) {
        const result = await db("notifications").select("*").where({ user_id: user_id }).orderBy("created_at", "desc");
        return result;
    }
    async getNotificationByNotificationId(notification_id) {
        const result = await db("notifications").select("*").where({ notification_id: notification_id }).first();
        return result;
    }
    async markAsRead(notification_id) {
        const [result] = await db("notifications").update({
            read: true
        }).where({ notification_id: notification_id }).returning("*");
        return result;
    }
    async deleteNotiffication(notification_id) {
        await db("notifications").where({ notification_id: notification_id }).del();
        return true;
    }
}
const notifcationRepository = new Notifcation();
export default notifcationRepository;
