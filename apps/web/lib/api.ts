import { createClient } from '@shared-packages/api';
import { getPublicApiOrigin } from './env';

let client: ReturnType<typeof createClient> | null = null;

export function getApiClient() {
  if (!client) {
    client = createClient(getPublicApiOrigin());
  }
  return client;
}
