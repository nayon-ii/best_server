// backend_server\src\features\auth\auth.route.ts
import express from 'express';
import { AuthController } from './auth.controller';
import { AuthValidation } from './auth.validation';
import { USER_ROLE } from '../../shared/enums/user';
import auth from '../../shared/middlewares/auth';
import validateRequest from '../../shared/middlewares/validateRequest';
const router = express.Router();

router.post(
  '/sign-in',
  validateRequest(AuthValidation.createLoginZodSchema),
  AuthController.loginUser,
);

router.post('/refresh-token', AuthController.newAccessToken);

router.post(
  '/forgot-password',
  validateRequest(AuthValidation.createForgetPasswordZodSchema),
  AuthController.forgetPassword,
);

router.post(
  '/verify-email',
  validateRequest(AuthValidation.createVerifyEmailZodSchema),
  AuthController.verifyEmail,
);

router.post('/resend-otp', AuthController.resendVerificationEmail);

router.post(
  '/password-reset',
  validateRequest(AuthValidation.createResetPasswordZodSchema),
  AuthController.resetPassword,
);

router.post(
  '/change-password',
  auth(USER_ROLE.ADMIN, USER_ROLE.USER),
  validateRequest(AuthValidation.createChangePasswordZodSchema),
  AuthController.changePassword,
);

export const AuthRoutes = router;
