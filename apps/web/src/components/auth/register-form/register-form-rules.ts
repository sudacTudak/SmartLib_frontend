export const PASSWORD_HINT =
  'Латинские буквы и цифры, минимум 6 символов, хотя бы одна заглавная буква и одна цифра.';

export function passwordRules() {
  return [
    { required: true, message: 'Введите пароль' },
    {
      pattern: /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/,
      message: 'Пароль не соответствует требованиям',
    },
  ];
}
