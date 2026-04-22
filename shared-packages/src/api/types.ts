/** ISO-8601 datetime в JSON от DRF. */
export type IsoDateTimeString = string;

/** Дата `YYYY-MM-DD` в JSON. */
export type IsoDateString = string;

/** Как в `http_core.response_body` (успех). */
export type HttpSuccessBody<T = unknown> = {
  statusCode: number;
  data: T;
};

/** Как в `http_core.response_body` (ошибка). */
export type HttpFailureBody = {
  statusCode: number;
  message: string;
  data?: unknown;
};

/** Пара access + refresh в ответах login и token refresh (JWT). */
export type TokenPayload = {
  access: string;
  refresh: string;
};

/** Пустое `data` в успешном ответе (register, logout, change-password). */
export type EmptySuccessData = null;

/** Хранение токенов задаёт приложение (memory, localStorage, cookie и т.д.). */
export type TokenStorage = {
  getAccessToken: () => string | null | Promise<string | null>;
  getRefreshToken: () => string | null | Promise<string | null>;
  /** Сохранить новые токены после login / refresh (refresh опционален, если бэкенд не ротирует). */
  setTokens: (tokens: { access: string; refresh?: string }) => void | Promise<void>;
  clearTokens: () => void | Promise<void>;
};

export type CreateSmartlibHttpClientOptions = {
  baseOrigin: string;
  /** Без него interceptors не ставят Authorization и не делают refresh. */
  tokenStorage?: TokenStorage;
  /** Вызывается, если refresh не удался или 401 на эндпоинте без refresh. */
  onAuthFailure?: () => void | Promise<void>;
};

/** Query для DRF list (`?page=`, фильтры и т.д.). */
export type ResourceListParams = Record<string, string | number | boolean | undefined>;
