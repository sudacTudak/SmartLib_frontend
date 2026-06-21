'use client';

import { SmartLibConfigProvider } from '@shared-packages/ui';
import { App } from 'antd';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { ReactNode } from 'react';
import { useState } from 'react';

import { AuthProvider } from 'src/global/auth/AuthContext';

import styles from './layout.module.scss';

export function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 30_000,
            refetchOnWindowFocus: false,
          },
        },
      }),
  );

  return (
    <SmartLibConfigProvider>
      <App className={styles.app}>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>{children}</AuthProvider>
        </QueryClientProvider>
      </App>
    </SmartLibConfigProvider>
  );
}
