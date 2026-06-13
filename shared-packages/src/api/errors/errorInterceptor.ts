import { SmartlibApiError } from '@shared-packages/api/errors/smartlibApiError';
import { HttpStatusCode } from '@shared-packages/api/statusCodes';
import { AxiosError, AxiosInstance } from 'axios';

function errorInterceptor(error: unknown) {
  // Порядок проверок здесь важен. Сначала наследник, потом - предок.
  if (error instanceof AxiosError) {
    return Promise.reject(SmartlibApiError.fromAxiosError(error));
  }

  if (error instanceof Error) {
    return Promise.reject(SmartlibApiError.fromError(error, HttpStatusCode.InternalServerError));
  }

  return Promise.reject(error);
}

export function createErrorInterceptor(client: AxiosInstance) {
  client.interceptors.response.use(null, errorInterceptor);
}
