import axios, { type AxiosInstance } from 'axios';
import { createAuthInterceptors } from './auth';
import type { CreateSmartlibHttpClientOptions } from './types';
import { createErrorInterceptor } from '@shared-packages/api/errors/errorInterceptor';

/**
 * HTTP-клиент: `baseURL` = origin (без `/api/v1`); пути строятся внутри `ApiResource`.
 * При переданном `tokenStorage` — Authorization и refresh при 401.
 */
export function createSmartlibHttpClient(options: CreateSmartlibHttpClientOptions): AxiosInstance {
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

  createErrorInterceptor(client);
  if (options.tokenStorage) {
    createAuthInterceptors(client, options.tokenStorage, options.onAuthFailure);
  }

  return client;
}
