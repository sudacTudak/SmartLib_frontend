import type { AxiosInstance } from 'axios';
import { ApiResource } from '../../api-resource';
import { ApiPaths } from '../../paths';
import type { RequestOptions } from '../../types';
import { unwrapData } from '../../unwrap';
import type { UsersDetailData, UsersListData, UsersListParams } from './types';

export function createUsersApi(client: AxiosInstance) {
  const resource = new ApiResource<UsersListData, UsersDetailData>(client, ApiPaths.users);

  return {
    list: (params?: UsersListParams, options?: RequestOptions) => resource.list(params, options),
    get: (id: string | number, options?: RequestOptions) => resource.get(id, options),

    profile: async (options?: RequestOptions): Promise<UsersDetailData> => {
      const res = await client.get(`/api/v1/${ApiPaths.usersProfile}/`, { signal: options?.signal });
      return unwrapData<UsersDetailData>(res);
    },
  };
}
