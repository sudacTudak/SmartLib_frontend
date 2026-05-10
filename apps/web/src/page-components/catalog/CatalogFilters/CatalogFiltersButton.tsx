'use client';

import { IconButton } from '@shared-packages/ui/buttons';
import { memo, useCallback, useMemo } from 'react';
import { DEFAULT_CATALOG_FILTERS_STATE, useSearchContext } from 'src/global/globalSearch';
import { CatalogFilters } from './CatalogFilters';
import { FilterOutlined } from '@ant-design/icons';
import { CatalogFilterName } from 'src/features/filters/configs';
import { Badge } from 'antd';
import { isEqual } from 'lodash';

export const CatalogFiltersButton = memo(function CatalogFiltersButton() {
  const { isFiltersOpen, setIsFiltersOpen, catalogFilters } = useSearchContext();

  const handleClick = useCallback(() => {
    setIsFiltersOpen(!isFiltersOpen);
  }, [isFiltersOpen, setIsFiltersOpen]);

  const appliedFiltersCount = useMemo(
    () =>
      Object.keys(catalogFilters).reduce((acc, filterName) => {
        const filterValue = catalogFilters[filterName as CatalogFilterName];
        const filterDefaultValue = DEFAULT_CATALOG_FILTERS_STATE[filterName as CatalogFilterName];

        return acc + Number(!isEqual(filterValue, filterDefaultValue));
      }, 0),
    [catalogFilters],
  );

  return (
    <>
      <Badge count={appliedFiltersCount}>
        <IconButton sideSize={32} rounded icon={<FilterOutlined width={24} height={24} />} onClick={handleClick} />
      </Badge>
      <CatalogFilters />
    </>
  );
});
