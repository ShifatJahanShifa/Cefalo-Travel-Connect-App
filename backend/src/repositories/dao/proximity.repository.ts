import { proximity } from "../../types/proximity.type.ts";
import { IProximity } from "../interfaces/proximity.interface.ts";
import { Knex } from "knex";
import { dbClient } from "../../db/db.ts";
import { AppError } from "../../utils/appError.ts";
const db: Knex = dbClient.getConnection();


class Proximity implements IProximity {
    async createProximity(input: proximity): Promise<proximity> {
        const [proximity] = await db("proximity").insert({
            user_id: input.user_id,
            type: input.type,
            reference_id: input.reference_id,
            radius: input.radius
        })
        .returning("*")

        return proximity
    }


    async findUserProximity(user_id: string): Promise<proximity[]> {
        const proximity: proximity[] = await db("proximity").where({
            user_id: user_id,
            type: "wishlist"
        })
        
        return proximity
    }

    async updateProximity(input: proximity): Promise<proximity> {
        // at first deleteing the existing ones 
        await db("proximity").where({
            user_id: input.user_id,
            type: input.type
        })
        .del()

        // then add ones 
        const result: proximity = await this.createProximity(input)

        return result
    }

    async deleteProximityById(proximity_id: string): Promise<boolean> {
        // add try catch
        await db("proximity").where({
            proximity_id: proximity_id
        })
        .del()

        return true 
    }

    async deleteProximity(input: proximity): Promise<boolean> {
        await db("proximity").where({
            user_id: input.user_id,
            type: input.type,
            reference_id: input.reference_id
        })
        .del()

        return true
    }
}

const proximityDao = new Proximity()
export default proximityDao