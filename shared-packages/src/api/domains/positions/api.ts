import type { AxiosInstance } from 'axios';
import { ApiResource } from '../../api-resource';
import { ApiPaths } from '../../paths';
import type { RequestOptions } from '../../types';
import type {
  PositionCreateBody,
  PositionDeleteData,
  PositionDetailData,
  PositionListData,
  PositionPatchBody,
  PositionWriteResponseData,
} from './types';

export function createPositionsApi(client: AxiosInstance) {
  const resource = new ApiResource<PositionListData, PositionDetailData, PositionCreateBody, PositionPatchBody, PositionDeleteData>(
    client,
    ApiPaths.positions,
  );

  return {
    list: (params?: Record<string, unknown>, options?: RequestOptions) => resource.list(params, options),
    get: (id: string | number, options?: RequestOptions) => resource.get(id, options),
    create: (body: PositionCreateBody, options?: RequestOptions) =>
      resource.create(body, options) as unknown as Promise<PositionWriteResponseData>,
    partialUpdate: (id: string | number, body: PositionPatchBody, options?: RequestOptions) =>
      resource.partialUpdate(id, body, options) as unknown as Promise<PositionWriteResponseData>,
    delete: (id: string | number, options?: RequestOptions) => resource.delete(id, options),
  };
}
