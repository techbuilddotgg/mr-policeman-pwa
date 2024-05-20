import { z } from 'zod';

export const createControlSchema = z.object({
  name: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  description: z.string().optional(),
});
