import { ConfigProvider, theme } from 'antd';
import type { ReactNode } from 'react';

export function SmartLibConfigProvider({ children }: { children: ReactNode }) {
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.defaultAlgorithm,
        token: { colorPrimary: '#1677ff' },
      }}
    >
      {children}
    </ConfigProvider>
  );
}
