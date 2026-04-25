'use client';

import { memo, useCallback } from 'react';
import styles from './SearchBlock.module.scss';
import { Flex } from 'antd';
import { FiltersIcon } from '@shared-packages/ui/icons';
import { useSearchContext } from 'src/features/search';
import { ActivatableIconButton } from '@shared-packages/ui/buttons/ActivatableIconButton';

export const SearchBlock = memo(function SearchBlock() {
  const { isFiltersOpen, setIsFiltersOpen } = useSearchContext();

  const handleClick = useCallback(
    () => setIsFiltersOpen(!isFiltersOpen),
    [setIsFiltersOpen, isFiltersOpen],
  );

  return (
    <Flex className={styles.searchBlock}>
      <ActivatableIconButton
        isActive={isFiltersOpen}
        onClick={handleClick}
        icon={<FiltersIcon />}
      />
    </Flex>
  );
});
