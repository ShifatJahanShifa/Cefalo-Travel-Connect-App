export class UserDTO {
  user_id!: string
  username!: string
  email!: string
  role!: string
  profile_picture_url!: string | null
  bio!: string | null
  phone_no!: string | null
  created_at!: Date

  constructor(user: UserDTO) {
    Object.assign(this, user)
  }
}
