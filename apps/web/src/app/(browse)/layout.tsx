import { Suspense } from 'react';

import { Header } from 'src/components/layout/header/header';
import { SearchBar } from 'src/components/layout/search-bar/search-bar';

import styles from './browse-layout.module.scss';

/** Каталог, карточки книги и библиотеки: общий шапка + поиск. */
export default function BrowseLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.root}>
      <Header />
      <Suspense fallback={<div className={styles.searchFallback} aria-hidden />}>
        <SearchBar />
      </Suspense>
      <div className={styles.main}>{children}</div>
    </div>
  );
}
