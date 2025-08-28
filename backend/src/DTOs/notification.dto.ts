export class NotificationDTO {
    notification_id?: string
    user_id!: string         
    type!: string 
    reference_id!: string       
    read!: boolean       
  
    constructor(data: Partial<NotificationDTO>) {
        Object.assign(this, data)
    }
}
