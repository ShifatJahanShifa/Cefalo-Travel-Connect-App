export class ProximityDTO {
    proximity_id?: string 
    user_id!: string
    type!: string 
    reference_id!: string 
    radius!: number 

    constructor(data: Partial<ProximityDTO>)
    {
        Object.assign(this, data);
    }
}