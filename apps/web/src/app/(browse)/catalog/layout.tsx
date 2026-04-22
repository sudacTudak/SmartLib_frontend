import { CatalogFilters } from '@features/filters/components/CatalogFilters/CatalogFilters';
import styles from './catalog-layout.module.scss';

/** Каталог: панель фильтров + контент списка. */
export default function CatalogSectionLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.root}>
      <div className={styles.content}>{children}</div>
    </div>
  );
}
