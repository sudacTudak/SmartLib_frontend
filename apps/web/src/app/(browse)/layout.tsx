import { Suspense } from 'react';

import { Header } from 'src/components/layout/Header';
import { SearchBar } from '../../components/layout/search/SearchBar';

import styles from './browse-layout.module.scss';
import { CatalogFilters } from './_components/filters/CatalogFilters';
import { Loader } from 'src/features/ui/Loader';
import { SearchContextProvider } from 'src/features/search';
import { FilterButton } from './_components/filters/FilterButton';

/** Каталог, карточки книги и библиотеки: общий шапка + поиск. */
export default function BrowseLayout({ children }: { children: React.ReactNode }) {
  return (
    <SearchContextProvider>
      <div className={styles.root}>
        <Header />
        <div>
          <FilterButton />

        </div>
        <CatalogFilters />
        <div className={styles.main}>{children}</div>
      </div>
    </SearchContextProvider>
  );
}
