import { createdUser } from "../types/auth.type.ts"

export class AuthDTO {
  user_id: string
  username: string
  email: string
  role: string
  accessToken: string
  refreshToken: string

  constructor(user: createdUser, accessToken: string, refreshToken: string) {
    this.user_id=user.user_id
    this.username = user.username
    this.email = user.email
    this.role=user.role
    this.accessToken=accessToken
    this.refreshToken=refreshToken
  }
}
