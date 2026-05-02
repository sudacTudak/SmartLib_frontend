'use client';

import { IconButton } from '@shared-packages/ui/buttons';
import { FiltersIcon } from '@shared-packages/ui/icons';
import { useCallback } from 'react';
import { useSearchContext } from 'src/global/globalSearch';

export const FilterButton = () => {
  const { isFiltersOpen, setIsFiltersOpen } = useSearchContext();

  const handleClick = useCallback(() => {
    setIsFiltersOpen(!isFiltersOpen);
  }, [isFiltersOpen, setIsFiltersOpen]);

  return <IconButton icon={<FiltersIcon width={32} height={32} />} onClick={handleClick} />;
};
