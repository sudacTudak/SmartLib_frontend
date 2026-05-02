import {
  createSmartlibApi,
  createSmartlibAuthSession,
  createSmartlibHttpClient,
  TokenApi,
  type SmartlibApi,
  type SmartlibAuthSession,
} from '@shared-packages/api';
import type { AxiosInstance } from '@shared-packages/api';
import { getPublicApiOrigin } from './env';

let client: AxiosInstance | null = null;
let api: SmartlibApi | null = null;
let authSession: SmartlibAuthSession | null = null;

const tokenApi = TokenApi.getInstance();

let onAuthFailure: (() => void) | undefined;

export function setAuthFailureHandler(handler: (() => void) | undefined): void {
  onAuthFailure = handler;
}

export function getApiClient(): AxiosInstance {
  if (!client) {
    client = createSmartlibHttpClient({
      baseOrigin: getPublicApiOrigin(),
      tokenStorage: tokenApi,
      onAuthFailure: () => onAuthFailure?.(),
    });
  }
  return client;
}

export function getSmartlibApi(): SmartlibApi {
  if (!api) {
    api = createSmartlibApi(getApiClient());
  }
  return api;
}

/** Логин / логаут / явный refresh поверх того же клиента и `tokenApi`. */
export function getAuthSession(): SmartlibAuthSession {
  if (!authSession) {
    authSession = createSmartlibAuthSession({
      client: getApiClient(),
      storage: tokenApi,
      onAuthFailure: () => onAuthFailure?.(),
    });
  }
  return authSession;
}

export { tokenApi };
