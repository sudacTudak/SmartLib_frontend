'use client'

import { createContext, ReactNode, useContext, useMemo, useState } from 'react';
import { SearchItemsType } from './enums';

interface ISearchContextValue {
  searchValue: string;
  isFiltersOpen: boolean;
  itemsType: SearchItemsType;
  setIsFiltersOpen: (newValue: boolean) => void;
  setSearchValue: (newValue: string) => void;
  setItemsType: (newValue: SearchItemsType) => void;
}

const defaultContextValue: Pick<
  ISearchContextValue,
  'searchValue' | 'isFiltersOpen' | 'itemsType'
> = {
  searchValue: '',
  isFiltersOpen: false,
  itemsType: SearchItemsType.Books,
};

export const SearchContext = createContext<ISearchContextValue | null>(null);

export function SearchContextProvider({ children }: { children: ReactNode }) {
  const [searchValue, setSearchValue] = useState(defaultContextValue.searchValue);
  const [itemsType, setItemsType] = useState<SearchItemsType>(defaultContextValue.itemsType);
  const [isFiltersOpen, setIsFiltersOpen] = useState(defaultContextValue.isFiltersOpen);

  const value: ISearchContextValue = useMemo(
    () =>
      ({
        searchValue,
        setSearchValue,
        isFiltersOpen,
        setIsFiltersOpen,
        itemsType,
        setItemsType,
      }) as ISearchContextValue,
    [searchValue, setSearchValue, itemsType, setItemsType, isFiltersOpen, setIsFiltersOpen],
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
