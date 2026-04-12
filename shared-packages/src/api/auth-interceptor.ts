import axios, { type AxiosError, type AxiosInstance, type InternalAxiosRequestConfig } from 'axios';
import { apiPath } from './apiPath';
import { ApiPaths, regularPath } from './paths';
import type { HttpSuccessBody, TokenPayload, TokenStorage } from './types';
import { isHttpFailureBody, unwrapBody } from './unwrap';

const REFRESH_RELATIVE = regularPath(ApiPaths.usersAuthTokenRefresh);

const REFRESH_AXIOS_CONFIG = {
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
} as const;

/**
 * Обновить access по refresh.
 * - Если в storage есть refresh (memory / тесты) — тело `{ refresh }`.
 * - Если нет (HttpOnly в браузере) — пустое тело, cookie уходит с `withCredentials`
 *   (нужен соответствующий эндпоинт на бэкенде).
 */
export async function refreshTokensWithStorage(
  baseOrigin: string,
  storage: TokenStorage,
  onAuthFailure?: () => void | Promise<void>,
): Promise<string | null> {
  const refreshFromStorage = await storage.getRefreshToken();
  const baseURL = baseOrigin.replace(/\/$/, '');
  const url = `${baseURL}${apiPath(REFRESH_RELATIVE)}`;

  try {
    const { data } = refreshFromStorage
      ? await axios.post<HttpSuccessBody<TokenPayload>>(
          url,
          { refresh: refreshFromStorage },
          REFRESH_AXIOS_CONFIG,
        )
      : await axios.post<HttpSuccessBody<TokenPayload>>(url, {}, REFRESH_AXIOS_CONFIG);

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
}

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
    const baseOrigin = String(client.defaults.baseURL ?? '');
    return refreshTokensWithStorage(baseOrigin, storage, onAuthFailure);
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
