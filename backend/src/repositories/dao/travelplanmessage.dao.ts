import { travelPlanComment } from "../../types/travelplan.type";
import { ITravelPlanComment } from "../interfaces/travelplanmessage.interface";
import { dbClient } from '../../db/db.ts';
import { Knex } from 'knex';
import { IUser } from '../interfaces/user.interface.ts';
import { updateUserInfo } from '../../types/user.tpye.ts';
import { Role } from '../../enums/role.ts';
import { travelPlanMember } from "../../types/travelplan.type.ts";
const db: Knex = dbClient.getConnection();


class TravelPlanComment implements ITravelPlanComment {
    async createComment(input: travelPlanComment): Promise<travelPlanComment> {
        const [result] = await db("travel_plan_comments").insert({
                    travel_plan_id: input.travel_plan_id,
                    sender_id: input.sender_id,
                    message: input.message
                })
                .returning("*") 
            
            return result
    }

    async getComments(travel_plan_id: string): Promise<travelPlanComment[]> {
        const result = await db("travel_plan_comments").select("*").where({
                    travel_plan_id: travel_plan_id
                })
                
            
            return result
    }
}

const travelPlanCommentDao = new TravelPlanComment()
export default travelPlanCommentDao