'use client';

import { Layout } from 'antd';
import Link from 'next/link';

import { SearchBar } from '../search/SearchBar';
import { Loader } from 'src/shared/ui/components/Loader';
import { Suspense, useMemo } from 'react';

import styles from './Header.module.scss';
import { APP_ROUTES } from 'src/global/routes';
import { useAuth } from 'src/global/auth';
import { AuthStatus } from 'src/global/auth/enums';
import Image from 'next/image';
import { BookOutlined, UserOutlined } from '@ant-design/icons';
import { LinkButton } from 'src/shared/ui/components/LinkButton';
import {
  HeaderMenuItem,
  HeaderMenuItemType,
  HeaderSubmenuItemType,
  THeaderSubmenuItem,
} from './components/HeaderMenuItem';

const { Header: AntHeader } = Layout;

export function Header() {
  const { user, status, logoutLocal } = useAuth();

  const showUser = user && status === AuthStatus.Ready;

  const profileMenuItems = useMemo(
    () =>
      [
        { title: 'Профиль', itemType: HeaderSubmenuItemType.Link, href: APP_ROUTES.profile },
        { title: 'Выйти', itemType: HeaderSubmenuItemType.Action, onClick: logoutLocal },
      ] as THeaderSubmenuItem[],
    [logoutLocal],
  ) as THeaderSubmenuItem[];

  const booksMenuItems = useMemo(
    () => [
      { title: 'Избранное', itemType: HeaderSubmenuItemType.Link, href: APP_ROUTES.favorite },
      { title: 'Бронирования', itemType: HeaderSubmenuItemType.Link, href: APP_ROUTES.reservations },
    ],
    [],
  ) as THeaderSubmenuItem[];

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
        <HeaderMenuItem
          itemType={HeaderMenuItemType.Submenu}
          title="Мои книги"
          items={booksMenuItems}
          menuTitle='Мои книги'
          icon={<BookOutlined style={{ fontSize: 20 }} />}
        />
        {showUser ? (
          <HeaderMenuItem
            itemType={HeaderMenuItemType.Submenu}
            title={user.email}
            items={profileMenuItems}
            menuTitle={user.email}
            icon={<UserOutlined style={{ width: 20, height: 20, fontSize: 20 }} />}
          />
        ) : (
          <HeaderMenuItem
            itemType={HeaderMenuItemType.Link}
            title="Профиль"
            href={APP_ROUTES.auth.login}
            icon={<UserOutlined style={{ width: 20, height: 20, fontSize: 20 }} />}
          />
        )}
      </div>
    </AntHeader>
  );
}
