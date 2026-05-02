import type { Metadata } from 'next';
import { DesignTokensRootStyle } from '@shared-packages/styles/DesignTokensRootStyle';
import '@shared-packages/styles/normalize.scss';
import { Providers } from './providers';
import './globals.scss';

export const metadata: Metadata = {
  title: 'SmartLib',
  description: 'Онлайн-библиотека',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body>
        <DesignTokensRootStyle />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
