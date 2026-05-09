'use client';

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import {
  EXTENDED_WORK_CATALOG_CATEGORIES_DICT,
  TExtendedWorkCatalogCategoryValue,
} from '@features/catalog/model';
import { APP_ROUTES } from '@global/routes';
import {
  buildCatalogSearchParams,
  CATALOG_SEARCH_QUERY_PARAM,
  DEFAULT_CATALOG_FILTERS_STATE,
  ICatalogFiltersFormState,
  normalizeCatalogFiltersFormState,
  parseCatalogFiltersFromSearchParams,
  parseCatalogTabFromSearchParams,
} from './catalogFiltersQuery';

interface ISearchContextValue {
  searchValue: string;
  isFiltersOpen: boolean;
  workCategory: TExtendedWorkCatalogCategoryValue;
  catalogFilters: ICatalogFiltersFormState;
  setIsFiltersOpen: (newValue: boolean) => void;
  setSearchValue: (newValue: string) => void;
  setWorkCategory: (newValue: TExtendedWorkCatalogCategoryValue) => void;
  /** Поиск с «чистого листа»: сбрасывает вкладку и фильтры в стейте и в URL. */
  submitSearch: (query: string) => void;
  /** Сабмит фильтров: сохраняет поиск и вкладку, обновляет фильтры в стейте и query. */
  applyCatalogFilters: (data: Partial<ICatalogFiltersFormState>) => void;
  /** Сброс фильтров в стейте и в URL; поиск и вкладка без изменений. */
  resetCatalogFilters: () => void;
}

const defaultCategory = EXTENDED_WORK_CATALOG_CATEGORIES_DICT.Newest;

const defaultContextValue: Pick<
  ISearchContextValue,
  'searchValue' | 'isFiltersOpen' | 'workCategory' | 'catalogFilters'
> = {
  searchValue: '',
  isFiltersOpen: false,
  workCategory: defaultCategory,
  catalogFilters: DEFAULT_CATALOG_FILTERS_STATE,
};

export const SearchContext = createContext<ISearchContextValue | null>(null);

function catalogUrlFromParams(params: URLSearchParams): string {
  const qs = params.toString();
  return qs ? `${APP_ROUTES.catalog}?${qs}` : APP_ROUTES.catalog;
}

export function SearchContextProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [searchValue, setSearchValue] = useState(defaultContextValue.searchValue);
  const [isFiltersOpen, setIsFiltersOpen] = useState(defaultContextValue.isFiltersOpen);
  const [workCategory, setWorkCategoryState] = useState(defaultContextValue.workCategory);
  const [catalogFilters, setCatalogFiltersState] = useState(defaultContextValue.catalogFilters);

  const searchParamsKey = searchParams.toString();

  useEffect(() => {
    if (pathname !== APP_ROUTES.catalog) return;

    const params = new URLSearchParams(searchParamsKey);
    setSearchValue(params.get(CATALOG_SEARCH_QUERY_PARAM) ?? '');
    setWorkCategoryState(parseCatalogTabFromSearchParams(params, defaultCategory));
    setCatalogFiltersState(parseCatalogFiltersFromSearchParams(params));
  }, [pathname, searchParamsKey]);

  const setWorkCategory = useCallback(
    (newCategory: TExtendedWorkCatalogCategoryValue) => {
      setWorkCategoryState(newCategory);
      const params = buildCatalogSearchParams({
        q: searchValue,
        tab: newCategory,
        filters: catalogFilters,
      });
      router.push(catalogUrlFromParams(params));
    },
    [catalogFilters, router, searchValue],
  );

  const submitSearch = useCallback(
    (query: string) => {
      const q = query.trim();
      setSearchValue(q);
      setCatalogFiltersState(DEFAULT_CATALOG_FILTERS_STATE);
      setWorkCategoryState(defaultCategory);
      const params = new URLSearchParams();
      if (q) params.set(CATALOG_SEARCH_QUERY_PARAM, q);
      router.push(catalogUrlFromParams(params));
    },
    [router],
  );

  const applyCatalogFilters = useCallback(
    (data: Partial<ICatalogFiltersFormState>) => {
      const normalized = normalizeCatalogFiltersFormState(data);
      setCatalogFiltersState(normalized);
      const params = buildCatalogSearchParams({
        q: searchValue,
        tab: workCategory,
        filters: normalized,
      });
      router.push(catalogUrlFromParams(params));
    },
    [router, searchValue, workCategory],
  );

  const resetCatalogFilters = useCallback(() => {
    setCatalogFiltersState(DEFAULT_CATALOG_FILTERS_STATE);
    const params = buildCatalogSearchParams({
      q: searchValue,
      tab: workCategory,
      filters: DEFAULT_CATALOG_FILTERS_STATE,
    });
    router.push(catalogUrlFromParams(params));
  }, [router, searchValue, workCategory]);

  const value: ISearchContextValue = useMemo(
    () => ({
      searchValue,
      setSearchValue,
      isFiltersOpen,
      setIsFiltersOpen,
      workCategory,
      setWorkCategory,
      catalogFilters,
      submitSearch,
      applyCatalogFilters,
      resetCatalogFilters,
    }),
    [
      searchValue,
      isFiltersOpen,
      workCategory,
      catalogFilters,
      setWorkCategory,
      submitSearch,
      applyCatalogFilters,
      resetCatalogFilters,
    ],
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
