import { createdUser, foundUser } from "../../DTOs/auth.dto.ts"

export interface IAuth {
  insertPerson(username: string, email: string, password: string, role: string): Promise<createdUser>
  findUserByEmail(email: string): Promise<foundUser>
}
