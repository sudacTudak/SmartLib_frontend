import { CatalogFilterName } from '@features/filters/configs';
import {
  CLIENT_WORK_CATEGORY_TO_BACKEND_PARAM,
  WORK_CATEGORY_SET,
  WorkCategory,
} from '@shared-packages/enums';
import {
  EXTENDED_WORK_CATALOG_CATEGORIES_DICT,
  TExtendedWorkCatalogCategoryValue,
} from '@features/catalog/model';

export const CATALOG_SEARCH_QUERY_PARAM = 'q';
/** Значения как у бэкенда (`book`, `scientific_article`, …). */
export const CATALOG_CATEGORY_QUERY_PARAM = 'category';
export const CATALOG_POPULAR_QUERY_PARAM = 'popular';

/** Значение query `category` → вкладка типа произведения (ключ enum на фронте). */
export const BACKEND_WORK_CATEGORY_FROM_URL_PARAM: Record<string, WorkCategory> = (
  Object.entries(CLIENT_WORK_CATEGORY_TO_BACKEND_PARAM) as [WorkCategory, string][]
).reduce(
  (acc, [wc, api]) => {
    acc[api] = wc;
    return acc;
  },
  {} as Record<string, WorkCategory>,
);

/** Поле фильтра из конфига → имя query-параметра (как в `WorkListQueryParams` на бэке). */
export const CATALOG_FILTER_FIELD_TO_QUERY_PARAM: Record<CatalogFilterName, string> = {
  [CatalogFilterName.Genre]: 'genres',
  [CatalogFilterName.LibraryBranch]: 'libraryBranch',
  [CatalogFilterName.Author]: 'authors',
  [CatalogFilterName.HasOnlineVersion]: 'hasOnlineVersion',
  [CatalogFilterName.InStock]: 'onlyAvailable',
};

/** Query-параметр → поле фильтра из конфига */
export const QUERY_PARAM_TO_CATALOG_FILTER_FIELD = Object.fromEntries(
  Object.entries(CATALOG_FILTER_FIELD_TO_QUERY_PARAM).map(([field, param]) => [
    param,
    field as CatalogFilterName,
  ]),
) as Record<string, CatalogFilterName>;

export interface ICatalogFiltersFormState {
  [CatalogFilterName.Genre]: string[];
  [CatalogFilterName.LibraryBranch]: string[];
  [CatalogFilterName.Author]: string[];
  [CatalogFilterName.HasOnlineVersion]: boolean;
  [CatalogFilterName.InStock]: boolean;
}

export const DEFAULT_CATALOG_FILTERS_STATE: ICatalogFiltersFormState = {
  [CatalogFilterName.Genre]: [],
  [CatalogFilterName.LibraryBranch]: [],
  [CatalogFilterName.Author]: [],
  [CatalogFilterName.HasOnlineVersion]: false,
  [CatalogFilterName.InStock]: false,
};

/** Ant Design Form в `onFinish` может не передать ключи для пустых полей. */
export function normalizeCatalogFiltersFormState(
  filters: Partial<ICatalogFiltersFormState>,
): ICatalogFiltersFormState {
  return {
    [CatalogFilterName.Genre]: filters[CatalogFilterName.Genre] ?? [],
    [CatalogFilterName.LibraryBranch]: filters[CatalogFilterName.LibraryBranch] ?? [],
    [CatalogFilterName.Author]: filters[CatalogFilterName.Author] ?? [],
    [CatalogFilterName.HasOnlineVersion]: Boolean(filters[CatalogFilterName.HasOnlineVersion]),
    [CatalogFilterName.InStock]: Boolean(filters[CatalogFilterName.InStock]),
  };
}

const GENRE_QP = CATALOG_FILTER_FIELD_TO_QUERY_PARAM[CatalogFilterName.Genre];
const LIB_QP = CATALOG_FILTER_FIELD_TO_QUERY_PARAM[CatalogFilterName.LibraryBranch];
const AUTHOR_QP = CATALOG_FILTER_FIELD_TO_QUERY_PARAM[CatalogFilterName.Author];
const ONLINE_QP = CATALOG_FILTER_FIELD_TO_QUERY_PARAM[CatalogFilterName.HasOnlineVersion];
const STOCK_QP = CATALOG_FILTER_FIELD_TO_QUERY_PARAM[CatalogFilterName.InStock];

