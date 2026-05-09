'use client';

import { ConfigProvider, Flex, Input, ThemeConfig } from 'antd';
import { useCallback, useMemo } from 'react';
import { useSearchContext } from 'src/global/globalSearch';

import styles from './SearchBar.module.scss';
import { SearchOutlined } from '@ant-design/icons';

export function SearchBar() {
  const { searchValue, setSearchValue, submitSearch } = useSearchContext();

  const onSearch = useCallback(
    (value: string) => {
      submitSearch(value);
    },
    [submitSearch],
  );

  const themeConfig = useMemo(
    () =>
      ({
        components: {
          Input: {
            paddingBlockLG: 4,
            paddingInlineLg: 8,
          },
          Button: {
            controlHeightLg: 32,
          },
        },
      }) as ThemeConfig,
    [],
  );

  return (
    <ConfigProvider theme={themeConfig}>
      <Flex className={styles.searchBar}>
        <Input.Search
          placeholder="Название, автор, ISBN…"
          allowClear
          enterButton={<SearchOutlined style={{ fontSize: 20, width: 24, height: 24 }} />}
          size="large"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onSearch={onSearch}
          aria-label="Поиск по каталогу"
          className={styles.input}
        />
      </Flex>
    </ConfigProvider>
  );
}
