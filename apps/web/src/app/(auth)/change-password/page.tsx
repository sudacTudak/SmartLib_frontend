'use client';

import {
  SmartlibPasswordForm,
  SmartlibPasswordFormVariant,
} from '@shared-packages/components/auth';
import authFormStyles from '@shared-packages/components/auth/auth-forms.module.scss';
import { message, Spin } from 'antd';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { getAuthSession } from 'src/lib/api';
import { AuthStatus } from 'src/lib/auth/enums';
import { useAuth } from 'src/lib/auth/auth-context';

import styles from './change-password-page.module.scss';

export default function ChangePasswordPage() {
  const router = useRouter();
  const { user, status } = useAuth();

  useEffect(() => {
    if (status === AuthStatus.Ready && !user) {
      router.replace('/reset-password');
    }
  }, [status, user, router]);

  if (status === AuthStatus.Loading || status === AuthStatus.Idle) {
    return (
      <div className={styles.loading}>
        <Spin size="large" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <SmartlibPasswordForm
      variant={SmartlibPasswordFormVariant.Change}
      headerLeft={
        <button type="button" className={authFormStyles.homeLink} onClick={() => router.back()}>
          Назад
        </button>
      }
      onSubmit={async (values) => {
        await getAuthSession().changePassword(user.id, {
          password: values.password,
          newPassword: values.newPassword,
          newPasswordRepeat: values.newPasswordRepeat,
        });
        message.success('Пароль изменён');
        router.push('/profile');
      }}
    />
  );
}
