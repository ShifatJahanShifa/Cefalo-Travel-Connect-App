import { NextFunction, Response } from 'express'
import { ExpressRequest } from '../middlewares/auth.middleware.ts'
import * as TravelPlanMemberService from '../services/travelplanmember.service.ts' 
import { travelPlanMember, travelPlanMemberAdd } from '../types/travelplan.type.ts'
import * as UserService from '../services/user.service.ts'
import { UserDTO } from '../DTOs/user.dto.ts'
import { TravelPlanMemberDTO } from '../DTOs/travelplanmember.dto.ts'

export const addTravelPlanMember = async(req: ExpressRequest, res: Response, next: NextFunction) => {
    try {
        // getting from userserice
        // const user: UserDTO = await UserService.getUserByUsername(req.username!) 

        // const payload: travelPlanMemberAdd = {
        //     user_id: user.user_id,
        //     travel_plan_id: req.params.travel_plan_id, 
        //     role: "member"
        // }

        const result: TravelPlanMemberDTO = await TravelPlanMemberService.addTravelPlanMember(req.body)
        res.status(201).json(result)
    }
    catch(error) 
    {
        next(error)
    }
}

export const getTravelPlanMemmebrs = async(req: ExpressRequest, res: Response, next: NextFunction) => {
    try {
    
        const result: TravelPlanMemberDTO[] = await TravelPlanMemberService.getTravelPlanMemmebrs(req.params.travel_plan_id)
        res.status(200).json(result)
    }
    catch(error) 
    {
        next(error)
    }
}


export const updateTravelPlanMemberRole = async(req: ExpressRequest, res: Response, next: NextFunction) => {
    try {

        const payload: travelPlanMemberAdd = {
            user_id: req.body.user_id,
            travel_plan_id: req.params.travel_plan_id, 
            role: req.body.role
        }

        const result: TravelPlanMemberDTO = await TravelPlanMemberService.updateTravelPlanMemberRole(payload)
        res.status(200).json(result)
    }
    catch(error) 
    {
        next(error)
    }
}