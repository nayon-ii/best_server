// src/features/attorneys/attorney.validation.ts
import { z } from 'zod';
import { STATUS, USER_ROLE } from '../../shared/enums/user';

const locationSchema = z.object({
  line1: z.string().trim().min(1, 'Address line 1 is required'),
  line2: z.string().trim().optional(),
  line3: z.string().trim().optional(),
});

const socialLinksSchema = z.object({
  facebook: z.string().trim().url('Invalid URL').optional().or(z.literal('')),
  twitter: z.string().trim().url('Invalid URL').optional().or(z.literal('')),
  linkedin: z.string().trim().url('Invalid URL').optional().or(z.literal('')),
});

const createAttorneySchema = z.object({
  body: z.object({
    name: z
      .string()
      .trim()
      .min(2, 'Name must be at least 2 characters')
      .max(100, 'Name cannot exceed 100 characters'),
    email: z.string().trim().email('Invalid email address'),
    phone: z.string().trim().min(1, 'Phone is required'),
    designation: z.string().trim().min(1, 'Designation is required'),
    location: locationSchema,
    biography: z
      .string()
      .trim()
      .min(2, 'Biography must be at least 2 characters'),
  
    education: z.array(z.string().trim()).default([]),
    barAdmission: z.array(z.string().trim()).default([]),
    professionalMemberships: z.array(z.string().trim()).default([]),
    socialLinks: socialLinksSchema.optional(),
    status: z.nativeEnum(STATUS).optional(),
  }),
});

const updateAttorneySchema = z.object({
  body: z.object({
    name: z
      .string()
      .trim()
      .min(2, 'Name must be at least 2 characters')
      .max(100, 'Name cannot exceed 100 characters')
      .optional(),
    email: z.string().trim().email('Invalid email address').optional(),
    phone: z.string().trim().min(1, 'Phone is required').optional(),
    designation: z.string().trim().min(1, 'Designation is required').optional(),
    location: locationSchema.optional(),
    biography: z
      .string()
      .trim()
      .min(2, 'Biography must be at least 2 characters')
      .optional(),
    education: z.array(z.string().trim()).optional(),
    barAdmission: z.array(z.string().trim()).optional(),
    professionalMemberships: z.array(z.string().trim()).optional(),
    socialLinks: socialLinksSchema.optional(),
    status: z.nativeEnum(STATUS).optional(),
  }),
});

const getAllAttorneysQuerySchema = z.object({
  query: z.object({
    searchTerm: z.string().trim().optional(),
    status: z.nativeEnum(STATUS).optional(),
    role: z.nativeEnum(USER_ROLE).optional(),
    designation: z.string().trim().optional(),
    startDate: z.string().datetime().optional(),
    endDate: z.string().datetime().optional(),
    page: z.string().regex(/^\d+$/).transform(Number).default(1),
    limit: z.string().regex(/^\d+$/).transform(Number).default(10),
    sortBy: z.string().default("createdAt"),
    sortOrder: z.enum(["asc", "desc"]).default("desc"),
  }),
});

export const AttorneyValidation = {
  createAttorneySchema,
  updateAttorneySchema,
  getAllAttorneysQuerySchema,
};

