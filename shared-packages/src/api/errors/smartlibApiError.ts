import { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { HttpStatusCode, HttpStatusCodeToName } from './../statusCodes';
import { isHttpFailureBody } from '@shared-packages/api/unwrap';

interface ISmartlibApiErrorParams {
  statusCode: HttpStatusCode;
  message: string;
  data?: unknown;
  cause?: Error;
  config?: InternalAxiosRequestConfig;
  response?: AxiosResponse;
  request?: unknown;
}

export class SmartlibApiError extends Error {
  statusCode: HttpStatusCode;
  statusTitle: string;
  message: string;
  data?: unknown;
  cause?: Error;
  config?: InternalAxiosRequestConfig;
  response?: AxiosResponse;
  request?: unknown;

  constructor({ statusCode, message, data, cause, config, response, request }: ISmartlibApiErrorParams) {
    super(cause?.message, cause);

    this.statusCode = statusCode;
    this.statusTitle = HttpStatusCodeToName[statusCode];
    this.data = data;
    this.message = message;
    this.cause = cause;
    this.config = config;
    this.response = response;
    this.request = request;
  }

  static fromAxiosError(error: AxiosError): SmartlibApiError {
    return new SmartlibApiError({
      statusCode: error.response?.status ?? 500,
      message: error.message,
      data: error.response?.data,
      cause: error,
      config: error.config,
      response: error.response,
      request: error.request,
    });
  }

  static fromError(error: Error, statusCode: number, data?: unknown): SmartlibApiError {
    const { message, cause } = error;

    return new SmartlibApiError({
      statusCode,
      message,
      cause: cause as Error | undefined,
      data,
    });
  }

  static isSmartlibApiError(error: unknown): error is SmartlibApiError {
    return error instanceof SmartlibApiError;
  }

  get isResponseError() {
    return this.response !== undefined;
  }

  get isRequestError() {
    return this.request !== undefined;
  }

  get isApiFailureResponseData() {
    return isHttpFailureBody(this.data)
  }
}
