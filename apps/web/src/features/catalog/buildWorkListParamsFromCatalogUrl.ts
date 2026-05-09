import type { WorkListParams } from '@shared-packages/api';
import { CatalogFilterName } from '@features/filters/configs';
import {
  CATALOG_CATEGORY_QUERY_PARAM,
  CATALOG_POPULAR_QUERY_PARAM,
  CATALOG_SEARCH_QUERY_PARAM,
  parseCatalogFiltersFromSearchParams,
  parseTruthyQueryParam,
} from '@global/globalSearch/catalogFiltersQuery';

export function buildWorkListParamsFromCatalogUrl(searchParams: URLSearchParams): WorkListParams {
  const params: WorkListParams = {};

  const q = searchParams.get(CATALOG_SEARCH_QUERY_PARAM)?.trim();
  if (q) params.q = q;

  const popular = parseTruthyQueryParam(searchParams.get(CATALOG_POPULAR_QUERY_PARAM));
  if (popular) {
    params.popular = true;
  } else {
    const rawCategory = searchParams.get(CATALOG_CATEGORY_QUERY_PARAM)?.trim();
    if (rawCategory) params.category = rawCategory;
  }

  const filters = parseCatalogFiltersFromSearchParams(searchParams);

  /** Axios даёт для массивов ключи вида `genres[]`; Pydantic на бэке ждёт `genres` и парсит CSV через `_as_list`. */
  if (filters[CatalogFilterName.Genre].length) {
    params.genres = filters[CatalogFilterName.Genre].join(',');
  }
  if (filters[CatalogFilterName.LibraryBranch].length) {
    params.libraryBranch = filters[CatalogFilterName.LibraryBranch].join(',');
  }
  if (filters[CatalogFilterName.Author].length) {
    params.authors = filters[CatalogFilterName.Author].join(',');
  }

  if (filters[CatalogFilterName.HasOnlineVersion]) params.hasOnlineVersion = true;
  if (filters[CatalogFilterName.InStock]) params.onlyAvailable = true;

  return params;
}
