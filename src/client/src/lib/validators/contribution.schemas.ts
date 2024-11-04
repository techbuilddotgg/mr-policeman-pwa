import {z} from 'zod';

export const AddContributionSchema = z.object({
    text: z
        .string()
        .min(2, {message: 'Prispevek mora vsebovati vsaj 2 črki.'}),
    priority: z.number().min(1).max(10)
});