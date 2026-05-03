'use client';

import type { UsersDetailData } from '@shared-packages/api';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { AuthStatus } from './enums';
import { getAuthSession, getSmartlibApi, setAuthFailureHandler, tokenApi } from '../api';

// import { AuthStatus } from 'src/lib/auth/enums';
// import { getAuthSession, getSmartlibApi, setAuthFailureHandler, tokenApi } from 'src/lib/api';

type AuthContextValue = {
  user: UsersDetailData | null;
  status: AuthStatus;
  /** Загрузить профиль по текущим токенам (после логина и т.д.). */
  refreshUser: () => Promise<void>;
  /** Очистить access в клиенте и пользователя (HttpOnly refresh сбрасывает только сервер / logout). */
  logoutLocal: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UsersDetailData | null>(null);
  const [status, setStatus] = useState(AuthStatus.Idle);

  useLayoutEffect(() => {
    setAuthFailureHandler(() => {
      setUser(null);
    });
    return () => setAuthFailureHandler(undefined);
  }, []);

  const refreshUser = useCallback(async () => {
    let effectiveAccess = await tokenApi.getAccessToken();
    if (!effectiveAccess) {
      effectiveAccess = await getAuthSession().refreshTokens();
    }

    if (!effectiveAccess) {
      setUser(null);
      return;
    }

    try {
      const detail = await getSmartlibApi().users.profile();
      setUser(detail);
    } catch {
      setUser(null);
    }
  }, []);

  const logoutLocal = useCallback(async () => {
    await tokenApi.clearTokens();
    setUser(null);
  }, []);

  useEffect(() => {
    let cancelled = false;
    async function bootstrap() {
      setStatus(AuthStatus.Loading);
      await refreshUser();
      if (!cancelled) setStatus(AuthStatus.Ready);
    }
    void bootstrap();
    return () => {
      cancelled = true;
    };
  }, [refreshUser]);

  const value = useMemo(
    () => ({
      user,
      status,
      refreshUser,
      logoutLocal,
    }),
    [user, status, refreshUser, logoutLocal],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth должен вызываться внутри AuthProvider');
  }
  return ctx;
}
