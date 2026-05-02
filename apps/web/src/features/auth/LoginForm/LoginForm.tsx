'use client';

import { SmartlibLoginForm } from '@shared-packages/components/auth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { getAuthSession } from '@global/api';
import { useAuth } from '@global/auth/auth-context';

import styles from '@shared-packages/components/auth/auth-forms.module.scss';

export function LoginForm() {
  const router = useRouter();
  const { refreshUser } = useAuth();

  return (
    <SmartlibLoginForm
      headerLeft={
        <Link href="/" className={styles.homeLink}>
          На главную
        </Link>
      }
      onSubmit={async (values) => {
        await getAuthSession().login(values);
        await refreshUser();
        router.push('/profile');
      }}
      footer={
        <p className={styles.footer}>
          <Link href="/register">Регистрация</Link>
          {' · '}
          <Link href="/reset-password">Забыли пароль?</Link>
        </p>
      }
    />
  );
}
