import type { AxiosResponse } from 'axios';
import type { HttpFailureBody, HttpSuccessBody } from './types';

export function isHttpSuccessBody(x: unknown): x is HttpSuccessBody {
  return (
    typeof x === 'object' &&
    x !== null &&
    'statusCode' in x &&
    'data' in x &&
    typeof (x as HttpSuccessBody).statusCode === 'number'
  );
}

export function isHttpFailureBody(x: unknown): x is HttpFailureBody {
  return (
    typeof x === 'object' &&
    x !== null &&
    'statusCode' in x &&
    'message' in x &&
    typeof (x as HttpFailureBody).message === 'string'
  );
}

/** Достаёт `data` из обёртки бэкенда; если пришёл «сырой» объект — возвращает как есть. */
export function unwrapBody<T>(body: unknown): T {
  if (isHttpSuccessBody(body)) {
    return body.data as T;
  }
  return body as T;
}

/** Как `unwrapBody`, но из ответа axios. */
export function unwrapData<T>(response: AxiosResponse<unknown>): T {
  return unwrapBody<T>(response.data);
}
