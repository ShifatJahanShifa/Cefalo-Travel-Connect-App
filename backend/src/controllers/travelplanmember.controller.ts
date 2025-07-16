import { NextFunction, Response } from 'express'
import { ExpressRequest } from '../middlewares/auth.middleware.ts'
import * as TravelPlanMemberService from '../services/travelplanmember.service.ts' 
import { travelPlanMember, travelPlanMemberAdd } from '../types/travelplan.type.ts'
import * as UserService from '../services/user.service.ts'
import { UserDTO } from '../DTOs/user.dto.ts'
import { TravelPlanMemberDTO } from '../DTOs/travelplanmember.dto.ts'
import { HTTP_STATUS } from '../constants/httpStatus.ts'

export const addTravelPlanMember = async(req: ExpressRequest, res: Response, next: NextFunction) => {
    try {
        const result: TravelPlanMemberDTO = await TravelPlanMemberService.addTravelPlanMember(req.body)
        res.status(HTTP_STATUS.CREATED).json(result)
    }
    catch(error) 
    {
        next(error)
    }
}

export const getTravelPlanMemmebrs = async(req: ExpressRequest, res: Response, next: NextFunction) => {
    try {
    
        const result: TravelPlanMemberDTO[] = await TravelPlanMemberService.getTravelPlanMemmebrs(req.params.travel_plan_id)
        res.status(HTTP_STATUS.OK).json(result)
    }
    catch(error) 
    {
        next(error)
    }
}


export const updateTravelPlanMemberRole = async(req: ExpressRequest, res: Response, next: NextFunction) => {
    try {

        const user: UserDTO = await UserService.getUserByUsername(req.username!)
        const travelPlanMemberData: travelPlanMemberAdd = {
            user_id: req.body.user_id,
            travel_plan_id: req.params.travel_plan_id, 
            role: req.body.role
        }

        const result: TravelPlanMemberDTO = await TravelPlanMemberService.updateTravelPlanMemberRole(travelPlanMemberData, user.user_id)
        res.status(HTTP_STATUS.OK).json(result)
    }
    catch(error) 
    {
        next(error)
    }
}