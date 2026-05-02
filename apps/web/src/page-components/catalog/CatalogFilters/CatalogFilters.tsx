'use client';

import { CatalogFiltersSidePage } from './CatalogFiltersSidePage';
import { useSearchContext } from 'src/global/globalSearch';

export function CatalogFilters() {
  const { isFiltersOpen, setIsFiltersOpen } = useSearchContext();

  return (
    <aside aria-label="Фильтры каталога">
      <CatalogFiltersSidePage isOpen={isFiltersOpen} setIsOpen={setIsFiltersOpen} />
    </aside>
  );
}
