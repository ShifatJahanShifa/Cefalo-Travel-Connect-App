import { z } from 'zod';
const categoryEnum = z.enum([
    'Adventure',
    'Beach',
    'Cultural Site',
    'Budget Travel',
    'Historical',
    'Nature',
    'Heritage',
]);
const accommodationSchema = z.object({
    accommodation_type: z.string(),
    accommodation_name: z.string().min(1),
    cost_per_night: z.number().optional(),
    latitude: z.number().optional(),
    longitude: z.number().optional(),
    cost: z.number().min(0),
    rating: z.number().int().min(0).max(5),
    review: z.string().min(1),
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
    cost: z.number().min(0),
    rating: z.number().int().min(0).max(5),
    review: z.string().min(1),
});
const placeSchema = z.object({
    place_name: z.string().min(1),
    latitude: z.number().optional(),
    longitude: z.number().optional(),
    cost: z.number(),
    rating: z.number().int().min(0).max(5),
    review: z.string().min(1),
});
const foodSchema = z.object({
    food_name: z.string().min(1),
    cost: z.number().min(0),
    rating: z.number().int().min(0).max(5),
    review: z.string().min(1),
});
const imageSchema = z.object({
    image_url: z.string().url(),
    caption: z.string().optional(),
});
export const createPostSchema = z.object({
    user_id: z.string().min(1),
    title: z.string().min(1),
    description: z.string().min(1),
    total_cost: z.number().min(0),
    duration: z.string().min(1),
    effort: z.string().min(1),
    categories: z.array(categoryEnum),
    accommodations: z.array(accommodationSchema).optional(),
    transports: z.array(transportSchema).optional(),
    places: z.array(placeSchema).optional(),
    foods: z.array(foodSchema).optional(),
    images: z.array(imageSchema).optional(),
});
// ----------------------
// ✅ UpdatePost Schema
// ----------------------
export const updatePostSchema = z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    total_cost: z.number().min(0),
    duration: z.string().min(1),
    effort: z.string().min(1),
    categories: z.array(categoryEnum),
    accommodations: z.array(accommodationSchema).optional(),
    transports: z.array(transportSchema).optional(),
    places: z.array(placeSchema).optional(),
    foods: z.array(foodSchema).optional(),
    images: z.array(imageSchema).optional(),
});
