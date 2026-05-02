import { createSmartlibApi, createSmartlibHttpClient, type SmartlibApi } from '@shared-packages/api';

import { getPublicApiOrigin } from './env';

/**
 * Публичный API без токена — для Server Components и generateStaticParams.
 * Не используйте для приватных действий; авторизация позже через отдельный клиент с cookie.
 */
export function getPublicServerApi(): SmartlibApi {
  const client = createSmartlibHttpClient({
    baseOrigin: getPublicApiOrigin(),
  });
  return createSmartlibApi(client);
}
