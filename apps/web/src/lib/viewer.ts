import type { UsersDetailData } from '@shared-packages/api';

/**
 * Текущий пользователь для RSC (после появления cookie/session сюда же).
 * Сейчас всегда null — маршруты публичные, логика «авторизован / нет» будет позже.
 */
export async function fetchViewerForPage(): Promise<UsersDetailData | null> {
  // TODO: прочитать сессию/cookie и при необходимости вызвать API профиля.
  return null;
}
