import axios, {
  type AxiosError,
  type AxiosInstance,
  type InternalAxiosRequestConfig,
} from 'axios';
import { apiPath } from './apiPath';
import { ApiPaths, listPath } from './paths';
import type { HttpSuccessBody, TokenPayload, TokenStorage } from './types';
import { isHttpFailureBody, unwrapBody } from './unwrap';

const REFRESH_RELATIVE = listPath(ApiPaths.usersAuthTokenRefresh);

function isAuthFreeRequest(config: InternalAxiosRequestConfig): boolean {
  const u = `${config.baseURL ?? ''}${config.url ?? ''}`;
  return (
    u.includes(ApiPaths.usersAuthLogin) ||
    u.includes(ApiPaths.usersAuthRegister) ||
    u.includes(ApiPaths.usersAuthTokenRefresh)
  );
}

/**
 * Request: Authorization: Bearer access.
 * Response 401: один refresh + повтор запроса; параллельные 401 ждут один refresh.
 */
export function attachAuthInterceptors(
  client: AxiosInstance,
  storage: TokenStorage,
  onAuthFailure?: () => void | Promise<void>,
): void {
  let refreshPromise: Promise<string | null> | null = null;

  const runRefresh = async (): Promise<string | null> => {
    const refresh = await storage.getRefreshToken();
    if (!refresh) {
      await storage.clearTokens();
      await onAuthFailure?.();
      return null;
    }

    const url = apiPath(REFRESH_RELATIVE);
    try {
      const { data } = await axios.post<HttpSuccessBody<TokenPayload>>(
        `${String(client.defaults.baseURL ?? '').replace(/\/$/, '')}${url}`,
        { refresh },
        {
          headers: { 'Content-Type': 'application/json' },
        },
      );

      if (isHttpFailureBody(data)) {
        await storage.clearTokens();
        await onAuthFailure?.();
        return null;
      }

      const tokens = unwrapBody<TokenPayload>(data);
      await storage.setTokens({
        access: tokens.access,
        refresh: tokens.refresh,
      });
      return tokens.access;
    } catch {
      await storage.clearTokens();
      await onAuthFailure?.();
      return null;
    }
  };

  client.interceptors.request.use(async (config) => {
    if (isAuthFreeRequest(config)) return config;
    const token = await storage.getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  client.interceptors.response.use(
    (res) => res,
    async (error: AxiosError) => {
      const original = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

      if (
        error.response?.status !== 401 ||
        !original ||
        original._retry ||
        isAuthFreeRequest(original)
      ) {
        return Promise.reject(error);
      }

      original._retry = true;

      if (!refreshPromise) {
        refreshPromise = runRefresh().finally(() => {
          refreshPromise = null;
        });
      }

      const newAccess = await refreshPromise;
      if (!newAccess) {
        return Promise.reject(error);
      }

      original.headers.Authorization = `Bearer ${newAccess}`;
      return client(original);
    },
  );
}
