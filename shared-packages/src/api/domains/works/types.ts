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
  publisher: string;
  createdYear: number;
  genre: string;
  onlineVersionLink: string | null;
  createdAt: IsoDateTimeString;
  updatedAt: IsoDateTimeString;
  /** Агрегат по отзывам (GET list/retrieve; при write-ответах может отсутствовать). */
  ratingAvg?: number | null;
  ratingCount?: number;
  /** Сумма `availableCount` по всем экземплярам книги в филиалах (GET list/retrieve; иначе 0). */
  booksAvailableTotal: number;
}

export type WorkListData = IWork[];
export type WorkDetailData = IWork;

/** GET `works/` — query. */
export type WorkListParams = { onlyAvailable?: boolean };
export type WorkCreateBody = Partial<
  Pick<
    IWork,
    | 'title'
    | 'description'
    | 'authorIds'
    | 'publisher'
    | 'createdYear'
    | 'genre'
    | 'onlineVersionLink'
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
  genreId: string;
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

export type WorksListQueryParams = Record<string, string | number | boolean | undefined>;

