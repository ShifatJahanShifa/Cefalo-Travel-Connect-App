import { z } from 'zod';
export const createPostSchema = z.object({
    user_id: z.number(),
    title: z.string().min(1),
    description: z.string(),
    total_cost: z.number(),
    duration: z.string(),
    effort: z.string(),
    hotels: z.array(z.object({
        hotel_name: z.string(),
        hotel_location: z.string(),
        cost_per_night: z.number(),
        review: z.string()
    })).optional(),
    transports: z.array(z.object({
        transport_type: z.string(),
        transport_provider: z.string(),
        cost_per_person: z.number(),
        review: z.string()
    })).optional(),
    places: z.array(z.object({
        place_name: z.string(),
        place_location: z.string(),
        review: z.string()
    })).optional(),
    foods: z.array(z.object({
        food_name: z.string(),
        restaurant: z.string(),
        food_cost: z.number(),
        review: z.string()
    })).optional(),
    category_names: z.array(z.string()).optional(),
    images: z.array(z.object({
        image_url: z.string().url(),
        caption: z.string().optional()
    })).optional(),
    geo_locations: z.array(z.object({
        latitude: z.number(),
        longitude: z.number(),
        location_name: z.string()
    })).optional()
});
export const updatePostSchema = z.object({
    title: z.string().min(1),
    description: z.string(),
    total_cost: z.number(),
    duration: z.string(),
    effort: z.string(),
    hotels: z.array(z.object({
        hotel_name: z.string(),
        hotel_location: z.string(),
        cost_per_night: z.number(),
        review: z.string()
    })).optional(),
    transports: z.array(z.object({
        transport_type: z.string(),
        transport_provider: z.string(),
        cost_per_person: z.number(),
        review: z.string()
    })).optional(),
    places: z.array(z.object({
        place_name: z.string(),
        place_location: z.string(),
        review: z.string()
    })).optional(),
    foods: z.array(z.object({
        food_name: z.string(),
        restaurant: z.string(),
        food_cost: z.number(),
        review: z.string()
    })).optional(),
    category_names: z.array(z.string()).optional(),
    images: z.array(z.object({
        image_url: z.string().url(),
        caption: z.string().optional()
    })).optional(),
    geo_locations: z.array(z.object({
        latitude: z.number(),
        longitude: z.number(),
        location_name: z.string()
    })).optional()
});
