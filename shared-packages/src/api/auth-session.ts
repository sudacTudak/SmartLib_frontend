import type { AxiosInstance } from 'axios';

import { refreshTokensWithStorage } from './auth-interceptor';
import { createAuthApi } from './domains/auth';
import type { ChangePasswordBody, LoginBody, RegisterBody } from './domains/auth/types';
import type { EmptySuccessData, TokenPayload, TokenStorage } from './types';

export type CreateSmartlibAuthSessionOptions = {
  client: AxiosInstance;
  storage: TokenStorage;
  /** После неудачного refresh / очистки токенов (как в `createSmartlibHttpClient`). */
  onAuthFailure?: () => void | Promise<void>;
};

/**
 * Обёртка над `createAuthApi` + `TokenStorage`: логин/логаут с записью токенов, явный refresh.
 * Interceptors на `client` по-прежнему делают refresh при 401 — это дополняет, а не дублирует.
 */
export function createSmartlibAuthSession(options: CreateSmartlibAuthSessionOptions) {
  const { client, storage, onAuthFailure } = options;
  const auth = createAuthApi(client);

  return {
    async login(body: LoginBody): Promise<TokenPayload> {
      const tokens = await auth.login(body);
      await storage.setTokens({ access: tokens.access, refresh: tokens.refresh });
      return tokens;
    },

    register: (body: RegisterBody): Promise<EmptySuccessData> => auth.register(body),

    /**
     * Отзыв refresh на сервере (blacklist) и очистка хранилища.
     * Если refresh нет — только `clearTokens` локально.
     */
    async logout(): Promise<void> {
      const refresh = await storage.getRefreshToken();
      if (refresh) {
        try {
          await auth.logout({ refresh });
        } catch {
          // всё равно чистим локально
        }
      }
      await storage.clearTokens();
    },

    /** Явное обновление пары токенов (bootstrap, «продлить сессию»). */
    refreshTokens(): Promise<string | null> {
      const baseOrigin = String(client.defaults.baseURL ?? '');
      return refreshTokensWithStorage(baseOrigin, storage, onAuthFailure);
    },

    /** Записать токены без вызова login (если пара уже есть). */
    async setSessionTokens(tokens: TokenPayload): Promise<void> {
      await storage.setTokens({ access: tokens.access, refresh: tokens.refresh });
    },

    changePassword: (userId: string | number, body: ChangePasswordBody) => auth.changePassword(userId, body),
  };
}

export type SmartlibAuthSession = ReturnType<typeof createSmartlibAuthSession>;
