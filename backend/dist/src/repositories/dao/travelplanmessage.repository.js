import { dbClient } from "../../db/db.js";
const db = dbClient.getConnection();
class TravelPlanComment {
    async createComment(input) {
        const [result] = await db("travel_plan_comments").insert({
            travel_plan_id: input.travel_plan_id,
            sender_id: input.sender_id,
            message: input.message
        })
            .returning("*");
        return result;
    }
    async getComments(travel_plan_id) {
        const result = await db("travel_plan_comments").select("*").where({
            travel_plan_id: travel_plan_id
        });
        return result;
    }
}
const travelPlanCommentDao = new TravelPlanComment();
export default travelPlanCommentDao;
