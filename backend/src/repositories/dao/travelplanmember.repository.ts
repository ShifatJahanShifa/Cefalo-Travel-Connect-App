import { ITravelPlanMember } from "../interfaces/travelplanmember.interface.ts";
import { Knex } from 'knex';
import { dbClient } from '../../db/db.ts';
import { IUser } from '../interfaces/user.interface.ts';
import { updateUserInfo } from '../../types/user.type.ts';
import { Role } from '../../enums/role.ts';
import { travelPlanMember, travelPlanMemberAdd } from "../../types/travelplan.type.ts";
const db: Knex = dbClient.getConnection();


class TravelPlanMember implements ITravelPlanMember {
    
    async addTravelPlanMember(data: travelPlanMemberAdd): Promise<travelPlanMember> {
        const [result] = await db("travel_plan_members").insert({
            travel_plan_id: data.travel_plan_id,
            user_id: data.user_id,
            role: data.role as string
        }) 
        .returning("*");

        return result;
    }

    async getTravelPlanMemmebrs(travel_plan_id: string): Promise<travelPlanMember[]> {
        const travelPlanMembers: travelPlanMember[] = await db("travel_plan_members").select("*").where({
            travel_plan_id: travel_plan_id
        }); 

        return travelPlanMembers;
    }

    async updateTravelPlanMemberRole(data: travelPlanMemberAdd): Promise<travelPlanMember> {
        const [result] = await db("travel_plan_members").where({
                travel_plan_id: data.travel_plan_id,
                user_id: data.user_id
            })
            .update({
                role: data.role as string
            })  
            .returning("*");
        
            return result;
    }

    async memberExists(user_id: string, travel_plan_id: string): Promise<any> {
        const isMember = await db('travel_plan_members')
            .where({ travel_plan_id: travel_plan_id, user_id: user_id })
            .first();

        return isMember;
    }
}

const travelPlanMemberdao = new TravelPlanMember();
export default travelPlanMemberdao;