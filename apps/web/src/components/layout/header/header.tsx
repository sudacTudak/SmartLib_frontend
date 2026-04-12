'use client';

import { Button, Layout, Space, theme, Typography } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export type HeaderUser = {
  displayName: string;
} | null;

type HeaderProps = {
  user?: HeaderUser;
};

const { Header: AntHeader } = Layout;

export function Header({ user = null }: HeaderProps) {
  const { token } = theme.useToken();
  const router = useRouter();

  return (
    <AntHeader
      style={{
        display: 'flex',
        alignItems: 'center',
        paddingInline: token.paddingLG,
        background: token.colorBgContainer,
        borderBottom: `1px solid ${token.colorBorderSecondary}`,
        height: 'auto',
        lineHeight: 'inherit',
        gap: token.marginMD,
      }}
    >
      <Link href="/" style={{ textDecoration: 'none' }}>
        <Typography.Title level={4} style={{ margin: 0, color: token.colorPrimary }}>
          SmartLib
        </Typography.Title>
      </Link>

      <nav style={{ flex: 1 }} aria-label="Основное меню">
        <Button type="link" onClick={() => router.push('/catalog')}>
          Каталог
        </Button>
      </nav>

      <Space wrap>
        {user ? (
          <>
            <Typography.Text type="secondary">{user.displayName}</Typography.Text>
            <Button type="primary" onClick={() => router.push('/cabinet')}>
              Личный кабинет
            </Button>
          </>
        ) : (
          <>
            <Button type="default" onClick={() => router.push('/login')}>
              Войти
            </Button>
            <Button type="primary" onClick={() => router.push('/register')}>
              Регистрация
            </Button>
          </>
        )}
      </Space>
    </AntHeader>
  );
}
