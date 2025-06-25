import { ProximityDTO } from "../DTOs/proximity.dto.ts";
import proximityDao from "../repositories/dao/proximity.dao.ts";
import { proximity } from "../types/proximity.type.ts";


export const createProximity = async (input: proximity): Promise<ProximityDTO> => {
    const result: proximity = await proximityDao.createProximity(input)
    return new ProximityDTO(result)
}

export const findUserProximity = async (user_id: string): Promise<ProximityDTO[]> => {
    const results: proximity[] = await proximityDao.findUserProximity(user_id)
    return results.map(result => new ProximityDTO(result))
}


export const updateProximity = async (input: proximity): Promise<ProximityDTO> => {
    const result: proximity = await proximityDao.updateProximity(input)
    return new ProximityDTO(result)
}


export const deleteProximityById = async (proximity_id: string): Promise<boolean> => {
    const result: boolean = await proximityDao.deleteProximityById(proximity_id)
    return result
}

export const deleteProximity = async (input: proximity): Promise<boolean> => {
    const result: boolean = await proximityDao.deleteProximity(input)
    return result
}
