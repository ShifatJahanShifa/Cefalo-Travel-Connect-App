import { createdUser } from "../../types/auth.type.ts"

export interface IAuth {
    insertUser(username: string, email: string, password: string): Promise<createdUser>
    findUserByEmail(email: string): Promise<createdUser>
    findUserByUsername(username: string): Promise<createdUser>
    insertRefreshToken(user_id: string, token: string, expires_at: Date): Promise<void>
    updateRefreshToken(user_id: string, token: string, expires_at: Date): Promise<void>
    deleteRefreshToken(user_id: string): Promise<void>
    findRefreshToken(user_id: string): Promise<string>
}
