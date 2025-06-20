// import { ExpressRequest } from "./auth.middleware.ts"
// import { Response, NextFunction } from "express"
// import userDAO from "../repositories/dao/user.dao.ts"
// import { UserDTO } from "../DTOs/user.dto.ts"
// import { AppError } from "../utils/appError"

// export const attachUserID = async (req: ExpressRequest, res: Response, next: NextFunction): Promise<void> => {
//      // at first i will get user_id from user table
//     const username: string = req.params.username
//     const user: UserDTO = await userDAO.getUserByUsername(username)
//     if(!user) 
//     {
//         throw new AppError("user not found",404)
//     }
//     req.body.user_id = user.user_id
//     next()
// }