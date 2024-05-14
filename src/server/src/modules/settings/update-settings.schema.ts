import { z } from 'zod';

export const updateNotificationSettingsSchema = z.object({
  body: z.object({
    enabled: z.boolean(),
  }),
});
