// src/features/contact/contact.route.ts
import express from 'express';
import { ContactController } from './contact.controller';
import { ContactValidation } from './contact.validation';
import { USER_ROLE } from '../../shared/enums/user';
import auth from '../../shared/middlewares/auth';
import validateRequest from '../../shared/middlewares/validateRequest';

const router = express.Router();

// Get contact information (Public)
router.get(
  '/',
  ContactController.getContactInfo
);

// Update contact information (Admin only)
router.patch(
  '/',
  auth(USER_ROLE.ADMIN),
  validateRequest(ContactValidation.updateContactInfoSchema),
  ContactController.updateContactInfo
);

export const contactRoutes = router;

