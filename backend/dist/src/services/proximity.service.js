import { ProximityDTO } from "../DTOs/proximity.dto.js";
import proximityDao from "../repositories/dao/proximity.repository.js";
export const createProximity = async (input) => {
    const result = await proximityDao.createProximity(input);
    return new ProximityDTO(result);
};
export const findUserProximity = async (user_id) => {
    const results = await proximityDao.findUserProximity(user_id);
    return results.map(result => new ProximityDTO(result));
};
export const updateProximity = async (input) => {
    const result = await proximityDao.updateProximity(input);
    return new ProximityDTO(result);
};
export const deleteProximityById = async (proximity_id) => {
    const result = await proximityDao.deleteProximityById(proximity_id);
    return result;
};
export const deleteProximity = async (input) => {
    const result = await proximityDao.deleteProximity(input);
    return result;
};
