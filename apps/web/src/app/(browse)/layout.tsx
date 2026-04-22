import { Suspense } from 'react';

import { Header } from 'src/components/layout/header/header';
import { SearchBar } from 'src/components/layout/search-bar/search-bar';

import styles from './browse-layout.module.scss';
import { CatalogFilters } from 'src/features/filters/components/CatalogFilters/CatalogFilters';
import { Loader } from 'src/features/ui/Loader';
import { SearchContextProvider } from 'src/features/search';
import { FilterButton } from '@features/filters/components/CatalogFilters/FilterButton';

/** Каталог, карточки книги и библиотеки: общий шапка + поиск. */
export default function BrowseLayout({ children }: { children: React.ReactNode }) {
  return (
    <SearchContextProvider>
      <div className={styles.root}>
        <Header />
        <div>
          <FilterButton/>
          <Suspense fallback={<Loader />}>
            <SearchBar />
          </Suspense>
        </div>
        <CatalogFilters />
        <div className={styles.main}>{children}</div>
      </div>
    </SearchContextProvider>
  );
}
