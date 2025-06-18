import { createdUser } from "../types/auth.type.ts"

export class UserDTO {
  user_id: number
  username: string
  email: string
  role: string
  profile_picture_url: string | null
  bio: string | null

  constructor(user: createdUser) {
    this.user_id = user.user_id
    this.username = user.username
    this.email = user.email
    this.role=user.role
    this.profile_picture_url=user.profile_picture_url
    this.bio=user.bio
  }
}
