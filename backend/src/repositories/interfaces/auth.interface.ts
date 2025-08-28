import { createdUser } from "../../types/auth.type.ts"

export interface IAuth {
    insertUser(username: string, email: string, password: string): Promise<createdUser>
    findUserByEmail(email: string): Promise<createdUser>
    findUserByUsername(username: string): Promise<createdUser>
    insertRefreshToken(userId: string, token: string, expiresAt: Date): Promise<void>
    updateRefreshToken(userId: string, token: string, expiresAt: Date): Promise<void>
    deleteRefreshToken(userId: string): Promise<void>
    findRefreshToken(userId: string): Promise<string>
}
