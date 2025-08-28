import { ITravelPlanTransport } from "../interfaces/travelplan_transport.interface.ts";
import { Knex } from "knex";
import { dbClient } from "../../db/db.ts";

const db: Knex = dbClient.getConnection();


class TravelPlanTransportDao implements ITravelPlanTransport {
    async createTravelPlanTransport(travel_plan_id: string, transport_id: string): Promise<void> {
        await db('travel_plan_transports').insert({
            travel_plan_id: travel_plan_id,
            transport_id: transport_id,
        });
    }

    async getById(travel_plan_id: string): Promise<any[]> {
        const data: any[] = await db('travel_plan_transports').where({ travel_plan_id: travel_plan_id }); 
        return data;
    }

 
    async updateTravelPlanTransport(travel_plan_id: string, transport_id: string): Promise<any> {
        await db('travel_plan_transports').where({travel_plan_id: travel_plan_id, transport_id: transport_id}).update({
                    
        });
    }

    async deleteById(travel_plan_id: string): Promise<boolean> {
        await db('travel_plan_transports').where({travel_plan_id: travel_plan_id}).del();
        return true;
    }
}

const travelPlanTransportDao = new TravelPlanTransportDao();
export default travelPlanTransportDao;