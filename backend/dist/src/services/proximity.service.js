var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ProximityDTO } from "../DTOs/proximity.dto.js";
import proximityDao from "../repositories/dao/proximity.dao.js";
export const createProximity = (input) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield proximityDao.createProximity(input);
    return new ProximityDTO(result);
});
export const findUserProximity = (user_id) => __awaiter(void 0, void 0, void 0, function* () {
    const results = yield proximityDao.findUserProximity(user_id);
    return results.map(result => new ProximityDTO(result));
});
export const updateProximity = (input) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield proximityDao.updateProximity(input);
    return new ProximityDTO(result);
});
export const deleteProximityById = (proximity_id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield proximityDao.deleteProximityById(proximity_id);
    return result;
});
export const deleteProximity = (input) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield proximityDao.deleteProximity(input);
    return result;
});
