'use client';

import { Layout } from 'antd';
import Link from 'next/link';

import { SearchBar } from '../search/SearchBar';
import { Loader } from 'src/shared/ui/components/Loader';
import { memo, Suspense } from 'react';

import styles from './Header.module.scss';
import { APP_ROUTES } from 'src/global/routes';
import Image from 'next/image';
import { LinkButton } from 'src/shared/ui/components/LinkButton';
import { HeaderVariant } from '@widgets/layout/Header/enums';
import { useAuthContext } from '@global/auth';
import { UserStatusDropdown, ActionsBar } from './components';

const { Header: AntHeader } = Layout;
const MemoizedActionsBar = memo(ActionsBar);
const MemoizedUserStatusDropdown = memo(UserStatusDropdown);

interface IHeaderProps {
  variant: HeaderVariant;
}

export function Header({ variant }: IHeaderProps) {
  const { user, logoutLocal } = useAuthContext();

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
          <LinkButton activatable href={APP_ROUTES.library.index}>
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

      {variant === HeaderVariant.Full && <MemoizedActionsBar />}
      {variant === HeaderVariant.Short && user && (
        <MemoizedUserStatusDropdown userName={user.email ?? ''} logout={logoutLocal} />
      )}
    </AntHeader>
  );
}
