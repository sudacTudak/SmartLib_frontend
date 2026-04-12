import type { AxiosInstance } from 'axios';
import { apiPath } from '../../apiPath';
import { ApiPaths, detailPath, regularPath } from '../../paths';
import type { HttpSuccessBody } from '../../types';
import { unwrapData } from '../../unwrap';
import type { UsersDetailData, UsersListData, UsersListParams } from './types';

/** Публичные клиенты (читатели), `UsersViewSet`. */
export function createUsersApi(client: AxiosInstance) {
  return {
    list: async (params?: UsersListParams) => {
      const res = await client.get<HttpSuccessBody<UsersListData>>(
        apiPath(regularPath(ApiPaths.users)),
        { params },
      );
      return unwrapData<UsersListData>(res);
    },

    get: async (id: string | number) => {
      const res = await client.get<HttpSuccessBody<UsersDetailData>>(
        apiPath(detailPath(ApiPaths.users, id)),
      );
      return unwrapData<UsersDetailData>(res);
    },

    /** Текущий пользователь по `Authorization: Bearer` (ожидается `GET users/me/` на бэкенде). */
    profile: async () => {
      const res = await client.get<HttpSuccessBody<UsersDetailData>>(
        apiPath(regularPath(ApiPaths.usersProfile)),
      );
      return unwrapData<UsersDetailData>(res);
    },
  };
}
