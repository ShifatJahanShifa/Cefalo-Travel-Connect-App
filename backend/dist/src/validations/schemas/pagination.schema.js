import { z } from 'zod';
export const paginationSchema = z.object({
    page: z
        .string()
        .regex(/^\d+$/, 'Page must be a positive number')
        .transform(Number),
    limit: z
        .string()
        .regex(/^\d+$/, 'Limit must be a positive number')
        .transform(Number)
});
