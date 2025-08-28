import { proximity } from "../../types/proximity.type.ts"

export interface IProximity {
    createProximity(input: proximity): Promise<proximity> 
    findUserProximity(userId: string): Promise<proximity[]>
    updateProximity(input: proximity): Promise<proximity>
    deleteProximityById(proximityId: string): Promise<boolean>
    deleteProximity(input: proximity): Promise<boolean>
}