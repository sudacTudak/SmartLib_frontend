import type { TokenStorage } from './types';

/** Простой in-memory store (для тестов или до подключения localStorage). */
export function createMemoryTokenStorage(): TokenStorage & {
  /** Для отладки */
  snapshot: () => { access: string | null; refresh: string | null };
} {
  let access: string | null = null;
  let refresh: string | null = null;

  return {
    getAccessToken: async () => access,
    getRefreshToken: async () => refresh,
    setTokens: async (tokens) => {
      access = tokens.access;
      if (tokens.refresh !== undefined) refresh = tokens.refresh;
    },
    clearTokens: async () => {
      access = null;
      refresh = null;
    },
    snapshot: () => ({ access, refresh }),
  };
}
