'use client';

import { Descriptions, Spin, Typography } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { FormFooterDivider } from '@shared-packages/components/form-footer-divider';

import { AuthStatus } from 'src/lib/auth/enums';
import { useAuth } from 'src/lib/auth/auth-context';

import styles from './profile-page.module.scss';

export default function ProfilePage() {
  const router = useRouter();
  const { user, status } = useAuth();

  useEffect(() => {
    if (status === AuthStatus.Ready && !user) {
      router.replace('/login');
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

  const fullName = [user.last_name, user.first_name, user.patronymic].filter(Boolean).join(' ');

  return (
    <div className={styles.root}>
      <Typography.Title level={2} className={styles.title}>
        Профиль
      </Typography.Title>
      <Descriptions bordered column={1} size="middle">
        <Descriptions.Item label="ID">{user.id}</Descriptions.Item>
        <Descriptions.Item label="Имя">{fullName || '—'}</Descriptions.Item>
        <Descriptions.Item label="Email">{user.email}</Descriptions.Item>
      </Descriptions>
      <div className={styles.footer}>
        <Link href="/change-password">Сменить пароль</Link>
        <FormFooterDivider />
        <Link href="/catalog">В каталог</Link>
      </div>
    </div>
  );
}
