import type { AxiosInstance } from 'axios';
import { ApiResource } from '../../api-resource';
import { ApiPaths } from '../../paths';
import type { RequestOptions } from '../../types';
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
  WorkItemsByWorkListData,
  WorkItemsByWorkParams,
  WorksListQueryParams,
  GenreCreateBody,
  GenreDeleteData,
  GenreDetailData,
  GenreListData,
  GenrePatchBody,
  IAvailabilityByWorkParams,
  IAvailabilityByWorkResponse,
} from './types';

export function createWorksApi(client: AxiosInstance) {
  const worksResource = new ApiResource<WorkListData, WorkDetailData, WorkCreateBody, WorkPatchBody, WorkDeleteData>(
    client,
    ApiPaths.works,
  );
  const genreResource = new ApiResource<GenreListData, GenreDetailData, GenreCreateBody, GenrePatchBody, GenreDeleteData>(
    client,
    ApiPaths.genre,
  );
  const similarResource = new ApiResource(client, ApiPaths.worksSimilar);
  const workItemsResource = new ApiResource<unknown, WorkItemDetailData>(client, ApiPaths.workItems);

  return {
    works: {
      list: (params?: WorkListParams, options?: RequestOptions) => worksResource.list(params as Record<string, unknown>, options),
      get: (id: string | number, options?: RequestOptions) => worksResource.get(id, options),
      create: (body: WorkCreateBody, options?: RequestOptions) => worksResource.create(body, options),
      partialUpdate: (id: string | number, body: WorkPatchBody, options?: RequestOptions) => worksResource.partialUpdate(id, body, options),
      delete: (id: string | number, options?: RequestOptions) => worksResource.delete(id, options),
      getSimilar: (id: string, options?: RequestOptions) =>
        similarResource.list({ workId: id }, options) as Promise<WorkListData>,
    },

    genre: {
      list: (params?: WorksListQueryParams, options?: RequestOptions) => genreResource.list(params as Record<string, unknown>, options),
      get: (id: string | number, options?: RequestOptions) => genreResource.get(id, options),
      create: (body: GenreCreateBody, options?: RequestOptions) => genreResource.create(body, options),
      partialUpdate: (id: string | number, body: GenrePatchBody, options?: RequestOptions) => genreResource.partialUpdate(id, body, options),
      delete: (id: string | number, options?: RequestOptions) => genreResource.delete(id, options),
    },

    workItems: {
      get: (id: string | number, options?: RequestOptions) => workItemsResource.get(id, options),
      listByLibrary: (params: WorkItemsByLibraryParams, options?: RequestOptions) =>
        workItemsResource.customGet<WorkItemsByLibraryListData>('by-library', params as unknown as Record<string, unknown>, options),
      listByWork: (params: WorkItemsByWorkParams, options?: RequestOptions) =>
        workItemsResource.customGet<WorkItemsByWorkListData>('by-work', params as unknown as Record<string, unknown>, options),
      availabilityByWork: (params: IAvailabilityByWorkParams, options?: RequestOptions) =>
        workItemsResource.customGet<IAvailabilityByWorkResponse>('availability-by-work', params as unknown as Record<string, unknown>, options),
    },
  };
}
