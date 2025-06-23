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
class TravelPlanDao {
    craeteTravelPlan(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const [travelplan] = yield db("travel_plans").insert({
                planner_id: input.planner_id,
                start_date: input.start_date,
                end_date: input.end_data,
                note: input.note,
                estimated_cost: input.estimated_cost
            })
                .returning("*");
            return travelplan;
        });
    }
    getTravelPlans(page, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            const offset = (page - 1) * limit;
            const travelplans = yield db("travel_plans").select("*").offset(offset).limit(limit);
            return travelplans;
        });
    }
    getTravelPlanById(travel_plan_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const travelplan = yield db("travel_plans").where({ travel_plan_id: travel_plan_id });
            return travelplan;
        });
    }
    updateTravelPlanById(travel_plan_id, updatePlayload) {
        return __awaiter(this, void 0, void 0, function* () {
            // will look later at this
            const travelplan = yield db("travel_plans").where({ travel_plan_id: travel_plan_id }).update({
                planner_id: updatePlayload.planner_id,
                start_date: updatePlayload.start_date,
                end_date: updatePlayload.end_data,
                note: updatePlayload.note,
                estimated_cost: updatePlayload.estimated_cost
            });
            return "updated travel plan";
        });
    }
    deleteTravelPlanById(travel_plan_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db("travel_plans").where({ travel_plan_id: travel_plan_id }).del();
            return "deleted travel plan";
        });
    }
}
const travelPlanDao = new TravelPlanDao();
export default travelPlanDao;
