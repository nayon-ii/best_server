// src/features/attorneys/attorney.route.ts
import express from 'express';
import { AttorneyController } from './attorney.controller';
import { AttorneyValidation } from './attorney.validation';
import { USER_ROLE } from '../../shared/enums/user';
import auth from '../../shared/middlewares/auth';
import validateRequest from '../../shared/middlewares/validateRequest';
import fileUploadHandler from '../../shared/middlewares/fileUploadHandler';

const router = express.Router();

// Create attorney (Admin only)
router.post(
  "/",
  auth(USER_ROLE.ADMIN),
  fileUploadHandler({ subfolder: "attorneys", maxImagesCount: 2 }),
  validateRequest(AttorneyValidation.createAttorneySchema),
  AttorneyController.createAttorney
);

// Get all attorneys (with optional filtering, pagination)
router.get(
  '/',
  validateRequest(AttorneyValidation.getAllAttorneysQuerySchema),
  AttorneyController.getAllAttorneys
);

// Get single attorney by ID
router.get(
  '/:id',
  AttorneyController.getAttorneyById
);

// Update attorney (Admin only)
router.patch(
  "/:id",
  auth(USER_ROLE.ADMIN),
  fileUploadHandler({ subfolder: "attorneys", maxImagesCount: 2 }),
  validateRequest(AttorneyValidation.updateAttorneySchema),
  AttorneyController.updateAttorney
);

// Delete attorney (Admin only)
router.delete(
  '/:id',
  auth(USER_ROLE.ADMIN),
  AttorneyController.deleteAttorney
);

export const attorneyRoutes = router;

