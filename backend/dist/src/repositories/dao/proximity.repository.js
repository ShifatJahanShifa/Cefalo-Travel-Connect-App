import { dbClient } from "../../db/db.js";
const db = dbClient.getConnection();
class Proximity {
    async createProximity(input) {
        const [proximity] = await db("proximity").insert({
            user_id: input.user_id,
            type: input.type,
            reference_id: input.reference_id,
            radius: input.radius
        })
            .returning("*");
        return proximity;
    }
    async findUserProximity(user_id) {
        const proximity = await db("proximity").where({
            user_id: user_id,
            type: "wishlist"
        });
        return proximity;
    }
    async updateProximity(input) {
        // at first deleteing the existing ones 
        await db("proximity").where({
            user_id: input.user_id,
            type: input.type
        })
            .del();
        // then add ones 
        const result = await this.createProximity(input);
        return result;
    }
    async deleteProximityById(proximity_id) {
        // add try catch
        await db("proximity").where({
            proximity_id: proximity_id
        })
            .del();
        return true;
    }
    async deleteProximity(input) {
        await db("proximity").where({
            user_id: input.user_id,
            type: input.type,
            reference_id: input.reference_id
        })
            .del();
        return true;
    }
}
const proximityDao = new Proximity();
export default proximityDao;
