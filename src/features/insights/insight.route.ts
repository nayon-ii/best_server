// src/features/insights/insight.route.ts
import express from 'express';
import { InsightController } from './insight.controller';
import { InsightValidation } from './insight.validation';
import { USER_ROLE } from '../../shared/enums/user';
import auth from '../../shared/middlewares/auth';
import validateRequest from '../../shared/middlewares/validateRequest';

const router = express.Router();

// Create insight (Admin only)
router.post(
  '/',
  auth(USER_ROLE.ADMIN),
  validateRequest(InsightValidation.createInsightSchema),
  InsightController.createInsight
);

// Get all insights (with optional filtering, pagination)
router.get(
  '/',
  validateRequest(InsightValidation.getAllInsightsQuerySchema),
  InsightController.getAllInsights
);

// Get single insight by ID
router.get(
  '/:id',
  InsightController.getInsightById
);

// Update insight (Admin only)
router.patch(
  '/:id',
  auth(USER_ROLE.ADMIN),
  validateRequest(InsightValidation.updateInsightSchema),
  InsightController.updateInsight
);

// Delete insight (Admin only)
router.delete(
  '/:id',
  auth(USER_ROLE.ADMIN),
  InsightController.deleteInsight
);

export const insightRoutes = router;

