'use client'

import { createContext, ReactNode, useContext, useMemo, useState } from 'react';
import {EXTENDED_WORK_CATALOG_CATEGORIES_DICT, TExtendedWorkCatalogCategoryValue} from '@features/catalog/model'

interface ISearchContextValue {
  searchValue: string;
  isFiltersOpen: boolean;
  workCategory: TExtendedWorkCatalogCategoryValue
  setIsFiltersOpen: (newValue: boolean) => void;
  setSearchValue: (newValue: string) => void;
  setWorkCategory: (newValue: TExtendedWorkCatalogCategoryValue) => void;
}

const defaultContextValue: Pick<
  ISearchContextValue,
  'searchValue' | 'isFiltersOpen' | 'workCategory'
> = {
  searchValue: '',
  isFiltersOpen: false,
  workCategory: EXTENDED_WORK_CATALOG_CATEGORIES_DICT.Newest,
};

export const SearchContext = createContext<ISearchContextValue | null>(null);

export function SearchContextProvider({ children }: { children: ReactNode }) {
  const [searchValue, setSearchValue] = useState(defaultContextValue.searchValue);
  const [isFiltersOpen, setIsFiltersOpen] = useState(defaultContextValue.isFiltersOpen);
  const [workCategory, setWorkCategory] = useState(defaultContextValue.workCategory);

  const value: ISearchContextValue = useMemo(
    () =>
      ({
        searchValue,
        setSearchValue,
        isFiltersOpen,
        setIsFiltersOpen,
        workCategory,
        setWorkCategory
      }) as ISearchContextValue,
    [searchValue, setSearchValue, isFiltersOpen, setIsFiltersOpen, workCategory, setWorkCategory],
  );

  return <SearchContext.Provider value={value}>{children}</SearchContext.Provider>;
}

export function useSearchContext() {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearchContext должен вызываться внутри SearchContextProvider');
  }
  return context;
}
