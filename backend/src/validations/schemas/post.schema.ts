import { z } from 'zod';

export const createPostSchema = z.object({
    user_id: z.number(),
  title: z.string(),
  description: z.string(),
  total_cost: z.number(),
  duration: z.string(),
  effort: z.string(),
  categories: z.string(), // or use z.string().array() if it's meant to be multiple

  hotels: z.array(z.object({
    hotel_name: z.string(),
    cost_per_night: z.number().optional(),
    latitude: z.number().optional(),
    longitude: z.number().optional(),
    cost: z.number(),
    rating: z.number(),
    review: z.string()
  })).optional(),

  transports: z.array(z.object({
    transport_type: z.string(),
    transport_provider: z.string(),
    cost_per_person: z.number().optional(),
    starting_point_latitude: z.number().optional(),
    ending_point_latitude: z.number().optional(),
    starting_point_longitude: z.number().optional(),
    ending_point_longitude: z.number().optional(),
    cost: z.number(),
    rating: z.number(),
    review: z.string()
  })).optional(),

  places: z.array(z.object({
    place_name: z.string(),
    latitude: z.number().optional(),
    longitude: z.number().optional(),
    rating: z.number(),
    review: z.string()
  })).optional(),

  foods: z.array(z.object({
    food_name: z.string(),
    restaurant: z.string(),
    food_cost: z.number(),
    review: z.string()
  })).optional(),

  images: z.array(z.object({
    image_url: z.string().url(),
    caption: z.string().optional()
  })).optional()
});


export const updatePostSchema = z.object({

  title: z.string(),
  description: z.string(),
  total_cost: z.number(),
  duration: z.string(),
  effort: z.string(),
  categories: z.string(), // or use z.string().array() if it's meant to be multiple

  hotels: z.array(z.object({
    hotel_name: z.string(),
    cost_per_night: z.number().optional(),
    latitude: z.number().optional(),
    longitude: z.number().optional(),
    cost: z.number(),
    rating: z.number(),
    review: z.string()
  })).optional(),

  transports: z.array(z.object({
    transport_type: z.string(),
    transport_provider: z.string(),
    cost_per_person: z.number().optional(),
    starting_point_latitude: z.number().optional(),
    ending_point_latitude: z.number().optional(),
    starting_point_longitude: z.number().optional(),
    ending_point_longitude: z.number().optional(),
    cost: z.number(),
    rating: z.number(),
    review: z.string()
  })).optional(),

  places: z.array(z.object({
    place_name: z.string(),
    latitude: z.number().optional(),
    longitude: z.number().optional(),
    rating: z.number(),
    review: z.string()
  })).optional(),

  foods: z.array(z.object({
    food_name: z.string(),
    restaurant: z.string(),
    food_cost: z.number(),
    review: z.string()
  })).optional(),

  images: z.array(z.object({
    image_url: z.string().url(),
    caption: z.string().optional()
  })).optional()
});
