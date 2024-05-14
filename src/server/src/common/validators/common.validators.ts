import { z } from 'zod';
import { uuidValidator } from './type.validators';

export const idSchema = z.object({
  params: z.object({
    id: uuidValidator,
  }),
});

export const userIdSchema = z.object({
  params: z.object({
    userId: uuidValidator,
  }),
});
