export type LoginBody = { email: string; password: string };

/** Как `RegisterUserSerializer` + `BaseAuthSerializer`. */
export type RegisterBody = {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  patronymic?: string;
  gender: 'male' | 'female';
};

export type LogoutBody = { refresh: string };

/** `ChangePasswordSerializer` — смена пароля авторизованным пользователем (detail). */
export type ChangePasswordBody = {
  password: string;
  new_password: string;
  new_password_repeat: string;
};

/** `ResetPasswordSerializer` — сброс без авторизации. */
export type ResetPasswordBody = {
  email: string;
  password: string;
  new_password: string;
  new_password_repeat: string;
};
