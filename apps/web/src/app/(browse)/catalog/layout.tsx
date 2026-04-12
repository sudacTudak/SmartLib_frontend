import { CatalogFilters } from 'src/components/catalog/catalog-filters/catalog-filters';

import styles from './catalog-layout.module.scss';

/** Каталог: панель фильтров + контент списка. */
export default function CatalogSectionLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.root}>
      <CatalogFilters />
      <div className={styles.content}>{children}</div>
    </div>
  );
}
