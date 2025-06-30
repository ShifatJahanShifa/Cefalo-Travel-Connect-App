import { dbClient } from "../../db/db.js";
const db = dbClient.getConnection();
class TravelPlanMember {
    async addTravelPlanMember(data) {
        const [result] = await db("travel_plan_members").insert({
            travel_plan_id: data.travel_plan_id,
            user_id: data.user_id,
            role: data.role
        })
            .returning("*");
        return result;
    }
    async getTravelPlanMemmebrs(travel_plan_id) {
        const travelPlanMembers = await db("travel_plan_members").select("*").where({
            travel_plan_id: travel_plan_id
        });
        return travelPlanMembers;
    }
    async updateTravelPlanMemberRole(data) {
        const [result] = await db("travel_plan_members").where({
            travel_plan_id: data.travel_plan_id,
            user_id: data.user_id
        })
            .update({
            role: data.role
        })
            .returning("*");
        return result;
    }
    async memberExists(user_id, travel_plan_id) {
        const isMember = await db('travel_plan_members')
            .where({ travel_plan_id: travel_plan_id, user_id: user_id })
            .first();
        return isMember;
    }
}
const travelPlanMemberdao = new TravelPlanMember();
export default travelPlanMemberdao;
