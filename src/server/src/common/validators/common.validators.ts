import { z } from 'zod';
import { uuidValidator } from './type.validators';

export const idSchema = z.object({
  params: z.object({
    id: uuidValidator,
  }),
});
