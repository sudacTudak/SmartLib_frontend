'use client';

import { Button, Flex, Layout, Typography } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { SearchBar } from '../search/SearchBar';
import { Loader } from 'src/shared/ui/components/Loader';
import { Suspense } from 'react';

import styles from './Header.module.scss';
import { ProfileIcon } from '@shared-packages/ui/icons';
import { APP_ROUTES } from 'src/global/routes';
import { useAuth } from 'src/global/auth';
import { AuthStatus } from 'src/global/auth/enums';
import Image from 'next/image';

const { Header: AntHeader } = Layout;
const { Text } = Typography;

export function Header() {
  const router = useRouter();
  const { user, status } = useAuth();

  const showUser = user && status === AuthStatus.Ready;

  return (
    <AntHeader className={styles.header}>
      <Link href="/" className={styles.logo}>
        <Image
          className={styles.logoImage}
          src="/smartlib-logo-430-80.png"
          alt="Онлайн-библиотека SmartLib"
          width={430}
          height={80}
          priority
          unoptimized
        />
      </Link>

      <nav aria-label="Основное меню" className={styles.nav}>
        <Button type="link" onClick={() => router.push('/catalog')}>
          Каталог
        </Button>
      </nav>

      <Flex className={styles.searchBar}>
        <Suspense fallback={<Loader />}>
          <SearchBar />
        </Suspense>
      </Flex>

      <Link href={showUser ? APP_ROUTES.profile : APP_ROUTES.auth.login} className={styles.profileLink}>
        <Flex vertical align="center" gap={2} className={styles.profileLinkInner}>
          <ProfileIcon />
          <Text>{showUser ? user.email : 'Войти'}</Text>
        </Flex>
      </Link>
    </AntHeader>
  );
}
