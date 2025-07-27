import { proximity } from "../../types/proximity.type.ts";

export interface IProximity {
    createProximity(input: proximity): Promise<proximity> 
    findUserProximity(user_id: string): Promise<proximity[]>
    updateProximity(input: proximity): Promise<proximity>
    deleteProximityById(proximity_id: string): Promise<boolean>
    deleteProximity(input: proximity): Promise<boolean>
}