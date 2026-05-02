import type { AxiosInstance } from 'axios';
import { apiPath } from '../../apiPath';
import { ApiPaths, detailPath, regularPath } from '../../paths';
import type { HttpSuccessBody } from '../../types';
import { unwrapData } from '../../unwrap';
import type {
  TLibraryBranchCreateBody,
  TLibraryBranchDetailData,
  TLibraryBranchListData,
  TLibraryBranchListParams,
  TLibraryBranchPatchBody,
} from './types';

/** `LibraryBranchViewSet`: list, retrieve, create, partial_update (без destroy). */
export function createLibrariesApi(client: AxiosInstance) {
  return {
    list: async (params?: TLibraryBranchListParams) => {
      const res = await client.get<HttpSuccessBody<TLibraryBranchListData>>(apiPath(regularPath(ApiPaths.libBranch)), {
        params,
      });
      return unwrapData<TLibraryBranchListData>(res);
    },
    get: async (id: string | number) => {
      const res = await client.get<HttpSuccessBody<TLibraryBranchDetailData>>(
        apiPath(detailPath(ApiPaths.libBranch, id)),
      );
      return unwrapData<TLibraryBranchDetailData>(res);
    },
    create: async (body: TLibraryBranchCreateBody) => {
      const res = await client.post<HttpSuccessBody<TLibraryBranchDetailData>>(
        apiPath(regularPath(ApiPaths.libBranch)),
        body,
      );
      return unwrapData<TLibraryBranchDetailData>(res);
    },
    partialUpdate: async (id: string | number, body: TLibraryBranchPatchBody) => {
      const res = await client.patch<HttpSuccessBody<TLibraryBranchDetailData>>(
        apiPath(detailPath(ApiPaths.libBranch, id)),
        body,
      );
      return unwrapData<TLibraryBranchDetailData>(res);
    },
  };
}
