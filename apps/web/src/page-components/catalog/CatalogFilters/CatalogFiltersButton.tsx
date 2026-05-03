'use client';

import { IconButton } from '@shared-packages/ui/buttons';
import { memo, useCallback } from 'react';
import { useSearchContext } from 'src/global/globalSearch';
import { CatalogFilters } from './CatalogFilters';
import { FilterOutlined } from '@ant-design/icons';

export const CatalogFiltersButton = memo(function CatalogFiltersButton() {
  const { isFiltersOpen, setIsFiltersOpen } = useSearchContext();

  const handleClick = useCallback(() => {
    setIsFiltersOpen(!isFiltersOpen);
  }, [isFiltersOpen, setIsFiltersOpen]);

  return (
    <>
      <IconButton sideSize={32} rounded icon={<FilterOutlined width={24} height={24}/>} onClick={handleClick} />
      <CatalogFilters />
    </>
  );
});
