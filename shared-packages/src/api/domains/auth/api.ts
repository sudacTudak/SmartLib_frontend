import type { AxiosInstance } from 'axios';
import { apiPath } from '../../apiPath';
import { actionPath, ApiPaths, regularPath } from '../../paths';
import type { EmptySuccessData, HttpSuccessBody, TokenPayload } from '../../types';
import { unwrapData } from '../../unwrap';
import type { ChangePasswordBody, LoginBody, LogoutBody, RegisterBody, ResetPasswordBody } from './types';

export function createAuthApi(client: AxiosInstance) {
  return {
    login: async (body: LoginBody): Promise<TokenPayload> => {
      const res = await client.post<HttpSuccessBody<TokenPayload>>(
        apiPath(regularPath(ApiPaths.usersAuthLogin)),
        body,
      );
      return unwrapData<TokenPayload>(res);
    },

    register: async (body: RegisterBody): Promise<EmptySuccessData> => {
      const res = await client.post<HttpSuccessBody<EmptySuccessData>>(
        apiPath(regularPath(ApiPaths.usersAuthRegister)),
        body,
      );
      return unwrapData<EmptySuccessData>(res);
    },

    logout: async (body: LogoutBody): Promise<EmptySuccessData> => {
      const res = await client.post<HttpSuccessBody<EmptySuccessData>>(
        apiPath(regularPath(ApiPaths.usersAuthLogout)),
        body,
      );
      return unwrapData<EmptySuccessData>(res);
    },

    /** POST `users/auth/{userId}/change-password/` — только для авторизованного пользователя (свой id). */
    changePassword: async (userId: string | number, body: ChangePasswordBody): Promise<EmptySuccessData> => {
      const res = await client.post<HttpSuccessBody<EmptySuccessData>>(
        apiPath(actionPath(ApiPaths.usersAuth, userId, 'change-password')),
        body,
      );
      return unwrapData<EmptySuccessData>(res);
    },

    /** POST `users/auth/reset-password/` — без авторизации, в теле email + пароли. */
    resetPassword: async (body: ResetPasswordBody): Promise<EmptySuccessData> => {
      const res = await client.post<HttpSuccessBody<EmptySuccessData>>(
        apiPath(regularPath(ApiPaths.usersAuthResetPassword)),
        body,
      );
      return unwrapData<EmptySuccessData>(res);
    },
  };
}
