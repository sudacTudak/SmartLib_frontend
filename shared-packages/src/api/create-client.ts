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
    /** С tokenStorage нужны cookie (HttpOnly refresh) на тот же API-origin. */
    withCredentials: options.tokenStorage ? true : false,
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
