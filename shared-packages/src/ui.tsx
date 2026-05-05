import { ConfigProvider, theme } from 'antd';
import type { ReactNode } from 'react';
import { smartlibAntdTheme } from './styles/antd-theme';

export function SmartLibConfigProvider({ children }: { children: ReactNode }) {
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.defaultAlgorithm,
        ...smartlibAntdTheme,
        cssVar: { key: 'ant' },
      }}
    >
      {children}
    </ConfigProvider>
  );
}

export { smartlibAntdTheme } from './styles/antd-theme';
export { themeVars, type ThemeVars } from './styles/themeVars';
export { workCoverPlaceholder300x430Url, workCoverPlaceholder260x140Url } from './assets/placeholders';
