import { dbClient } from "../../db/db.js";
const db = dbClient.getConnection();
class TravelPlanTransportDao {
    async createTravelPlanTransport(travel_plan_id, transport_id) {
        await db('travel_plan_transports').insert({
            travel_plan_id: travel_plan_id,
            transport_id: transport_id,
        });
    }
    async getById(travel_plan_id) {
        const data = await db('travel_plan_transports').where({ travel_plan_id: travel_plan_id });
        return data;
    }
    // update mane delete kore new ta rakha
    async updateTravelPlanTransport(travel_plan_id, transport_id) {
        await db('travel_plan_transports').where({ travel_plan_id: travel_plan_id, transport_id: transport_id }).update({});
    }
}
const travelPlanTransportDao = new TravelPlanTransportDao();
export default travelPlanTransportDao;
