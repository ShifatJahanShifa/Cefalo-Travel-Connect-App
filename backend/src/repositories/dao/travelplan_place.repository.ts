import { ITravelPlanPlace } from "../interfaces/travelplan_place.interface.ts";
import { Knex } from "knex";
import { dbClient } from "../../db/db.ts";

const db: Knex = dbClient.getConnection();

class TravePlanPlaceDao implements ITravelPlanPlace {
    async createTravelPlanPlace(travel_plan_id: string, place_id: string): Promise<void> {
            await db('travel_plan_places').insert({
            travel_plan_id: travel_plan_id,
            place_id: place_id,
            
        });
    }

    async getById(travel_plan_id: string): Promise<any[]> {
        const data: any[] = await db('travel_plan_places').where({ travel_plan_id });
      
        return data;
    }

    async updateTravelPlanPlace(travel_plan_id: string, place_id: string): Promise<any> {
        await db('travel_plan_places').where({travel_plan_id: travel_plan_id, place_id: place_id}).update({
                    // rating: rating,
                    // review: review 
        });
    }

    async deleteById(travel_plan_id: string): Promise<boolean> {
        await db('travel_plan_places').where({travel_plan_id: travel_plan_id}).del();
        return true;
    }
}

const travelPlanPlaceDao = new TravePlanPlaceDao();
export default travelPlanPlaceDao;