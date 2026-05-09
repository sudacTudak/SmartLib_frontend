import { Gender } from "@shared-packages/enums";

export type LoginBody = { email: string; password: string };

/** Как `RegisterUserSerializer` + `BaseAuthSerializer`. */
export type RegisterBody = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  patronymic?: string;
  gender: Gender;
};

export type LogoutBody = { refresh: string };

/** `ChangePasswordSerializer` — смена пароля авторизованным пользователем (detail). */
export type ChangePasswordBody = {
  password: string;
  newPassword: string;
  newPasswordRepeat: string;
};

/** `ResetPasswordSerializer` — сброс без авторизации. */
export type ResetPasswordBody = {
  email: string;
  password: string;
  newPassword: string;
  newPasswordRepeat: string;
};
