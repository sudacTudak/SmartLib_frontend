'use client';

import { Flex, Input } from 'antd';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect } from 'react';
import { useSearchContext } from 'src/global/globalSearch';

import styles from './SearchBar.module.scss';

export function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { searchValue, setSearchValue } = useSearchContext();

  useEffect(() => {
    setSearchValue(searchParams.get('q') ?? '');
  }, [searchParams, setSearchValue]);

  const onSearch = useCallback(
    (value: string) => {
      const q = value.trim();
      const params = new URLSearchParams();
      if (q) params.set('q', q);
      const suffix = params.toString() ? `?${params.toString()}` : '';
      router.push(`/catalog${suffix}`);
    },
    [router],
  );

  return (
    <Flex className={styles.searchBar}>
      <Input.Search
        placeholder="Название, автор, ISBN…"
        allowClear
        enterButton="Найти"
        size="large"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        onSearch={onSearch}
        aria-label="Поиск по каталогу"
        className={styles.input}
      />
    </Flex>
  );
}
