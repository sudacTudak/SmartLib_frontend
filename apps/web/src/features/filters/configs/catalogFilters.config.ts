import { FilterType } from "../enums";
import { TFormFilter } from "../types";

export enum CatalogFilterName {
  Genre = 'genre',
  LibraryBranch = 'library_branch',
  Author = 'author',
  HasOnlineVersion = 'has_online_version',
  OnlineOnly = 'online_only',
  InStock = 'in_stock'
}

export const CatalogFiltersFieldConfigs: TFormFilter[] = [
  { name: CatalogFilterName.Genre, filterType: FilterType.MultiSelect, label: 'Жанр', },
  {
    name: CatalogFilterName.LibraryBranch,
    filterType: FilterType.MultiSelect,
    label: 'Библиотеки',
  },
  { name: CatalogFilterName.Author, filterType: FilterType.MultiSelect, label: 'Авторы' },
  {
    name: CatalogFilterName.HasOnlineVersion,
    filterType: FilterType.Checkobx,
    label: 'Есть онлайн-версия',
  },
  { name: CatalogFilterName.OnlineOnly, filterType: FilterType.Checkobx, label: 'Только онлайн' },
  { name: CatalogFilterName.InStock, filterType: FilterType.Checkobx, label: 'Есть в наличии' },
];