import type { AxiosInstance } from 'axios';
import { ApiResource } from '../../api-resource';
import { ApiPaths } from '../../paths';
import type { RequestOptions } from '../../types';
import type {
  StaffCreateBody,
  StaffCreateResponseData,
  StaffDeleteData,
  StaffDetailData,
  StaffListData,
  StaffListParams,
  StaffPatchBody,
  StaffPatchData,
  StaffUpdatePermissionsBody,
  StaffUpdatePermissionsData,
} from './types';

export function createStaffApi(client: AxiosInstance) {
  const resource = new ApiResource<StaffListData, StaffDetailData, StaffCreateBody, StaffPatchBody, StaffDeleteData>(
    client,
    ApiPaths.usersStaff,
  );

  return {
    list: (params?: StaffListParams, options?: RequestOptions) => resource.list(params as Record<string, unknown>, options),
    get: (id: string | number, options?: RequestOptions) => resource.get(id, options),
    create: (body: StaffCreateBody, options?: RequestOptions) =>
      resource.create(body, options) as unknown as Promise<StaffCreateResponseData>,
    partialUpdate: (id: string | number, body: StaffPatchBody, options?: RequestOptions) =>
      resource.partialUpdate(id, body, options) as unknown as Promise<StaffPatchData>,
    delete: (id: string | number, options?: RequestOptions) => resource.delete(id, options),
    updatePermissions: (id: string | number, body: StaffUpdatePermissionsBody, options?: RequestOptions) =>
      resource.customPatch<StaffUpdatePermissionsData>(`${id}/update-permissions`, body, options),
  };
}
