'use client';

import { Button, Layout, Space, theme, Typography } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { AuthStatus } from 'src/lib/auth/enums';
import { useAuth } from 'src/lib/auth/auth-context';

const { Header: AntHeader } = Layout;

function formatDisplayName(user: {
  email: string;
  first_name: string;
  last_name: string;
}): string {
  const name = [user.last_name, user.first_name].filter(Boolean).join(' ');
  return name || user.email;
}

export function Header() {
  const { token } = theme.useToken();
  const router = useRouter();
  const { user, status } = useAuth();

  const showUser = user && status === AuthStatus.Ready;

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
        {showUser ? (
          <>
            <Typography.Text type="secondary">{formatDisplayName(user)}</Typography.Text>
            <Button type="primary" onClick={() => router.push('/profile')}>
              Профиль
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
