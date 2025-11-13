// src/features/contact/contact.validation.ts
import { z } from 'zod';

const addressSchema = z.object({
  line1: z.string().trim().min(1, 'Address line 1 is required'),
  line2: z.string().trim().optional(),
  line3: z.string().trim().optional(),
});

const socialMediaSchema = z.object({
  facebook: z.string().trim().min(1, 'Facebook URL is required'),
  twitter: z.string().trim().min(1, 'Twitter URL is required'),
  linkedin: z.string().trim().min(1, 'LinkedIn URL is required'),
});

const updateContactInfoSchema = z.object({
  body: z.object({
    email: z.string().trim().email('Invalid email address'),
    phone: z.string().trim().min(1, 'Phone is required'),
    address: addressSchema,
    socialMedia: socialMediaSchema,
  }),
});

export const ContactValidation = {
  updateContactInfoSchema,
};

