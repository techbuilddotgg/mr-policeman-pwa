import { z } from 'zod';

export const createContributionSchema = z.object({
  userId: z.string().uuid(),
  latitude: z.number(),
  longitude: z.number(),
  description: z.string(),
});
