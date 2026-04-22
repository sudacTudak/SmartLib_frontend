'use client';

import {
  SmartlibPasswordForm,
  SmartlibPasswordFormVariant,
  type SmartlibPasswordFormValues,
} from '@shared-packages/components/auth';
import authFormStyles from '@shared-packages/components/auth/auth-forms.module.scss';
import { message, Spin } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect } from 'react';

import { getAuthSession } from 'src/lib/api';
import { AuthStatus } from 'src/lib/auth/enums';
import { useAuth } from 'src/lib/auth/auth-context';

import styles from './reset-password-page.module.scss';

export default function ResetPasswordPage() {
  const router = useRouter();
  const { user, status } = useAuth();

  useEffect(() => {
    if (status === AuthStatus.Ready && user) {
      router.replace('/change-password');
    }
  }, [status, user, router]);

  const handleSubmit = useCallback(async (values: SmartlibPasswordFormValues) => {
    await getAuthSession().resetPassword({
      email: values.email!.trim(),
      password: values.password,
      newPassword: values.newPassword,
      newPasswordRepeat: values.newPasswordRepeat,
    });
    message.success('Пароль обновлён');
    router.push('/login');
  }, [router]);

  if (status === AuthStatus.Loading || status === AuthStatus.Idle) {
    return (
      <div className={styles.loading}>
        <Spin size="large" />
      </div>
    );
  }

  if (user) {
    return null;
  }

  return (
    <SmartlibPasswordForm
      variant={SmartlibPasswordFormVariant.Reset}
      headerLeft={
        <Link href="/" className={authFormStyles.homeLink}>
          На главную
        </Link>
      }
      onSubmit={handleSubmit}
      footer={
        <p className={authFormStyles.footer}>
          <Link href="/login">Назад ко входу</Link>
        </p>
      }
    />
  );
}
