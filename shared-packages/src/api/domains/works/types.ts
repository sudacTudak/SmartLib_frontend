import type { WorkCategory } from '@shared-packages/enums';

import type { IsoDateTimeString } from '../../types';

/**
 * `WorkSerializer` — works list / retrieve / create / patch.
 * destroy: кастомный ответ 200 с тем же объектом, что и до удаления.
 */
export interface IWork {
  id: string;
  title: string;
  description: string | null;
  authorIds: string[];
  category: WorkCategory;
  publisher: string;
  createdYear: number;
  genreIds: string[];
  volume: number;
  onlineVersionLink: string | null;
  /** Абсолютный URL превью (в list/retrieve; при write-ответах может отсутствовать). */
  previewLink?: string | null;
  /** Агрегат по отзывам (GET list/retrieve; при write-ответах может отсутствовать). */
  ratingAvg?: number | null;
  ratingCount?: number;
  /** Сумма `availableCount` по всем экземплярам книги в филиалах (GET list/retrieve; иначе 0). */
  booksAvailableTotal: number;
  createdAt: IsoDateTimeString;
  updatedAt: IsoDateTimeString;
}

export type WorkListData = IWork[];
export type WorkDetailData = IWork;

/** GET `works/` — query. */
export type WorkListParams = { onlyAvailable?: boolean; category?: WorkCategory };
export type WorkCreateBody = Partial<
  Pick<
    IWork,
    'title' | 'description' | 'authorIds' | 'category' | 'publisher' | 'createdYear' | 'genreIds' | 'onlineVersionLink'
  >
>;
export type WorkPatchBody = Partial<WorkCreateBody>;
export type WorkDeleteData = IWork;

/**
 * `GenreSerializer` — genre list / retrieve / create / patch.
 * `works`: read-only PK связанных works (см. related_name в модели).
 */
export type Genre = {
  id: string;
  title: string;
  createdAt: IsoDateTimeString;
  updatedAt: IsoDateTimeString;
  works: string[];
};

export type GenreListData = Genre[];
export type GenreDetailData = Genre;
export type GenreCreateBody = Partial<Pick<Genre, 'title'>>;
export type GenrePatchBody = Partial<GenreCreateBody>;
/** Стандартный destroy — 204, в обёртке `data: null`. */
export type GenreDeleteData = null;

/**
 * `WorkItemByLibrarySerializer` — retrieve work item и `by-library` (many).
 */
export type WorkItemByLibrary = {
  id: string;
  libraryBranchId: string;
  workId: string;
  category: WorkCategory;
  genreIds: string[];
  title: string;
  authorIds: string[];
  publisher: string;
  description: string;
  createdYear: number;
  onlineVersionLink: string;
  totalCount: number;
  availableCount: number;
  createdAt: IsoDateTimeString;
  updatedAt: IsoDateTimeString;
};

export type WorkItemDetailData = WorkItemByLibrary;
export type WorkItemsByLibraryParams = { library: string | number; title?: string };
export type WorkItemsByLibraryListData = WorkItemByLibrary[];

export type WorkItemsByWorkParams = { work: string; onlyAvailable?: boolean };
export type WorkItemsByWorkListData = WorkItemByLibrary[];

export type WorksListQueryParams = Record<string, string | number | boolean | undefined>;

export interface IAvailabilityByWorkParams {
  workId: string;
}
export interface IAvailabilityByWorkResponse {
  workId: string;
  totalAvailableCount: number;
  availableByLibraryBranchIds: Record<string, number>;
}
