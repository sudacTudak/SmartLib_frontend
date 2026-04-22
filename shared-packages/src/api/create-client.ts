import axios, { type AxiosInstance } from 'axios';
import { attachAuthInterceptors } from './auth-interceptor';
import type { CreateSmartlibHttpClientOptions } from './types';

/**
 * HTTP-клиент: `baseURL` = origin (без `/api/v1`); пути через `apiPath(...)`.
 * При переданном `tokenStorage` — Authorization и refresh при 401.
 */
export function createSmartlibHttpClient(
  options: CreateSmartlibHttpClientOptions,
): AxiosInstance {
  const baseURL = options.baseOrigin.replace(/\/$/, '');
  const client = axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
    },
    /**
     * По умолчанию без credentials.
     * Credentials включаем точечно на auth-эндпоинтах (login/refresh/logout), чтобы:
     * - не требовать CORS credentials для всех запросов
     * - не отправлять cookies на каждый API вызов
     */
    withCredentials: false,
  });

  if (options.tokenStorage) {
    attachAuthInterceptors(
      client,
      options.tokenStorage,
      options.onAuthFailure,
    );
  }

  return client;
}

/** @deprecated Используйте `createSmartlibHttpClient`. */
export function createClient(baseOrigin: string): AxiosInstance {
  return createSmartlibHttpClient({ baseOrigin });
}
