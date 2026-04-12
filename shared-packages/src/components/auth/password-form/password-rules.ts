import type { Rule } from 'antd/es/form';

export const DEFAULT_PASSWORD_HINT =
  'Латинские буквы и цифры, минимум 6 символов, хотя бы одна заглавная буква и одна цифра.';

export function defaultNewPasswordRules(): Rule[] {
  return [
    { required: true, message: 'Введите пароль' },
    {
      pattern: /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/,
      message: 'Пароль не соответствует требованиям',
    },
  ];
}
