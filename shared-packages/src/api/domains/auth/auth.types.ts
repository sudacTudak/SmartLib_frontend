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

/** Как `ChangePasswordSerializer` + `BaseAuthSerializer`. */
export type ChangePasswordBody = {
  email: string;
  password: string;
  new_password: string;
  new_password_repeat: string;
};
