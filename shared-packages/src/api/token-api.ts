import type { TokenStorage } from './types';

/**
 * Singleton для web: **access** в памяти; **refresh** — временно в `localStorage` (JSON в теле refresh-запроса).
 * Позже refresh перенесётся на HttpOnly — сигнатура `TokenStorage` останется.
 */
export class TokenApi implements TokenStorage {
  private static instance: TokenApi | null = null;

  /** Ключ localStorage (временно на время разработки). */
  static readonly REFRESH_TOKEN_STORAGE_KEY = 'smartlib.refreshToken';

  private access: string | null = null;

  private constructor() {}

  static getInstance(): TokenApi {
    if (!TokenApi.instance) {
      TokenApi.instance = new TokenApi();
    }
    return TokenApi.instance;
  }

  private readRefreshFromLocalStorage(): string | null {
    if (typeof window === 'undefined') return null;
    try {
      return window.localStorage.getItem(TokenApi.REFRESH_TOKEN_STORAGE_KEY);
    } catch {
      return null;
    }
  }

  private writeRefreshToLocalStorage(refresh: string): void {
    if (typeof window === 'undefined') return;
    try {
      window.localStorage.setItem(TokenApi.REFRESH_TOKEN_STORAGE_KEY, refresh);
    } catch {
      // квота / приватный режим
    }
  }

  private clearRefreshFromLocalStorage(): void {
    if (typeof window === 'undefined') return;
    try {
      window.localStorage.removeItem(TokenApi.REFRESH_TOKEN_STORAGE_KEY);
    } catch {
      // квота / приватный режим
    }
  }

  getAccessToken = async (): Promise<string | null> => this.access;

  getRefreshToken = async (): Promise<string | null> => this.readRefreshFromLocalStorage();

  setTokens = async (tokens: { access: string; refresh?: string }): Promise<void> => {
    this.access = tokens.access;
    if (tokens.refresh !== undefined) {
      if (tokens.refresh === '') {
        this.clearRefreshFromLocalStorage();
      } else {
        this.writeRefreshToLocalStorage(tokens.refresh);
      }
    }
  };

  clearTokens = async (): Promise<void> => {
    this.access = null;
    this.clearRefreshFromLocalStorage();
  };

  /** Снимок для отладки (не логировать в проде). */
  snapshot(): { access: string | null; refresh: string | null } {
    return { access: this.access, refresh: this.readRefreshFromLocalStorage() };
  }
}

/** То же, что `TokenApi.REFRESH_TOKEN_STORAGE_KEY` — для стабильного реэкспорта из пакета. */
export const SMARTLIB_REFRESH_TOKEN_STORAGE_KEY = TokenApi.REFRESH_TOKEN_STORAGE_KEY;
