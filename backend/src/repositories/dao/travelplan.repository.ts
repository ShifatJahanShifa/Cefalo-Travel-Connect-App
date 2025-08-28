import { travelPlanInput, travelPlanOutput } from "../../types/travelplan.type.ts";
import { ITravelPlan } from "../interfaces/travelplan.interface.ts";
import { Knex } from 'knex';
import { dbClient } from '../../db/db.ts';
import { IUser } from '../interfaces/user.interface.ts';
import { updateUserInfo } from '../../types/user.type.ts';
import { Role } from '../../enums/role.ts';
const db: Knex = dbClient.getConnection();


class TravelPlanDao implements ITravelPlan {
    async craeteTravelPlan(input: travelPlanInput): Promise<any> {
        const [travelplan] = await db("travel_plans").insert({
                planner_id: input.planner_id,
                start_date: input.start_date,
                end_date: input.end_date,
                note: input.note,
                estimated_cost: input.estimated_cost 
            })
            .returning("*");

        return travelplan;
    }

    async getTravelPlans(page: number, limit: number): Promise<any[]> {
        const offset=(page-1)*limit;

        const travelplans = await db("travel_plans").select("*").offset(offset).limit(limit);

        return travelplans;
    }

    async getTravelPlanById(travel_plan_id: string): Promise<travelPlanOutput> {
        const travelplan = await db("travel_plans").where({travel_plan_id: travel_plan_id}).first();

        return travelplan;
    }

    async updateTravelPlanById(travel_plan_id: string, updatePlayload: travelPlanInput): Promise<string> {
      
        const travelplan = await db("travel_plans").where({travel_plan_id: travel_plan_id}).update({
                start_date: updatePlayload.start_date,
                end_date: updatePlayload.end_date,
                note: updatePlayload.note,
                estimated_cost: updatePlayload.estimated_cost 
            });

        return "updated travel plan";
    }

    async deleteTravelPlanById(travel_plan_id: string): Promise<string> {
        const result = await db("travel_plans").where({travel_plan_id: travel_plan_id}).del();

        return "deleted travel plan";
    }

    async getTravelPlanByMemberId(user_id: string): Promise<any[]> {
        const travelplans = await db('travel_plans as tp')
                .join('travel_plan_members as tpm', 'tp.travel_plan_id', 'tpm.travel_plan_id')
                .where('tpm.user_id', user_id)
                .select('tp.*');

        return travelplans;
    }

}

const travelPlanDao = new TravelPlanDao();
export default travelPlanDao;