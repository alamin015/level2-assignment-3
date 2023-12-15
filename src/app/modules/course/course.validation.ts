import { z } from 'zod';

const createTagsValidation = z.object({
  name: z.string(),
  isDeleted: z.boolean(),
});

const updateTagsValidation = z.object({
  name: z.string(),
  isDeleted: z.boolean(),
});

const createDetailsValidation = z.object({
  level: z.enum(['Beginner', 'Intermediate', 'Advanced']),
  description: z.string(),
});

const updateDetailsValidation = z.object({
  level: z.enum(['Beginner', 'Intermediate', 'Advanced']).optional(),
  description: z.string().optional(),
});

const createCourseValidation = z.object({
  body: z.object({
    title: z.string(),
    instructor: z.string(),
    categoryId: z.string(),
    price: z.number(),
    tags: z.array(createTagsValidation),
    startDate: z.string(),
    endDate: z.string(),
    language: z.string(),
    provider: z.string(),
    details: createDetailsValidation,
  }),
});

const updateCourseValidation = z.object({
  body: z.object({
    title: z.string().optional(),
    instructor: z.string().optional(),
    categoryId: z.string().optional(),
    price: z.number().optional(),
    tags: z.array(updateTagsValidation).optional(),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    language: z.string().optional(),
    provider: z.string().optional(),
    details: updateDetailsValidation.optional(),
  }),
});

export const courseValidation = {
  createCourseValidation,
  updateCourseValidation,
};
