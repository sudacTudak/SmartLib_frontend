import type { AxiosInstance } from 'axios';
import { apiPath } from '../../apiPath';
import { ApiPaths, actionPath, detailPath, listPath } from '../../paths';
import type { HttpSuccessBody } from '../../types';
import { unwrapData } from '../../unwrap';
import type {
  BookLoanCreateBody,
  BookLoanCreateResponseData,
  BookLoanDetailData,
  BookLoanListData,
  BookLoanListParams,
  BookLoanProlongBody,
  BookLoanProlongData,
} from './book-loans.types';

/**
 * `BookLoanViewSet`: list, retrieve, create, prolong.
 * PATCH/DELETE на бэкенде нет.
 */
export function createBookLoansApi(client: AxiosInstance) {
  return {
    list: async (params?: BookLoanListParams) => {
      const res = await client.get<HttpSuccessBody<BookLoanListData>>(
        apiPath(listPath(ApiPaths.bookLoans)),
        { params },
      );
      return unwrapData<BookLoanListData>(res);
    },
    get: async (id: string | number) => {
      const res = await client.get<HttpSuccessBody<BookLoanDetailData>>(
        apiPath(detailPath(ApiPaths.bookLoans, id)),
      );
      return unwrapData<BookLoanDetailData>(res);
    },
    create: async (body: BookLoanCreateBody) => {
      const res = await client.post<HttpSuccessBody<BookLoanCreateResponseData>>(
        apiPath(listPath(ApiPaths.bookLoans)),
        body,
      );
      return unwrapData<BookLoanCreateResponseData>(res);
    },

    /** POST `book-loans/{id}/prolong/` */
    prolong: async (id: string | number, body?: BookLoanProlongBody) => {
      const res = await client.post<HttpSuccessBody<BookLoanProlongData>>(
        apiPath(actionPath(ApiPaths.bookLoans, id, 'prolong')),
        body ?? {},
      );
      return unwrapData<BookLoanProlongData>(res);
    },
  };
}
