// src/features/practice_areas/practiceArea.validation.ts
import { z } from 'zod';
import { STATUS } from '../../shared/enums/user';

const createPracticeAreaSchema = z.object({
  body: z.object({
    title: z
      .string()
      .trim()
      .min(2, 'Title must be at least 2 characters')
      .max(200, 'Title cannot exceed 200 characters'),
    description: z
      .string()
      .trim()
      .min(2, 'Description must be at least 2 characters'),
    status: z.nativeEnum(STATUS).optional(),
  }),
});

const updatePracticeAreaSchema = z.object({
  body: z.object({
    title: z
      .string()
      .trim()
      .min(2, 'Title must be at least 2 characters')
      .max(200, 'Title cannot exceed 200 characters')
      .optional(),
    description: z
      .string()
      .trim()
      .min(2, 'Description must be at least 2 characters')
      .optional(),
    status: z.nativeEnum(STATUS).optional(),
  }),
});

const getAllPracticeAreasQuerySchema = z.object({
  query: z.object({
    searchTerm: z.string().trim().optional(),
    status: z.nativeEnum(STATUS).optional(),
    startDate: z.string().datetime().optional(),
    endDate: z.string().datetime().optional(),
    page: z.string().regex(/^\d+$/).transform(Number).default(1),
    limit: z.string().regex(/^\d+$/).transform(Number).default(10),
    sortBy: z.string().default('createdAt'),
    sortOrder: z.enum(['asc', 'desc']).default('desc'),
  }),
});

export const PracticeAreaValidation = {
  createPracticeAreaSchema,
  updatePracticeAreaSchema,
  getAllPracticeAreasQuerySchema,
};

