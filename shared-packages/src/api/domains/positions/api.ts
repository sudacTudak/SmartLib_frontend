import type { AxiosInstance } from 'axios';
import { apiPath } from '../../apiPath';
import { ApiPaths, detailPath, listPath } from '../../paths';
import type { HttpSuccessBody } from '../../types';
import { unwrapData } from '../../unwrap';
import type {
  PositionCreateBody,
  PositionDeleteData,
  PositionDetailData,
  PositionListData,
  PositionListParams,
  PositionPatchBody,
  PositionWriteResponseData,
} from './positions.types';

export function createPositionsApi(client: AxiosInstance) {
  return {
    list: async (params?: PositionListParams) => {
      const res = await client.get<HttpSuccessBody<PositionListData>>(
        apiPath(listPath(ApiPaths.positions)),
        { params },
      );
      return unwrapData<PositionListData>(res);
    },
    get: async (id: string | number) => {
      const res = await client.get<HttpSuccessBody<PositionDetailData>>(
        apiPath(detailPath(ApiPaths.positions, id)),
      );
      return unwrapData<PositionDetailData>(res);
    },
    create: async (body: PositionCreateBody) => {
      const res = await client.post<HttpSuccessBody<PositionWriteResponseData>>(
        apiPath(listPath(ApiPaths.positions)),
        body,
      );
      return unwrapData<PositionWriteResponseData>(res);
    },
    partialUpdate: async (id: string | number, body: PositionPatchBody) => {
      const res = await client.patch<HttpSuccessBody<PositionWriteResponseData>>(
        apiPath(detailPath(ApiPaths.positions, id)),
        body,
      );
      return unwrapData<PositionWriteResponseData>(res);
    },
    delete: async (id: string | number) => {
      const res = await client.delete<HttpSuccessBody<PositionDeleteData>>(
        apiPath(detailPath(ApiPaths.positions, id)),
      );
      return unwrapData<PositionDeleteData>(res);
    },
  };
}
