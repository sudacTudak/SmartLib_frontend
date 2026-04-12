'use client';

import { SmartLibConfigProvider } from '@shared-packages/ui';
import type { ReactNode } from 'react';

import { AuthProvider } from 'src/lib/auth/auth-context';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <SmartLibConfigProvider>
      <AuthProvider>{children}</AuthProvider>
    </SmartLibConfigProvider>
  );
}
