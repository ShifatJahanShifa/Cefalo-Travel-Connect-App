import { z } from 'zod';


const accommodationSchema = z.object({
  accommodation_type: z.string(),
  accommodation_name: z.string().min(1),
  cost_per_night: z.number().optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
 
});

const transportSchema = z.object({
  transport_type: z.string(),
  transport_name: z.string(),
  cost_per_person: z.number().optional(),
  starting_location_name: z.string().optional(),
  starting_location_latitude: z.number().optional(),
  starting_location_longitude: z.number().optional(),
  ending_location_name: z.string().optional(),
  ending_location_latitude: z.number().optional(),
  ending_location_longitude: z.number().optional(),

});

const placeSchema = z.object({
  place_name: z.string().min(1),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
 
});

export const travelPlanSchema = z.object({
    travel_plan_id: z.string().uuid().optional(), 
    planner_id: z.string().uuid({
        message: "Planner id must be a valid UUID",
    }),
    start_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
        message: "Start date must be in YYYY-MM-DD format",
    }).optional(),
    end_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
        message: "End date must be in YYYY-MM-DD format",
    }).optional(),
    note: z.string().optional(),
    estimated_cost: z
        .number({
        invalid_type_error: "Estimated cost must be a number",
        })
        .nonnegative()
        .optional(),
    created_at: z.string().datetime().optional(),
    updated_at: z.string().datetime().optional(), 

    accommodations: z.array(accommodationSchema).optional(),
    transports: z.array(transportSchema).optional(),
    places: z.array(placeSchema).optional(),

});


