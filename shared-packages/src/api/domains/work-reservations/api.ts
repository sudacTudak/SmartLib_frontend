import type { AxiosInstance } from 'axios';
import { ApiResource } from '../../api-resource';
import { ApiPaths } from '../../paths';
import type { RequestOptions } from '../../types';
import type {
  IWorkReservationCreateBody,
  IWorkReservationListParams,
  IWorkReservationProlongBody,
  IWorkReservationStatusBody,
  TWorkReservationCreateResponseData,
  TWorkReservationDetailData,
  TWorkReservationListData,
  TWorkReservationProlongData,
  TWorkReservationStatusData,
} from './types';

export function createWorkReservationsApi(client: AxiosInstance) {
  const resource = new ApiResource<
    TWorkReservationListData,
    TWorkReservationDetailData,
    IWorkReservationCreateBody
  >(client, ApiPaths.workReservations);

  return {
    list: (params?: IWorkReservationListParams, options?: RequestOptions) =>
      resource.list(params as Record<string, unknown>, options),
    get: (id: string | number, options?: RequestOptions) => resource.get(id, options),
    create: (body: IWorkReservationCreateBody, options?: RequestOptions) =>
      resource.create(body, options) as unknown as Promise<TWorkReservationCreateResponseData>,
    status: (id: string | number, body: IWorkReservationStatusBody, options?: RequestOptions) =>
      resource.customPatch<TWorkReservationStatusData>(`${id}/status`, body, options),
    prolong: (id: string | number, body: IWorkReservationProlongBody, options?: RequestOptions) =>
      resource.customPatch<TWorkReservationProlongData>(`${id}/prolong`, body, options),
  };
}
