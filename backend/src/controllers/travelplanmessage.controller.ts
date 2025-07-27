import { NextFunction, Response } from "express";
import { ExpressRequest } from "../middlewares/auth.middleware.ts";
import { travelPlanComment } from "../types/travelplan.type.ts";
import { TravelPlanCommentDTO } from "../DTOs/travelplanmessage.dto.ts";
import * as TravelPlanCommentService from "../services/travelplancomment.service.ts"

export const createTravelPlanComment = async(req: ExpressRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const payload: travelPlanComment = {
            travel_plan_id: req.params.travel_plan_id,
            sender_id: req.body.sender_id,
            message: req.body.message
        }

        const result: TravelPlanCommentDTO = await TravelPlanCommentService.createTravelPlanComment(payload)

        res.status(201).json(result)
    }
    catch(error) 
    {
        next(error)
    }
}

export const getTravelPlanComments = async(req: ExpressRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
            const travel_plan_id =  req.params.travel_plan_id
        
            const results: TravelPlanCommentDTO[] = await TravelPlanCommentService.getTravelPlanComments(travel_plan_id)

            res.status(200).json(results)
    }
    catch(error) 
    {
        next(error)
    }
} 