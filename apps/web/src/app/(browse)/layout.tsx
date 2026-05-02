import { Header } from 'src/widgets/layout/Header';

import styles from './browse-layout.module.scss';
import { CatalogFilters } from '../../page-components/catalog/CatalogFilters/CatalogFilters';
import { SearchContextProvider } from 'src/global/globalSearch';
import { FilterButton } from '../../page-components/catalog/CatalogFilters/FilterButton';

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
