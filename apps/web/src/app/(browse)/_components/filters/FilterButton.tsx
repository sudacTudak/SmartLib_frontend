'use client';

import { Button } from 'antd';
import { useCallback } from 'react';
import { useSearchContext } from 'src/features/search';

export const FilterButton = () => {
  const { isFiltersOpen, setIsFiltersOpen } = useSearchContext();

  const handleClick = useCallback(() => {
    setIsFiltersOpen(!isFiltersOpen);
  }, [isFiltersOpen, setIsFiltersOpen]);

  return <Button onClick={handleClick}>Фильтры</Button>;
};
