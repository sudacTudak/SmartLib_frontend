'use client';

import { Button, Flex, Layout, Space, theme, Typography } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { AuthStatus } from 'src/lib/auth/enums';
import { useAuth } from 'src/lib/auth/auth-context';
import { SearchBar } from '../search/SearchBar';
import { Loader } from 'src/features/ui/Loader';
import { Suspense, useCallback } from 'react';

import styles from './Header.module.scss';
import { IconButton } from '@shared-packages/ui/buttons';
import { ProfileIcon } from '@shared-packages/ui/icons';
import { APP_ROUTES } from 'src/lib/routes';

const { Header: AntHeader } = Layout;
const { Title, Text } = Typography;

export function Header() {
  const { token } = theme.useToken();
  const router = useRouter();
  const { user, status } = useAuth();

  const showUser = user && status === AuthStatus.Ready;

  return (
    <AntHeader className={styles.header}>
      <Link href="/" className={styles.logo}>
        <Title level={4} style={{ margin: 0, color: token.colorPrimary }}>
          SmartLib
        </Title>
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
        <Flex vertical align='center' gap={2} className={styles.profileLinkInner}>
          <ProfileIcon />
          <Text>{showUser ? user.email : 'Войти'}</Text>
        </Flex>
      </Link>
    </AntHeader>
  );
}
