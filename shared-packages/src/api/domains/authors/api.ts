import type { AxiosInstance } from 'axios';
import { apiPath } from '../../apiPath';
import { ApiPaths, detailPath, regularPath } from '../../paths';
import type { HttpSuccessBody } from '../../types';
import { unwrapData } from '../../unwrap';
import type { TAuthorCreateBody, TAuthorDetailData, TAuthorListData, TAuthorPatchBody } from './types';

export function createAuthorsApi(client: AxiosInstance) {
  const base = regularPath(ApiPaths.authors);

  return {
    list: async () => {
      const res = await client.get<HttpSuccessBody<TAuthorListData>>(apiPath(base));
      return unwrapData<TAuthorListData>(res);
    },
    get: async (id: string | number) => {
      const res = await client.get<HttpSuccessBody<TAuthorDetailData>>(apiPath(detailPath(ApiPaths.authors, id)));
      return unwrapData<TAuthorDetailData>(res);
    },
    create: async (body: TAuthorCreateBody) => {
      const res = await client.post<HttpSuccessBody<TAuthorDetailData>>(apiPath(base), body);
      return unwrapData<TAuthorDetailData>(res);
    },
    partialUpdate: async (id: string | number, body: TAuthorPatchBody) => {
      const res = await client.patch<HttpSuccessBody<TAuthorDetailData>>(
        apiPath(detailPath(ApiPaths.authors, id)),
        body,
      );
      return unwrapData<TAuthorDetailData>(res);
    },
    delete: async (id: string | number) => {
      const res = await client.delete<HttpSuccessBody<null>>(apiPath(detailPath(ApiPaths.authors, id)));
      return unwrapData<null>(res);
    },
  };
}
