import type { Metadata } from 'next';
import '@shared-packages/styles/smartlib-root.css';
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
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
