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
class TravelPlanComment {
    createComment(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const [result] = yield db("travel_plan_comments").insert({
                travel_plan_id: input.travel_plan_id,
                sender_id: input.sender_id,
                message: input.message
            })
                .returning("*");
            return result;
        });
    }
    getComments(travel_plan_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db("travel_plan_comments").select("*").where({
                travel_plan_id: travel_plan_id
            });
            return result;
        });
    }
}
const travelPlanCommentDao = new TravelPlanComment();
export default travelPlanCommentDao;
