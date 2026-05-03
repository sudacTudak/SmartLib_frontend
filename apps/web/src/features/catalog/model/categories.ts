import { WORK_CATEGORY_MULTI_LABELS, WORK_CATEGORY_SET, WorkCategory } from '@shared-packages/enums';

export const WORK_CATALOG_CATEGORIES_DICT = {
  Newest: 'newest',
  Popular: 'popular',
} as const;

export const WORK_CATALOG_CATEGORIES_SET = new Set(Object.values(WORK_CATALOG_CATEGORIES_DICT));

export const WORK_CATALOG_CATEGORIES_LABELS = {
  [WORK_CATALOG_CATEGORIES_DICT.Newest]: 'Новые',
  [WORK_CATALOG_CATEGORIES_DICT.Popular]: 'Популярные',
} as const;

export const EXTENDED_WORK_CATALOG_CATEGORIES_DICT = {
  ...WORK_CATALOG_CATEGORIES_DICT,
  ...WorkCategory,
} as const;

type TWorkCatalogCategoryValue = (typeof WORK_CATALOG_CATEGORIES_DICT)[keyof typeof WORK_CATALOG_CATEGORIES_DICT];
export type TExtendedWorkCatalogCategoryValue =
  (typeof EXTENDED_WORK_CATALOG_CATEGORIES_DICT)[keyof typeof EXTENDED_WORK_CATALOG_CATEGORIES_DICT];

export const EXTENDED_WORK_CATEGORIES_LIST = Object.values(EXTENDED_WORK_CATALOG_CATEGORIES_DICT) as TExtendedWorkCatalogCategoryValue[];

export function getWorkCatalogCategoryLabel(category: TExtendedWorkCatalogCategoryValue) {
  if (WORK_CATEGORY_SET.has(category as WorkCategory)) {
    return WORK_CATEGORY_MULTI_LABELS[category as WorkCategory];
  }

  return WORK_CATALOG_CATEGORIES_LABELS[category as TWorkCatalogCategoryValue];
}
