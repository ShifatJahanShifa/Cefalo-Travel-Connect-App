import { createdUser } from "../../types/auth.type.ts"

export interface IAuth {
    insertUser(username: string, email: string, password: string): Promise<createdUser>
    findUserByEmail(email: string): Promise<createdUser>
    findUserByUsername(username: string): Promise<createdUser>
}
