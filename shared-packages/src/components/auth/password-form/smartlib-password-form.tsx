'use client';

import { Button, Form, Input, Typography } from 'antd';
import type { Rule } from 'antd/es/form';
import type { ReactNode } from 'react';
import { useState } from 'react';

import { FormErrorBanner } from '../form-error-banner/form-error-banner';
import { defaultResolveSubmitError } from '../submit-error';
import styles from '../auth-forms.module.scss';

import { DEFAULT_PASSWORD_HINT, defaultNewPasswordRules } from './password-rules';
import { SmartlibPasswordFormVariant } from './smartlib-password-form-variant';

export type SmartlibPasswordFormValues = {
  email?: string;
  password: string;
  newPassword: string;
  newPasswordRepeat: string;
};

export type SmartlibPasswordFormProps = {
  /** Смена пароля (без email) или сброс (с email). */
  variant: SmartlibPasswordFormVariant;
  /** Вызывается после успешной валидации полей. */
  onSubmit: (values: SmartlibPasswordFormValues) => Promise<void>;
  title?: string;
  submitButtonText?: string;
  headerLeft?: ReactNode;
  /** Правый блок шапки (например счётчик шага); можно оставить пустым. */
  headerRight?: ReactNode;
  footer?: ReactNode;
  newPasswordRules?: Rule[];
  passwordHint?: string;
};

export function SmartlibPasswordForm({
  variant,
  onSubmit,
  title,
  submitButtonText,
  headerLeft,
  headerRight,
  footer,
  newPasswordRules = defaultNewPasswordRules(),
  passwordHint = DEFAULT_PASSWORD_HINT,
}: SmartlibPasswordFormProps) {
  const [form] = Form.useForm<SmartlibPasswordFormValues>();
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const clearSubmitError = () => setSubmitError(null);

  const resolvedTitle =
    title ??
    (variant === SmartlibPasswordFormVariant.Change ? 'Смена пароля' : 'Сброс пароля');
  const resolvedSubmit =
    submitButtonText ??
    (variant === SmartlibPasswordFormVariant.Change ? 'Сменить пароль' : 'Установить новый пароль');

  const handleFinish = async (values: SmartlibPasswordFormValues) => {
    setSubmitting(true);
    setSubmitError(null);
    try {
      await onSubmit(values);
    } catch (e) {
      setSubmitError(defaultResolveSubmitError(e));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.root}>
      <div className={styles.headerRow}>
        <div className={styles.headerLeft}>{headerLeft}</div>
        <Typography.Title level={3} className={styles.headerTitle}>
          {resolvedTitle}
        </Typography.Title>
        <div className={styles.headerRight}>{headerRight}</div>
      </div>

      <div onFocusCapture={clearSubmitError}>
        <Form<SmartlibPasswordFormValues>
          form={form}
          layout="vertical"
          requiredMark={false}
          validateTrigger="onBlur"
          onFinish={handleFinish}
        >
          {variant === SmartlibPasswordFormVariant.Reset && (
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: 'Введите email' },
                { type: 'email', message: 'Некорректный email' },
              ]}
            >
              <Input autoComplete="email" placeholder="you@example.com" size="large" />
            </Form.Item>
          )}

          <Form.Item
            label="Текущий пароль"
            name="password"
            preserve
            rules={[{ required: true, message: 'Введите текущий пароль' }]}
          >
            <Input.Password autoComplete="current-password" placeholder="Текущий пароль" size="large" />
          </Form.Item>

          <Form.Item label="Новый пароль" name="newPassword" preserve extra={passwordHint} rules={newPasswordRules}>
            <Input.Password autoComplete="new-password" placeholder="Новый пароль" size="large" />
          </Form.Item>

          <Form.Item
            label="Повторите новый пароль"
            name="newPasswordRepeat"
            preserve
            dependencies={['newPassword']}
            rules={[
              { required: true, message: 'Повторите новый пароль' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('newPassword') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Новый пароль и повтор не совпадают'));
                },
              }),
            ]}
          >
            <Input.Password autoComplete="new-password" placeholder="Повторите новый пароль" size="large" />
          </Form.Item>

          <FormErrorBanner message={submitError} />

          <Form.Item className={styles.actions}>
            <Button type="primary" htmlType="submit" block size="large" loading={submitting}>
              {resolvedSubmit}
            </Button>
          </Form.Item>
        </Form>
      </div>

      {footer}
    </div>
  );
}
