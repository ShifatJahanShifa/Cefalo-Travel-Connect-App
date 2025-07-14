import { ITravelPlanAccommodation } from "../interfaces/travelplan_accommodation.interface.ts";
import { Knex } from "knex";
import { dbClient } from "../../db/db.ts";

const db: Knex = dbClient.getConnection();


class TravelPlanAccommodationDao implements ITravelPlanAccommodation {
    async createTravelPlanAccommodation(travel_plan_id: string, accommodation_id: string): Promise<void> {
        await db('travel_plan_accommodations').insert({
            travel_plan_id: travel_plan_id,
            accommodation_id: accommodation_id,
            
        });
    }

    async getById(travel_plan_id: string): Promise<any[]> {
        const data: any[] = await db('travel_plan_accommodations').where({travel_plan_id});
        
        return data;
    }

    // later
    async updateTravelPlanAccommodation(travel_plan_id: string, accommodation_id: string): Promise<any> {
        await db('travel_plan_accommodations').where({travel_plan_id: travel_plan_id, accommodation_id: accommodation_id}).update({
                
        });
    }

    async deleteById(travel_plan_id: string): Promise<boolean> {
        await db('travel_plan_accommodations').where({travel_plan_id: travel_plan_id}).del();
        return true;
    }
}

const travelPlanAccommodationDao = new TravelPlanAccommodationDao();
export default travelPlanAccommodationDao;