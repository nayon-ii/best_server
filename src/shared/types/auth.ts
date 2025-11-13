export type IVerifyEmail = {
  email: string;
  oneTimeCode: number;
};

export type ILoginData = {
  email: string;
  password: string;
};

export type IAuthResetPassword = {
  email?: string;
  newPassword: string;
  confirmPassword: string;
};

export type IChangePassword = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};
