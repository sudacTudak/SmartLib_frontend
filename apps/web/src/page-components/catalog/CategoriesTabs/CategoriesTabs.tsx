'use client';

import { ConfigProvider, Tabs, ThemeConfig } from 'antd';
import { memo, useCallback, useMemo } from 'react';
import {
  EXTENDED_WORK_CATEGORIES_LIST,
  getWorkCatalogCategoryLabel,
  TExtendedWorkCatalogCategoryValue,
} from '@features/catalog/model';
import { useSearchContext } from '@global/globalSearch';

import styles from './CategoriesTabs.module.scss';

type TTabsProps = Parameters<typeof Tabs>[0];
type TTabItem = NonNullable<TTabsProps['items']>;
type TOnChange = NonNullable<TTabsProps['onChange']>;

const items = EXTENDED_WORK_CATEGORIES_LIST.map((category) => ({
  children: null,
  label: getWorkCatalogCategoryLabel(category),
  id: category,
  key: category,
})) as TTabItem;

export const CategoriesTabs = memo(function CategoriesTabs() {
  const { workCategory, setWorkCategory } = useSearchContext();

  const handleChange: TOnChange = useCallback(
    (key) => {
      const typedKey = key as TExtendedWorkCatalogCategoryValue;
      setWorkCategory(typedKey);
    },
    [setWorkCategory],
  );

  const themeConfig = useMemo(
    () =>
      ({
        components: {
          Tabs: {
            horizontalMargin: '0px 0px 0px 0px',
            horizontalItemGutter: 0,
            horizontalItemPadding: '4px 12px',
          },
        },
      }) as ThemeConfig,
    [],
  );

  return (
    <ConfigProvider theme={themeConfig}>
      <Tabs className={styles.categoriesTabs} activeKey={workCategory} items={items} onChange={handleChange} />
    </ConfigProvider>
  );
});
