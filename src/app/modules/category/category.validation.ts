import { z } from 'zod';

const createCategoryValidation = z.object({
  body: z.object({
    name: z.string().trim(),
  }),
});

export const categoryValidation = {
  createCategoryValidation,
};
