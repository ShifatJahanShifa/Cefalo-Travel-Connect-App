import { createdUser } from "../types/auth.type.ts"

export class UserDTO {
  user_id: string
  username: string
  email: string
  role: string
  profile_picture_url: string | null
  bio: string | null
  phone_no: string | null
  created_at: Date

  constructor(user: createdUser) {
    this.user_id = user.user_id
    this.username = user.username
    this.email = user.email
    this.role=user.role
    this.profile_picture_url=user.profile_picture_url
    this.bio=user.bio
    this.phone_no = user.phone_no
    this.created_at = user.created_at
  }
}
