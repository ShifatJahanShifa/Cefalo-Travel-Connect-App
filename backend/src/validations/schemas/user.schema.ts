import { z } from 'zod';
import { Role } from '../../enums/role.ts';

export const updateUserSchema = z.object({
  profile_picture_url: z
    .string()
    .max(255, 'Profile picture URL must be at most 255 characters')
    .url('Invalid URL format')
    .optional(),

  bio: z
    .string()
    .max(10000, 'Bio is too long') 
    .optional(),

  role: z
    .nativeEnum(Role, {
      errorMap: () => ({ message: 'Role must be either explorer, traveller, or admin' }),
    })
    .optional(),

  hashed_password: z 
    .string()
    .max(70, 'Password length at most 70 characters')
    .optional(),
  
  phone_no: z 
    .string()
    .max(15, 'Phone no length at most 70 characters')
    .optional()
});
