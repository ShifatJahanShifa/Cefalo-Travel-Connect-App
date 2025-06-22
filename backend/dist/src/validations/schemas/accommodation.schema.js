import { z } from 'zod';
export const accommodationCreationSchema = z.object({
    accommodation_type: z.enum(['hotel', 'motel', 'resort', 'villa', 'cottage']),
    accommodation_name: z.string().min(1, "Accommodation name is required"),
    latitude: z.number().min(-90).max(90),
    longitude: z.number().min(-180).max(180),
    cost_per_night: z
        .number()
        .min(0)
        .transform((val) => Number(val.toFixed(2))) // i am doing auto correction here rather than throwing error
});
export const accommodationUpdationSchema = z.object({
    accommodation_id: z.number().optional(),
    accommodation_type: z.enum(['hotel', 'motel', 'resort', 'villa', 'cottage']).optional(),
    accommodation_name: z.string().min(1, "Accommodation name is required").optional(),
    latitude: z.number().min(-90).max(90).optional(),
    longitude: z.number().min(-180).max(180).optional(),
    cost_per_night: z
        .number()
        .min(0)
        .transform((val) => Number(val.toFixed(2))).optional() // i am doing auto correction here rather than throwing error
});
