import type { IsoDateTimeString } from '../../types';

/**
 * `BookBasisSerializer` — book-bases list / retrieve / create / patch.
 * destroy: кастомный ответ 200 с тем же объектом, что и до удаления.
 */
export interface IBookBasis {
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

export type BookBasisListData = IBookBasis[];
export type BookBasisDetailData = IBookBasis;

/** GET `book-bases/` — query. */
export type BookBasisListParams = { onlyAvailable?: boolean };
export type BookBasisCreateBody = Partial<
  Pick<
    IBookBasis,
    | 'title'
    | 'description'
    | 'authorIds'
    | 'publisher'
    | 'createdYear'
    | 'genre'
    | 'onlineVersionLink'
  >
>;
export type BookBasisPatchBody = Partial<BookBasisCreateBody>;
export type BookBasisDeleteData = IBookBasis;

/**
 * `GenreSerializer` — genre list / retrieve / create / patch.
 * `book_bases_ids`: read-only PK связанных book basis (см. related_name в модели).
 */
export type Genre = {
  id: string;
  title: string;
  createdAt: IsoDateTimeString;
  updatedAt: IsoDateTimeString;
  bookBasesIds: string[];
};

export type GenreListData = Genre[];
export type GenreDetailData = Genre;
export type GenreCreateBody = Partial<Pick<Genre, 'title'>>;
export type GenrePatchBody = Partial<GenreCreateBody>;
/** Стандартный destroy — 204, в обёртке `data: null`. */
export type GenreDeleteData = null;

/**
 * `BookByLibrarySerializer` — retrieve book и `by-library` (many).
 */
export type BookByLibrary = {
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

export type BookDetailData = BookByLibrary;
export type BookByLibraryParams = { library: string | number; title?: string };
export type BookByLibraryListData = BookByLibrary[];

export type BookListQueryParams = Record<string, string | number | boolean | undefined>;
