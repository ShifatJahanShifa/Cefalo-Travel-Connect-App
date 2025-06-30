import { dbClient } from "../../db/db.js";
const db = dbClient.getConnection();
class TravelPlanDao {
    async craeteTravelPlan(input) {
        const [travelplan] = await db("travel_plans").insert({
            planner_id: input.planner_id,
            start_date: input.start_date,
            end_date: input.end_data,
            note: input.note,
            estimated_cost: input.estimated_cost
        })
            .returning("*");
        return travelplan;
    }
    async getTravelPlans(page, limit) {
        const offset = (page - 1) * limit;
        const travelplans = await db("travel_plans").select("*").offset(offset).limit(limit);
        return travelplans;
    }
    async getTravelPlanById(travel_plan_id) {
        const travelplan = await db("travel_plans").where({ travel_plan_id: travel_plan_id }).first();
        return travelplan;
    }
    async updateTravelPlanById(travel_plan_id, updatePlayload) {
        // will look later at this
        const travelplan = await db("travel_plans").where({ travel_plan_id: travel_plan_id }).update({
            planner_id: updatePlayload.planner_id,
            start_date: updatePlayload.start_date,
            end_date: updatePlayload.end_data,
            note: updatePlayload.note,
            estimated_cost: updatePlayload.estimated_cost
        });
        return "updated travel plan";
    }
    async deleteTravelPlanById(travel_plan_id) {
        const result = await db("travel_plans").where({ travel_plan_id: travel_plan_id }).del();
        return "deleted travel plan";
    }
    async getTravelPlanByMemberId(user_id) {
        const travelplans = await db('travel_plans as tp')
            .join('travel_plan_members as tpm', 'tp.travel_plan_id', 'tpm.travel_plan_id')
            .where('tpm.user_id', user_id)
            .select('tp.*');
        return travelplans;
    }
}
const travelPlanDao = new TravelPlanDao();
export default travelPlanDao;
