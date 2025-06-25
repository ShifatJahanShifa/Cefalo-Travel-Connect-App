var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { dbClient } from "../../db/db.js";
const db = dbClient.getConnection();
class TravelPlanMember {
    addTravelPlanMember(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const [result] = yield db("travel_plan_members").insert({
                travel_plan_id: data.travel_plan_id,
                user_id: data.user_id,
                role: data.role
            })
                .returning("*");
            return result;
        });
    }
    getTravelPlanMemmebrs(travel_plan_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const travelPlanMembers = yield db("travel_plan_members").select("*").where({
                travel_plan_id: travel_plan_id
            });
            return travelPlanMembers;
        });
    }
    updateTravelPlanMemberRole(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const [result] = yield db("travel_plan_members").where({
                travel_plan_id: data.travel_plan_id,
                user_id: data.user_id
            })
                .update({
                role: data.role
            })
                .returning("*");
            return result;
        });
    }
}
const travelPlanMemberdao = new TravelPlanMember();
export default travelPlanMemberdao;
