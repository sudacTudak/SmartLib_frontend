import axios, { type AxiosInstance } from 'axios';

/** Совпадает с `API_PATH_PREFIX` в бэкенде (`smartlib_backend/constants.py`). */
export const API_PATH_PREFIX = 'api/v1' as const;

/** Путь вида `/api/v1/...` для запросов к axios-клиенту с `baseURL` = origin API. */
export function apiPath(suffix: string): string {
  const s = suffix.replace(/^\//, '');
  return `/${API_PATH_PREFIX}/${s}`;
}

/**
 * HTTP-клиент на axios: `baseURL` = origin (без `/api/v1`).
 * Пример: `client.get(apiPath('users/login')`, `client.post(apiPath('users/register'), data)`.
 */
export function createClient(baseOrigin: string): AxiosInstance {
  const baseURL = baseOrigin.replace(/\/$/, '');
  return axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: false,
  });
}

export type { AxiosInstance };
