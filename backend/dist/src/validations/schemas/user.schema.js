import { z } from 'zod';
export const updateUserSchema = z.object({
    profile_picture_url: z
        .string()
        .max(255, 'Profile picture URL must be at most 255 characters')
        .url('Invalid URL format')
        .optional(),
    bio: z
        .string()
        .max(10000, 'Bio is too long') // PostgreSQL text supports large input, but you can set your own limit
        .optional(),
    role: z
        .enum(['explorer', 'traveler', 'admin'], {
        errorMap: () => ({ message: 'Role must be either explorer, traveler, or admin' }),
    })
        .optional(),
});
