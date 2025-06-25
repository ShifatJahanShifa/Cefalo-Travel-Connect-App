import { NextFunction, Response } from "express";
import { ExpressRequest } from "../middlewares/auth.middleware.ts";
import * as UserService from "../services/user.service.ts"
import { travelPlanInput } from "../types/travelplan.type.ts";
import * as TravelPlanService from "../services/travelplan.service.ts"
import { TravelPlanResponseDTO } from "../DTOs/travelplan.dto.ts";
import { UserDTO } from "../DTOs/user.dto.ts";

export const craeteTravelPlan = async(req: ExpressRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        // at first getting th eplanner_id 
        const user: UserDTO = await UserService.getUserByUsername(req.username!) 
        const payload: travelPlanInput = req.body 
        payload.planner_id = user.user_id 

        const result = await TravelPlanService.craeteTravelPlan(payload)

        res.status(201).json(result)
    }
    catch(error)
    {
        next(error)
    }
}

export const getTravelPlans = async(req: ExpressRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const page: number = parseInt(req.query.page as string);
        const limit: number = parseInt(req.query.limit as string);
        const results: TravelPlanResponseDTO[] = await TravelPlanService.getTravelPlans(page, limit) 

        res.status(200).json(results)
    }
    catch(error)
    {
        next(error)
    }
}

export const getTravelPlanById = async(req: ExpressRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const result: TravelPlanResponseDTO = await TravelPlanService.getTravelPlanById(req.params.travel_plan_id)

        res.status(200).json(result)
    }
    catch(error)
    {
        next(error)
    }
}

export const updateTravelPlanById = async(req: ExpressRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const user: UserDTO = await UserService.getUserByUsername(req.username!) 
        const payload: travelPlanInput = req.body 
        payload.planner_id = user.user_id 

        const result: string = await TravelPlanService.updateTravelPlan(req.params.travel_plan_id, payload)

        res.status(200).json(result)
    }
    catch(error)
    {
        next(error)
    }
}

export const deleteTravelPlanById = async(req: ExpressRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const result: string = await TravelPlanService.deleteTravelPlan(req.params.travel_plan_id)

        res.status(200).json(result)
    }
    catch(error)
    {
        next(error)
    }
}


export const getTravelPlanByMemberId = async(req: ExpressRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
         // at first getting th eplanner_id 
        const user: UserDTO = await UserService.getUserByUsername(req.username!) 
        
        const results: TravelPlanResponseDTO[] = await TravelPlanService.getTravelPlansByMemberId(user.user_id)

        res.status(200).json(results)
    }
    catch(error) 
    {
        next(error)
    }
}