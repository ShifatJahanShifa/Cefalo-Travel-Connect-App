import { createdUser } from "../../types/auth.type.ts"
import { updateUserInfo } from "../../types/user.type.ts"

export interface IUser {
    getAllUsers(page: number, limit: number): Promise<createdUser[]>
    getUserByUsername(username: string): Promise<createdUser>
    updateUser(username: string, updatUser: updateUserInfo): Promise<createdUser>
    deleteUser(username: string): Promise<createdUser>
    // getMe(username: string): Promise<createdUser> 
    getUserByID(user_id: string): Promise<createdUser>
}
