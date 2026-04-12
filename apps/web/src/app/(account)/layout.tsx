import { Header } from 'src/components/layout/header/header';

import styles from './account-layout.module.scss';

/** Личный кабинет: только общая шапка, без строки поиска каталога. */
export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.root}>
      <Header />
      <main className={styles.main}>{children}</main>
    </div>
  );
}
