// src/features/contact/contact.validation.ts
import { z } from "zod";

const addressSchema = z.object({
  line1: z.string().trim().optional(),
  line2: z.string().trim().optional(),
  line3: z.string().trim().optional(),
});

const socialMediaSchema = z.object({
  facebook: z.string().trim().optional(),
  twitter: z.string().trim().optional(),
  linkedin: z.string().trim().optional(),
});

const updateContactInfoSchema = z.object({
  body: z.object({
    email: z.string().trim().email("Invalid email address").optional(),
    phone: z.string().trim().optional(),
    address: addressSchema,
    socialMedia: socialMediaSchema,
  }),
});

export const ContactValidation = {
  updateContactInfoSchema,
};
