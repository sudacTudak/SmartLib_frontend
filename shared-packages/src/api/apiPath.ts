/** Совпадает с `API_PATH_PREFIX` в бэкенде (`smartlib_backend/constants.py`). */
export const API_PATH_PREFIX = 'api/v1' as const;

/** Путь вида `/api/v1/...` для axios с `baseURL` = origin API. */
export function apiPath(suffix: string): string {
  const s = suffix.replace(/^\//, '');
  return `/${API_PATH_PREFIX}/${s}`;
}
