var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { TravelPlanCommentDTO } from "../DTOs/travelplanmessage.dto.js";
import travelPlanCommentDao from "../repositories/dao/travelplanmessage.dao.js";
export const createTravelPlanComment = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield travelPlanCommentDao.createComment(data);
    return new TravelPlanCommentDTO(result);
});
export const getTravelPlanComments = (travel_plan_id) => __awaiter(void 0, void 0, void 0, function* () {
    const results = yield travelPlanCommentDao.getComments(travel_plan_id);
    return results.map((result) => new TravelPlanCommentDTO(result));
});
