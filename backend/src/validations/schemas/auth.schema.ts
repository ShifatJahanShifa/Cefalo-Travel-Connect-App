import { z }  from "zod";

export const signupSchema = z.object({
  username: z.string().max(50, 'Username must be at most 50 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().max(70, 'Password must be at most 70 characters'),
});

export const signinSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().max(70, 'Password must be at most 70 characters'),
});

