export class notificationDTO {
    notification_id?: string
    user_id!: string         
    type!: string 
    reference_id!: string       
    read!: boolean       
  
    constructor(data: Partial<notificationDTO>) {
        Object.assign(this, data);
    }
}
