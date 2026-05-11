import type { AxiosInstance } from 'axios';
import { ApiResource } from '../../api-resource';
import { ApiPaths } from '../../paths';
import type { EmptySuccessData, RequestOptions, TokenPayload } from '../../types';
import type { ChangePasswordBody, LoginBody, LogoutBody, RegisterBody, ResetPasswordBody } from './types';

export function createAuthApi(client: AxiosInstance) {
  const resource = new ApiResource(client, ApiPaths.usersAuth);

  return {
    login: (body: LoginBody, options?: RequestOptions) =>
      resource.customPost<TokenPayload>('login', body, options),

    register: (body: RegisterBody, options?: RequestOptions) =>
      resource.customPost<EmptySuccessData>('register', body, options),

    logout: (body: LogoutBody, options?: RequestOptions) =>
      resource.customPost<EmptySuccessData>('logout', body, options),

    changePassword: (userId: string | number, body: ChangePasswordBody, options?: RequestOptions) =>
      resource.customPost<EmptySuccessData>(`${userId}/change-password`, body, options),

    resetPassword: (body: ResetPasswordBody, options?: RequestOptions) =>
      resource.customPost<EmptySuccessData>('reset-password', body, options),
  };
}
