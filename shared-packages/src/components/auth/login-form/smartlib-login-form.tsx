'use client';

import { Button, Form, Input, Typography } from 'antd';
import type { ReactNode } from 'react';
import { useState } from 'react';

import type { LoginBody } from '../../../api/domains/auth/types';
import { FormErrorBanner } from '../form-error-banner/form-error-banner';
import { defaultResolveSubmitError } from '../submit-error';

import styles from '../auth-forms.module.scss';

export type SmartlibLoginFormProps = {
  /** Логин + навигация/обновление состояния в приложении (без привязки к Next.js). */
  onSubmit: (values: LoginBody) => Promise<void>;
  resolveSubmitError?: (error: unknown) => string;
  title?: string;
  /** Слева от заголовка (например ссылка «На главную»). */
  headerLeft?: ReactNode;
  /** Справа от заголовка (для баланса сетки можно оставить пустым). */
  headerRight?: ReactNode;
  footer?: ReactNode;
};

export function SmartlibLoginForm({
  onSubmit,
  resolveSubmitError = defaultResolveSubmitError,
  title = 'Авторизация',
  headerLeft,
  headerRight,
  footer,
}: SmartlibLoginFormProps) {
  const [form] = Form.useForm<LoginBody>();
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const clearSubmitError = () => setSubmitError(null);

  const handleFinish = async (values: LoginBody) => {
    setSubmitting(true);
    setSubmitError(null);
    try {
      await onSubmit(values);
    } catch (e) {
      setSubmitError(resolveSubmitError(e));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <div className={styles.headerRow}>
        <div className={styles.headerLeft}>{headerLeft}</div>
        <Typography.Title level={3} className={styles.headerTitle}>
          {title}
        </Typography.Title>
        <div className={styles.headerRight}>{headerRight}</div>
      </div>

      <div onFocusCapture={clearSubmitError}>
        <Form<LoginBody>
          form={form}
          layout="vertical"
          requiredMark={false}
          validateTrigger="onBlur"
          onFinish={handleFinish}
        >
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
            rules={[{ required: true, message: 'Введите пароль' }]}
          >
            <Input.Password autoComplete="current-password" placeholder="Пароль" size="large" />
          </Form.Item>

          <FormErrorBanner message={submitError} />

          <Form.Item className={styles.actions}>
            <Button type="primary" htmlType="submit" block size="large" loading={submitting}>
              Войти
            </Button>
          </Form.Item>
        </Form>
      </div>

      {footer}
    </>
  );
}
