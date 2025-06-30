import { dbClient } from "../../db/db.js";
const db = dbClient.getConnection();
class TravelPlanAccommodationDao {
    async createTravelPlanAccommodation(travel_plan_id, accommodation_id) {
        await db('travel_plan_accommodations').insert({
            travel_plan_id: travel_plan_id,
            accommodation_id: accommodation_id,
        });
    }
    async getById(travel_plan_id) {
        const data = await db('travel_plan_accommodations').where({ travel_plan_id });
        return data;
    }
    // later
    async updateTravelPlanAccommodation(travel_plan_id, accommodation_id) {
        await db('travel_plan_accommodations').where({ travel_plan_id: travel_plan_id, accommodation_id: accommodation_id }).update({});
    }
}
const travelPlanAccommodationDao = new TravelPlanAccommodationDao();
export default travelPlanAccommodationDao;
