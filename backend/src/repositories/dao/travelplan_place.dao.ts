import { ITravelPlanPlace } from "../interfaces/travelplan_place.interface.ts";
import { Knex } from "knex";
import { dbClient } from "../../db/db.ts";

const db: Knex = dbClient.getConnection();

class TravePlanPlaceDao implements ITravelPlanPlace {
    async createTravelPlanPlace(travel_plan_id: string, place_id: number): Promise<void> {
            await db('post_places').insert({
            travel_plan_id: travel_plan_id,
            place_id: place_id,
            
        });
    }

    async getById(travel_plan_id: string): Promise<any[]> {
        const data: any[] = await db('post_places').where({ travel_plan_id })
        console.log(data)
        return data
    }

    async updateTravelPlanPlace(travel_plan_id: string, place_id: number): Promise<any> {
        await db('post_places').where({travel_plan_id: travel_plan_id, place_id: place_id}).update({
                    // rating: rating,
                    // review: review 
        })
    }
}

const travelPlanPlaceDao = new TravePlanPlaceDao()
export default travelPlanPlaceDao