import type { AxiosInstance } from 'axios';
import { apiPath } from '../../apiPath';
import { ApiPaths, actionPath, detailPath, regularPath } from '../../paths';
import type { HttpSuccessBody } from '../../types';
import { unwrapData } from '../../unwrap';
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

/** Сотрудники / админы, `StaffViewSet`. */
export function createStaffApi(client: AxiosInstance) {
  return {
    list: async (params?: StaffListParams) => {
      const res = await client.get<HttpSuccessBody<StaffListData>>(
        apiPath(regularPath(ApiPaths.usersStaff)),
        { params },
      );
      return unwrapData<StaffListData>(res);
    },

    get: async (id: string | number) => {
      const res = await client.get<HttpSuccessBody<StaffDetailData>>(
        apiPath(detailPath(ApiPaths.usersStaff, id)),
      );
      return unwrapData<StaffDetailData>(res);
    },

    create: async (body: StaffCreateBody) => {
      const res = await client.post<HttpSuccessBody<StaffCreateResponseData>>(
        apiPath(regularPath(ApiPaths.usersStaff)),
        body,
      );
      return unwrapData<StaffCreateResponseData>(res);
    },

    partialUpdate: async (id: string | number, body: StaffPatchBody) => {
      const res = await client.patch<HttpSuccessBody<StaffPatchData>>(
        apiPath(detailPath(ApiPaths.usersStaff, id)),
        body,
      );
      return unwrapData<StaffPatchData>(res);
    },

    delete: async (id: string | number) => {
      const res = await client.delete<HttpSuccessBody<StaffDeleteData>>(
        apiPath(detailPath(ApiPaths.usersStaff, id)),
      );
      return unwrapData<StaffDeleteData>(res);
    },

    updatePermissions: async (id: string | number, body: StaffUpdatePermissionsBody) => {
      const res = await client.patch<HttpSuccessBody<StaffUpdatePermissionsData>>(
        apiPath(actionPath(ApiPaths.usersStaff, id, 'update-permissions')),
        body,
      );
      return unwrapData<StaffUpdatePermissionsData>(res);
    },
  };
}
