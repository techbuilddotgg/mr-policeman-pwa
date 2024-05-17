import { z } from 'zod';

export const createContributionSchema = z.object({
  userId: z.string().uuid(),
  text: z.string(),
});
