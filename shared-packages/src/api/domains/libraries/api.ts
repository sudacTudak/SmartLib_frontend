import type { AxiosInstance } from 'axios';
import { apiPath } from '../../apiPath';
import { ApiPaths, detailPath, listPath } from '../../paths';
import type { HttpSuccessBody } from '../../types';
import { unwrapData } from '../../unwrap';
import type {
  LibraryBranchCreateBody,
  LibraryBranchDetailData,
  LibraryBranchListData,
  LibraryBranchListParams,
  LibraryBranchPatchBody,
} from './libraries.types';

/** `LibraryBranchViewSet`: list, retrieve, create, partial_update (без destroy). */
export function createLibrariesApi(client: AxiosInstance) {
  return {
    list: async (params?: LibraryBranchListParams) => {
      const res = await client.get<HttpSuccessBody<LibraryBranchListData>>(
        apiPath(listPath(ApiPaths.libBranch)),
        { params },
      );
      return unwrapData<LibraryBranchListData>(res);
    },
    get: async (id: string | number) => {
      const res = await client.get<HttpSuccessBody<LibraryBranchDetailData>>(
        apiPath(detailPath(ApiPaths.libBranch, id)),
      );
      return unwrapData<LibraryBranchDetailData>(res);
    },
    create: async (body: LibraryBranchCreateBody) => {
      const res = await client.post<HttpSuccessBody<LibraryBranchDetailData>>(
        apiPath(listPath(ApiPaths.libBranch)),
        body,
      );
      return unwrapData<LibraryBranchDetailData>(res);
    },
    partialUpdate: async (id: string | number, body: LibraryBranchPatchBody) => {
      const res = await client.patch<HttpSuccessBody<LibraryBranchDetailData>>(
        apiPath(detailPath(ApiPaths.libBranch, id)),
        body,
      );
      return unwrapData<LibraryBranchDetailData>(res);
    },
  };
}