function parseCommaSeparatedIds(raw: string | null): string[] {
  if (!raw?.trim()) return [];
  return raw
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
}

export function parseTruthyQueryParam(raw: string | null): boolean {
  if (raw == null) return false;
  return raw === '1' || raw.toLowerCase() === 'true' || raw.toLowerCase() === 'yes';
}

/** Вкладка каталога из URL: `popular=true`, либо `category=<WorkCategory API>`, иначе «Новые». */
export function parseCatalogTabFromSearchParams(
  searchParams: URLSearchParams,
  fallback: TExtendedWorkCatalogCategoryValue = EXTENDED_WORK_CATALOG_CATEGORIES_DICT.Newest,
): TExtendedWorkCatalogCategoryValue {
  if (parseTruthyQueryParam(searchParams.get(CATALOG_POPULAR_QUERY_PARAM))) {
    return EXTENDED_WORK_CATALOG_CATEGORIES_DICT.Popular;
  }

  const raw = searchParams.get(CATALOG_CATEGORY_QUERY_PARAM)?.trim();
  if (!raw) return fallback;

  if (raw === EXTENDED_WORK_CATALOG_CATEGORIES_DICT.Newest) {
    return EXTENDED_WORK_CATALOG_CATEGORIES_DICT.Newest;
  }
  if (raw === EXTENDED_WORK_CATALOG_CATEGORIES_DICT.Popular) {
    return EXTENDED_WORK_CATALOG_CATEGORIES_DICT.Popular;
  }

  const wc = BACKEND_WORK_CATEGORY_FROM_URL_PARAM[raw];
  if (wc !== undefined) return wc;

  return fallback;
}

export function parseCatalogFiltersFromSearchParams(searchParams: URLSearchParams): ICatalogFiltersFormState {
  return {
    [CatalogFilterName.Genre]: parseCommaSeparatedIds(searchParams.get(GENRE_QP)),
    [CatalogFilterName.LibraryBranch]: parseCommaSeparatedIds(searchParams.get(LIB_QP)),
    [CatalogFilterName.Author]: parseCommaSeparatedIds(searchParams.get(AUTHOR_QP)),
    [CatalogFilterName.HasOnlineVersion]: parseTruthyQueryParam(searchParams.get(ONLINE_QP)),
    [CatalogFilterName.InStock]: parseTruthyQueryParam(searchParams.get(STOCK_QP)),
  };
}

export function appendCatalogFiltersToSearchParams(
  params: URLSearchParams,
  filters: Partial<ICatalogFiltersFormState>,
): void {
  const f = normalizeCatalogFiltersFormState(filters);

  Object.values(CATALOG_FILTER_FIELD_TO_QUERY_PARAM).forEach((key) => params.delete(key));

  const genres = f[CatalogFilterName.Genre];
  if (genres.length) params.set(GENRE_QP, genres.join(','));

  const libs = f[CatalogFilterName.LibraryBranch];
  if (libs.length) params.set(LIB_QP, libs.join(','));

  const authors = f[CatalogFilterName.Author];
  if (authors.length) params.set(AUTHOR_QP, authors.join(','));

  if (f[CatalogFilterName.HasOnlineVersion]) params.set(ONLINE_QP, 'true');

  if (f[CatalogFilterName.InStock]) params.set(STOCK_QP, 'true');
}

export function buildCatalogSearchParams(opts: {
  q: string;
  tab: TExtendedWorkCatalogCategoryValue;
  filters: Partial<ICatalogFiltersFormState>;
}): URLSearchParams {
  const params = new URLSearchParams();
  const trimmed = opts.q.trim();
  if (trimmed) params.set(CATALOG_SEARCH_QUERY_PARAM, trimmed);

  if (opts.tab === EXTENDED_WORK_CATALOG_CATEGORIES_DICT.Popular) {
    params.set(CATALOG_POPULAR_QUERY_PARAM, 'true');
  } else if (WORK_CATEGORY_SET.has(opts.tab as WorkCategory)) {
    params.set(CATALOG_CATEGORY_QUERY_PARAM, CLIENT_WORK_CATEGORY_TO_BACKEND_PARAM[opts.tab as WorkCategory]);
  }

  appendCatalogFiltersToSearchParams(params, opts.filters);
  return params;
}
