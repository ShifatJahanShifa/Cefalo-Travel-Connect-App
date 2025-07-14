import { z } from 'zod';

export const notificationSchema = z.object({
  user_id: z.string().uuid(), 
  type: z.enum([
    'travel_plan_invitation',
    'post_comment',
    'like',
    'plan_comment',
  ]),
  reference_id: z.string().uuid().optional(), 
  created_at: z.coerce.date().optional(),
});
