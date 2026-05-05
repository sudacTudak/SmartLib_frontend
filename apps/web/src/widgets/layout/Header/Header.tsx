'use client';

import { Flex, Layout, Typography } from 'antd';
import Link from 'next/link';

import { SearchBar } from '../search/SearchBar';
import { Loader } from 'src/shared/ui/components/Loader';
import { Suspense } from 'react';

import styles from './Header.module.scss';
import { APP_ROUTES } from 'src/global/routes';
import { useAuth } from 'src/global/auth';
import { AuthStatus } from 'src/global/auth/enums';
import Image from 'next/image';
import { UserOutlined } from '@ant-design/icons';
import { LinkButton } from 'src/shared/ui/components/LinkButton';

const { Header: AntHeader } = Layout;
const { Text } = Typography;

export function Header() {
  const { user, status } = useAuth();

  const showUser = user && status === AuthStatus.Ready;

  return (
    <AntHeader className={styles.header}>
      <div className={styles.navBlock}>
        <div className={styles.logoContainer}>
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
        </div>

        <nav aria-label="Основное меню" className={styles.nav}>
          <LinkButton activatable href={APP_ROUTES.catalog}>
            Каталог
          </LinkButton>
          <LinkButton activatable href={APP_ROUTES.libraries}>
            Библиотеки
          </LinkButton>
        </nav>
      </div>

      <div className={styles.searchBarContainer}>
        <div className={styles.searchBar}>
          <Suspense fallback={<Loader />}>
            <SearchBar />
          </Suspense>
        </div>
      </div>

      <div className={styles.actionsBar}>
        <Link href={showUser ? APP_ROUTES.profile : APP_ROUTES.auth.login} className={styles.profileLink}>
          <Flex vertical align="center" className={styles.profileLinkInner}>
            <UserOutlined style={{ width: 20, height: 20, fontSize: 20 }} />
            <Text className={styles.userName}>{showUser ? user.email : 'Войти'}</Text>
          </Flex>
        </Link>
      </div>
    </AntHeader>
  );
}
