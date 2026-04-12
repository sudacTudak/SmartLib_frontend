import type { UsersDetailData } from '@shared-packages/api';

/**
 * Текущий пользователь для RSC (если когда-нибудь понадобится серверная сессия).
 * Сейчас профиль только на клиенте — см. `AuthProvider` / `useAuth`.
 */
export async function fetchViewerForPage(): Promise<UsersDetailData | null> {
  return null;
}
