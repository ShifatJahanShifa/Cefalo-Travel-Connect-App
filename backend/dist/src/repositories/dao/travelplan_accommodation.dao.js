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
class TravelPlanAccommodationDao {
    createTravelPlanAccommodation(travel_plan_id, accommodation_id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield db('travel_plan_accommodations').insert({
                travel_plan_id: travel_plan_id,
                accommodation_id: accommodation_id,
            });
        });
    }
    getById(travel_plan_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield db('travel_plan_accommodations').where({ travel_plan_id });
            return data;
        });
    }
    // later
    updateTravelPlanAccommodation(travel_plan_id, accommodation_id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield db('travel_plan_accommodations').where({ travel_plan_id: travel_plan_id, accommodation_id: accommodation_id }).update({});
        });
    }
}
const travelPlanAccommodationDao = new TravelPlanAccommodationDao();
export default travelPlanAccommodationDao;
