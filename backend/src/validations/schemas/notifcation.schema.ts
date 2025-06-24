import { z } from 'zod';

export const notificationSchema = z.object({
  user_id: z.string().uuid(), // assuming user_id is UUID
  type: z.enum([
    'travel_plan_invitation',
    'post_comment',
    'like',
    'plan_comment',
  ]),
  reference_id: z.string().uuid().optional(), // assuming this is UUID; optional if nullable
  created_at: z.coerce.date().optional(), // optional; auto-generated usually
});
