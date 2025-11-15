// src/features/insights/insight.validation.ts
import { z } from 'zod';
import { STATUS } from '../../shared/enums/user';

const createInsightSchema = z.object({
  body: z.object({
    title: z
      .string()
      .trim()
      .min(2, 'Title must be at least 2 characters')
      .max(200, 'Title cannot exceed 200 characters'),
    type: z.string().trim().min(1, 'Type is required'),
    description: z
      .string()
      .trim()
      .min(2, 'Description must be at least 2 characters'),
    outcome: z
      .string()
      .trim()
      .min(2, 'Outcome must be at least 2 characters'),
    status: z.nativeEnum(STATUS).optional(),
  }),
});

const updateInsightSchema = z.object({
  body: z.object({
    title: z
      .string()
      .trim()
      .min(2, 'Title must be at least 2 characters')
      .max(200, 'Title cannot exceed 200 characters')
      .optional(),
    type: z.string().trim().min(1, 'Type is required').optional(),
    description: z
      .string()
      .trim()
      .min(2, 'Description must be at least 2 characters')
      .optional(),
    outcome: z
      .string()
      .trim()
      .min(2, 'Outcome must be at least 2 characters')
      .optional(),
    status: z.nativeEnum(STATUS).optional(),
  }),
});

const getAllInsightsQuerySchema = z.object({
  query: z.object({
    searchTerm: z.string().trim().optional(),
    type: z.string().trim().optional(),
    status: z.nativeEnum(STATUS).optional(),
    startDate: z.string().datetime().optional(),
    endDate: z.string().datetime().optional(),
    page: z.string().regex(/^\d+$/).transform(Number).default(1),
    limit: z.string().regex(/^\d+$/).transform(Number).default(10),
    sortBy: z.string().default('createdAt'),
    sortOrder: z.enum(['asc', 'desc']).default('desc'),
  }),
});

export const InsightValidation = {
  createInsightSchema,
  updateInsightSchema,
  getAllInsightsQuerySchema,
};

