import type { IsoDateTimeString } from '../../types';

/**
 * `BookBasisSerializer` — book-bases list / retrieve / create / patch.
 * destroy: кастомный ответ 200 с тем же объектом, что и до удаления.
 */
export type BookBasis = {
  id: string;
  title: string;
  description: string | null;
  author: string;
  publisher: string;
  created_year: number;
  genre: string;
  online_version_link: string | null;
  created_at: IsoDateTimeString;
  updated_at: IsoDateTimeString;
};

export type BookBasisListData = BookBasis[];
export type BookBasisDetailData = BookBasis;
export type BookBasisCreateBody = Partial<
  Pick<
    BookBasis,
    | 'title'
    | 'description'
    | 'author'
    | 'publisher'
    | 'created_year'
    | 'genre'
    | 'online_version_link'
  >
>;
export type BookBasisPatchBody = Partial<BookBasisCreateBody>;
export type BookBasisDeleteData = BookBasis;

/**
 * `GenreSerializer` — genre list / retrieve / create / patch.
 * `book_bases_ids`: read-only PK связанных book basis (см. related_name в модели).
 */
export type Genre = {
  id: string;
  title: string;
  created_at: IsoDateTimeString;
  updated_at: IsoDateTimeString;
  book_bases_ids: string[];
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
  library_branch_id: string;
  genre_id: string;
  title: string;
  author: string;
  publisher: string;
  description: string;
  created_year: number;
  online_version_link: string;
  total_count: number;
  available_count: number;
  created_at: IsoDateTimeString;
  updated_at: IsoDateTimeString;
};

export type BookDetailData = BookByLibrary;
export type BookByLibraryParams = { library: string | number; title?: string };
export type BookByLibraryListData = BookByLibrary[];

export type BookListQueryParams = Record<string, string | number | boolean | undefined>;
