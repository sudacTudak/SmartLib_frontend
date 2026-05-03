'use client'

import { usePathname } from 'next/navigation';
import { Header } from '../Header';
import { CatalogFiltersButton } from 'src/page-components/catalog/CatalogFilters';
import { CategoriesTabs } from 'src/page-components/catalog/CategoriesTabs';
import { APP_ROUTES } from 'src/global/routes';

import styles from './HeaderPanel.module.scss';

export function HeaderPanel() {
  const pathname = usePathname();
  const shouldShowFilterButton = pathname.includes(APP_ROUTES.catalog);

  return (
    <div className={styles.headerPanel}>
      <Header />
      <div className={styles.filtersPanel}>
        {shouldShowFilterButton && (
          <div className={styles.filtersBtnContainer}>
            <CatalogFiltersButton />
          </div>
        )}
        <div className={styles.categoriesTabsContainer}>
          <CategoriesTabs />
        </div>
      </div>
    </div>
  );
}
