import type { AxiosInstance } from 'axios';
import { apiPath } from '../../apiPath';
import { ApiPaths, detailPath, regularPath } from '../../paths';
import type { HttpSuccessBody } from '../../types';
import { unwrapData } from '../../unwrap';
import type {
  WorkCreateBody,
  WorkDeleteData,
  WorkDetailData,
  WorkListData,
  WorkListParams,
  WorkPatchBody,
  WorkItemsByLibraryListData,
  WorkItemsByLibraryParams,
  WorkItemDetailData,
  WorksListQueryParams,
  GenreCreateBody,
  GenreDeleteData,
  GenreDetailData,
  GenreListData,
  GenrePatchBody,
} from './types';

/** `works`, `genre`, `work-items` + `by-library`. */
export function createWorksApi(client: AxiosInstance) {
  return {
    works: {
      list: async (params?: WorkListParams) => {
        const res = await client.get<HttpSuccessBody<WorkListData>>(
          apiPath(regularPath(ApiPaths.works)),
          { params },
        );
        return unwrapData<WorkListData>(res);
      },
      get: async (id: string | number) => {
        const res = await client.get<HttpSuccessBody<WorkDetailData>>(
          apiPath(detailPath(ApiPaths.works, id)),
        );
        return unwrapData<WorkDetailData>(res);
      },
      create: async (body: WorkCreateBody) => {
        const res = await client.post<HttpSuccessBody<WorkDetailData>>(
          apiPath(regularPath(ApiPaths.works)),
          body,
        );
        return unwrapData<WorkDetailData>(res);
      },
      partialUpdate: async (id: string | number, body: WorkPatchBody) => {
        const res = await client.patch<HttpSuccessBody<WorkDetailData>>(
          apiPath(detailPath(ApiPaths.works, id)),
          body,
        );
        return unwrapData<WorkDetailData>(res);
      },
      delete: async (id: string | number) => {
        const res = await client.delete<HttpSuccessBody<WorkDeleteData>>(
          apiPath(detailPath(ApiPaths.works, id)),
        );
        return unwrapData<WorkDeleteData>(res);
      },
    },

    genre: {
      list: async (params?: WorksListQueryParams) => {
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

    workItems: {
      get: async (id: string | number) => {
        const res = await client.get<HttpSuccessBody<WorkItemDetailData>>(
          apiPath(detailPath(ApiPaths.workItems, id)),
        );
        return unwrapData<WorkItemDetailData>(res);
      },

      /** GET `works/work-items/by-library/?library=&title=` */
      listByLibrary: async (params: WorkItemsByLibraryParams) => {
        const res = await client.get<HttpSuccessBody<WorkItemsByLibraryListData>>(
          apiPath(regularPath(ApiPaths.workItemsByLibrary)),
          { params },
        );
        return unwrapData<WorkItemsByLibraryListData>(res);
      },
    },
  };
}

