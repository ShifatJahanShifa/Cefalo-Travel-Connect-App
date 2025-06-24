import { ITravelPlanMember } from "../interfaces/travelplanmember.interface";
import { Knex } from 'knex';
import { dbClient } from '../../db/db.ts';
import { IUser } from '../interfaces/user.interface.ts';
import { updateUserInfo } from '../../types/user.tpye.ts';
import { Role } from '../../enums/role.ts';
import { travelPlanMember } from "../../types/travelplan.type.ts";
const db: Knex = dbClient.getConnection();


class TravelPlanMember implements ITravelPlanMember {
    
    async addTravelPlanMember(travel_plan_id: string, user_id: string, role: string): Promise<string> {
        await db("travel_plan_members").insert({
            travel_plan_id: travel_plan_id,
            user_id: user_id,
            role: role
        }) 

        return "add member"
    }

    async getTravelPlanMemmebrs(travel_plan_id: string): Promise<travelPlanMember[]> {
        const travelPlanMembers: travelPlanMember[] = await db("travel_plan_members").select("*").where({
            travel_plan_id: travel_plan_id
        }) 
        return travelPlanMembers
    }

    async updateTravelPlanMemberRole(travel_plan_id: string, user_id: string, role: string): Promise<string> {
        await db("travel_plan_members").update({
            travel_plan_id: travel_plan_id,
            user_id: user_id })
            .update({
            role: role
            })  
        
            return "role updated"
    }
}

const travelPlanMemberdao = new TravelPlanMember()
export default travelPlanMemberdao