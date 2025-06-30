import { dbClient } from "../../db/db.js";
const db = dbClient.getConnection();
class TravePlanPlaceDao {
    async createTravelPlanPlace(travel_plan_id, place_id) {
        await db('travel_plan_places').insert({
            travel_plan_id: travel_plan_id,
            place_id: place_id,
        });
    }
    async getById(travel_plan_id) {
        const data = await db('travel_plan_places').where({ travel_plan_id });
        console.log(data);
        return data;
    }
    async updateTravelPlanPlace(travel_plan_id, place_id) {
        await db('travel_plan_places').where({ travel_plan_id: travel_plan_id, place_id: place_id }).update({
        // rating: rating,
        // review: review 
        });
    }
}
const travelPlanPlaceDao = new TravePlanPlaceDao();
export default travelPlanPlaceDao;
