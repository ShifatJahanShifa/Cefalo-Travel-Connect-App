import { z } from 'zod';

export const placeCreationSchema = z.object({
    place_name: z.string().min(1, "place name is required"),
    latitude: z.number().min(-90).max(90),
    longitude: z.number().min(-180).max(180),
});

export const placeUpdationSchema = z.object({
    place_name: z.string().min(1, "place name is required").optional(),
    latitude: z.number().min(-90).max(90).optional(),
    longitude: z.number().min(-180).max(180).optional()
});
