import {
  createMemoryTokenStorage,
  createSmartlibApi,
  createSmartlibHttpClient,
  type SmartlibApi,
} from '@shared-packages/api';
import type { AxiosInstance } from '@shared-packages/api';
import { getPublicApiOrigin } from './env';

let client: AxiosInstance | null = null;
let api: SmartlibApi | null = null;

const tokenStorage = createMemoryTokenStorage();

export function getApiClient(): AxiosInstance {
  if (!client) {
    client = createSmartlibHttpClient({
      baseOrigin: getPublicApiOrigin(),
      tokenStorage,
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

export { tokenStorage as adminTokenStorage };
