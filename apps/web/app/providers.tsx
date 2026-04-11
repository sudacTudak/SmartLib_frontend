'use client';

import { SmartLibConfigProvider } from '@smartlib/ui';
import type { ReactNode } from 'react';

export function Providers({ children }: { children: ReactNode }) {
  return <SmartLibConfigProvider>{children}</SmartLibConfigProvider>;
}
