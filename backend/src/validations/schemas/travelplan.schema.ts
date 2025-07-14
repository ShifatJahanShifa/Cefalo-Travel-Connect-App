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
    travel_plan_id: z.string().uuid().optional(), // usually auto-generated
    planner_id: z.string().uuid({
        message: "planner_id must be a valid UUID",
    }),
    start_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
        message: "start_date must be in YYYY-MM-DD format",
    }).optional(),
    end_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
        message: "end_date must be in YYYY-MM-DD format",
    }).optional(),
    note: z.string().optional(),
    estimated_cost: z
        .number({
        invalid_type_error: "estimated_cost must be a number",
        })
        .nonnegative()
        .optional(),
    created_at: z.string().datetime().optional(),
    updated_at: z.string().datetime().optional(), 

    accommodations: z.array(accommodationSchema).optional(),
    transports: z.array(transportSchema).optional(),
    places: z.array(placeSchema).optional(),

});


// export const createTravelPlantSchema = z.object({
  
//   user_id: z.string().min(1),
//   title: z.string().min(1),
//   description: z.string().min(1),
//   total_cost: z.number().min(0),
//   duration: z.string().min(1),
//   effort: z.string().min(1),
//   categories: z.array(categoryEnum),

//   accommodations: z.array(accommodationSchema).optional(),
//   transports: z.array(transportSchema).optional(),
//   places: z.array(placeSchema).optional(),
//   foods: z.array(foodSchema).optional(),
//   images: z.array(imageSchema).optional(),
// });

// // ----------------------
// // ✅ UpdatePost Schema
// // ----------------------
// export const updatePostSchema = z.object({
//   title: z.string().min(1),
//   description: z.string().min(1),
//   total_cost: z.number().min(0),
//   duration: z.string().min(1),
//   effort: z.string().min(1),
//   categories: z.array(categoryEnum),

//   accommodations: z.array(accommodationSchema).optional(),
//   transports: z.array(transportSchema).optional(),
//   places: z.array(placeSchema).optional(),
//  foods: z.array(foodSchema).optional(),
//   images: z.array(imageSchema).optional(),
// });
