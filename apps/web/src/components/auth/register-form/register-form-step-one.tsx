'use client';

import { FormErrorBanner } from '@shared-packages/components/auth';
import { Button, Form, Input } from 'antd';

import { PASSWORD_HINT, passwordRules } from './register-form-rules';
import type { RegisterFormStepProps } from './register-form-step-props';

import styles from '@shared-packages/components/auth/auth-forms.module.scss';

export function RegisterFormStepOne({ submitError, onGoNext }: RegisterFormStepProps) {
  return (
    <div className={styles.step}>
      <Form.Item
        label="Email"
        name="email"
        preserve
        rules={[
          { required: true, message: 'Введите email' },
          { type: 'email', message: 'Некорректный email' },
        ]}
      >
        <Input autoComplete="email" placeholder="you@example.com" size="large" />
      </Form.Item>

      <Form.Item
        label="Пароль"
        name="password"
        preserve
        extra={PASSWORD_HINT}
        rules={passwordRules()}
        hasFeedback
      >
        <Input.Password autoComplete="new-password" placeholder="Пароль" size="large" />
      </Form.Item>

      <Form.Item
        label="Повторение пароля"
        name="confirm"
        preserve
        dependencies={['password']}
        rules={[
          { required: true, message: 'Повторите пароль' },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('Пароли не совпадают'));
            },
          }),
        ]}
        hasFeedback
      >
        <Input.Password autoComplete="new-password" placeholder="Ещё раз" size="large" />
      </Form.Item>

      <FormErrorBanner message={submitError} />

      <Form.Item className={styles.actions}>
        <Button type="primary" block size="large" onClick={onGoNext}>
          Далее
        </Button>
      </Form.Item>
    </div>
  );
}
