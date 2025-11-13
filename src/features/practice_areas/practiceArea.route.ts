// src/features/practice_areas/practiceArea.route.ts
import express from "express";
import { PracticeAreaController } from "./practiceArea.controller";
import { PracticeAreaValidation } from "./practiceArea.validation";
import { USER_ROLE } from "../../shared/enums/user";
import auth from "../../shared/middlewares/auth";
import validateRequest from "../../shared/middlewares/validateRequest";
import fileUploadHandler from "../../shared/middlewares/fileUploadHandler";

const router = express.Router();

// Create practice area (Admin only)
router.post(
  "/",
  auth(USER_ROLE.ADMIN),
  fileUploadHandler({ subfolder: "practice", maxImagesCount: 1 }),
  validateRequest(PracticeAreaValidation.createPracticeAreaSchema),
  PracticeAreaController.createPracticeArea
);

// Get all practice areas (with optional filtering, pagination)
router.get(
  "/",
  validateRequest(PracticeAreaValidation.getAllPracticeAreasQuerySchema),
  PracticeAreaController.getAllPracticeAreas
);

// Get single practice area by ID
router.get("/:id", PracticeAreaController.getPracticeAreaById);

// Update practice area (Admin only)
router.patch(
  "/:id",
  auth(USER_ROLE.ADMIN),
  fileUploadHandler({ subfolder: "practice", maxImagesCount: 1 }),
  validateRequest(PracticeAreaValidation.updatePracticeAreaSchema),
  PracticeAreaController.updatePracticeArea
);

// Delete practice area (Admin only)
router.delete(
  "/:id",
  auth(USER_ROLE.ADMIN),
  PracticeAreaController.deletePracticeArea
);

export const practiceAreaRoutes = router;
