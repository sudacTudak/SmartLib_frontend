import axios from 'axios';

/** Разбор тела ответа `http_core` / axios для показа после неудачного submit. */
export function defaultResolveSubmitError(error: unknown, fallback = 'Произошла ошибка. Попробуйте снова.'): string {
  if (axios.isAxiosError(error) && error.response?.data && typeof error.response.data === 'object') {
    const d = error.response.data as { message?: unknown };
    if (typeof d.message === 'string' && d.message.length > 0) {
      return d.message;
    }
  }
  return fallback;
}
