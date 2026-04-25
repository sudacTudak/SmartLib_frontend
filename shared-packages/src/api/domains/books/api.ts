import type { AxiosInstance } from 'axios';
import { apiPath } from '../../apiPath';
import { ApiPaths, detailPath, regularPath } from '../../paths';
import type { HttpSuccessBody } from '../../types';
import { unwrapData } from '../../unwrap';
import type {
  BookBasisCreateBody,
  BookBasisDeleteData,
  BookBasisDetailData,
  BookBasisListData,
  BookBasisListParams,
  BookBasisPatchBody,
  BookByLibraryListData,
  BookByLibraryParams,
  BookDetailData,
  BookListQueryParams,
  GenreCreateBody,
  GenreDeleteData,
  GenreDetailData,
  GenreListData,
  GenrePatchBody,
} from './types';

/** `book-bases`, `genre`, `book` + `by-library`. */
export function createBooksApi(client: AxiosInstance) {
  return {
    bookBases: {
      list: async (params?: BookBasisListParams) => {
        const res = await client.get<HttpSuccessBody<BookBasisListData>>(
          apiPath(regularPath(ApiPaths.bookBases)),
          { params },
        );
        return unwrapData<BookBasisListData>(res);
      },
      get: async (id: string | number) => {
        const res = await client.get<HttpSuccessBody<BookBasisDetailData>>(
          apiPath(detailPath(ApiPaths.bookBases, id)),
        );
        return unwrapData<BookBasisDetailData>(res);
      },
      create: async (body: BookBasisCreateBody) => {
        const res = await client.post<HttpSuccessBody<BookBasisDetailData>>(
          apiPath(regularPath(ApiPaths.bookBases)),
          body,
        );
        return unwrapData<BookBasisDetailData>(res);
      },
      partialUpdate: async (id: string | number, body: BookBasisPatchBody) => {
        const res = await client.patch<HttpSuccessBody<BookBasisDetailData>>(
          apiPath(detailPath(ApiPaths.bookBases, id)),
          body,
        );
        return unwrapData<BookBasisDetailData>(res);
      },
      delete: async (id: string | number) => {
        const res = await client.delete<HttpSuccessBody<BookBasisDeleteData>>(
          apiPath(detailPath(ApiPaths.bookBases, id)),
        );
        return unwrapData<BookBasisDeleteData>(res);
      },
    },

    genre: {
      list: async (params?: BookListQueryParams) => {
        const res = await client.get<HttpSuccessBody<GenreListData>>(
          apiPath(regularPath(ApiPaths.genre)),
          { params },
        );
        return unwrapData<GenreListData>(res);
      },
      get: async (id: string | number) => {
        const res = await client.get<HttpSuccessBody<GenreDetailData>>(
          apiPath(detailPath(ApiPaths.genre, id)),
        );
        return unwrapData<GenreDetailData>(res);
      },
      create: async (body: GenreCreateBody) => {
        const res = await client.post<HttpSuccessBody<GenreDetailData>>(
          apiPath(regularPath(ApiPaths.genre)),
          body,
        );
        return unwrapData<GenreDetailData>(res);
      },
      partialUpdate: async (id: string | number, body: GenrePatchBody) => {
        const res = await client.patch<HttpSuccessBody<GenreDetailData>>(
          apiPath(detailPath(ApiPaths.genre, id)),
          body,
        );
        return unwrapData<GenreDetailData>(res);
      },
      delete: async (id: string | number) => {
        const res = await client.delete<HttpSuccessBody<GenreDeleteData>>(
          apiPath(detailPath(ApiPaths.genre, id)),
        );
        return unwrapData<GenreDeleteData>(res);
      },
    },

    book: {
      get: async (id: string | number) => {
        const res = await client.get<HttpSuccessBody<BookDetailData>>(
          apiPath(detailPath(ApiPaths.book, id)),
        );
        return unwrapData<BookDetailData>(res);
      },

      /** GET `books/book/by-library/?library=&title=` */
      listByLibrary: async (params: BookByLibraryParams) => {
        const res = await client.get<HttpSuccessBody<BookByLibraryListData>>(
          apiPath(regularPath(ApiPaths.bookByLibrary)),
          { params },
        );
        return unwrapData<BookByLibraryListData>(res);
      },
    },
  };
}
