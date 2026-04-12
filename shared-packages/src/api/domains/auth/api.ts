import type { AxiosInstance } from 'axios';
import { apiPath } from '../../apiPath';
import { ApiPaths, actionPath, listPath } from '../../paths';
import type { EmptySuccessData, HttpSuccessBody, TokenPayload } from '../../types';
import { unwrapData } from '../../unwrap';
import type { ChangePasswordBody, LoginBody, LogoutBody, RegisterBody } from './types';

export function createAuthApi(client: AxiosInstance) {
  return {
    login: async (body: LoginBody): Promise<TokenPayload> => {
      const res = await client.post<HttpSuccessBody<TokenPayload>>(
        apiPath(listPath(ApiPaths.usersAuthLogin)),
        body,
      );
      return unwrapData<TokenPayload>(res);
    },

    register: async (body: RegisterBody): Promise<EmptySuccessData> => {
      const res = await client.post<HttpSuccessBody<EmptySuccessData>>(
        apiPath(listPath(ApiPaths.usersAuthRegister)),
        body,
      );
      return unwrapData<EmptySuccessData>(res);
    },

    logout: async (body: LogoutBody): Promise<EmptySuccessData> => {
      const res = await client.post<HttpSuccessBody<EmptySuccessData>>(
        apiPath(listPath(ApiPaths.usersAuthLogout)),
        body,
      );
      return unwrapData<EmptySuccessData>(res);
    },

    changePassword: async (
      userId: string | number,
      body: ChangePasswordBody,
    ): Promise<EmptySuccessData> => {
      const res = await client.post<HttpSuccessBody<EmptySuccessData>>(
        apiPath(actionPath(ApiPaths.usersAuth, userId, 'change-password')),
        body,
      );
      return unwrapData<EmptySuccessData>(res);
    },
  };
}
