import { z } from 'zod';

export const wishlistSchema = z.object({
    place_name: z.string().min(1, { message: "Place name is required" }),
    type: z.string().min(1), 
    title: z.string().min(1, { message: "Title is required" }),
    theme: z.string().optional(),  // Optional if it's not always provided
    region: z.string().optional(), // Optional if it's not always provided
    note: z.string().optional(),
    is_public: z.boolean(),
    latitude: z.number().min(-90).max(90).optional(),
    longitude: z.number().min(-180).max(180).optional()
});

