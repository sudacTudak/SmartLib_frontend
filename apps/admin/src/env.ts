/**
 * Origin бэкенда без завершающего слэша.
 * Переопределите в `.env.local`: `VITE_API_BASE_URL=http://127.0.0.1:8000`
 */
export function getPublicApiOrigin(): string {
  const url = import.meta.env.VITE_API_BASE_URL ?? 'http://127.0.0.1:8000';
  return url.replace(/\/$/, '');
}
