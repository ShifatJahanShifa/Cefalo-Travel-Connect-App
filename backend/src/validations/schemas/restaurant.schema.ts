import { z } from "zod";

export const createRestaurantSchema = z.object({
  restaurant_name: z.string().min(1, "Restaurant name is required"),

  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
});

export const updateRestaurantSchema = z.object({
  restaurant_name: z.string().min(1).optional(),
  popular_food: z.string().min(1).optional(),
  latitude: z.number().min(-90).max(90).optional(),
  longitude: z.number().min(-180).max(180).optional(),
});
