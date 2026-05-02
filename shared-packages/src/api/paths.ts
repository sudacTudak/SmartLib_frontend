/**
 * Сегменты путей под `api/v1` (как в smartlib_backend).
 * Сборка: `apiPath(listPath(ApiPaths.users))`, `apiPath(detailPath(ApiPaths.genre, id))` и т.д.
 */

export const ApiPaths = {
  users: 'users',
  usersAuth: 'users/auth',
  usersAuthToken: 'users/auth/token',
  usersAuthTokenRefresh: 'users/auth/token/refresh',
  usersAuthLogin: 'users/auth/login',
  usersAuthRegister: 'users/auth/register',
  usersAuthLogout: 'users/auth/logout',
  usersAuthResetPassword: 'users/auth/reset-password',
  usersProfile: 'users/profile',
  usersStaff: 'users/staff',
  authors: 'authors',
  works: 'works',
  genre: 'works/genre',
  workItems: 'works/work-items',
  workItemsByLibrary: 'works/work-items/by-library',
  workItemsByWork: 'works/work-items/by-work',
  libs: 'libs',
  libBranch: 'libs/branch',
  workLoans: 'work-loans',
  positions: 'positions',
  inventory: 'inventory',
  inventoryMovements: 'inventory/movements',
  suppliers: 'suppliers',
  amenities: 'amenities',
  amenityVendors: 'amenities/vendors',
  /** Отзывы: `api/v1/feedback/...` (см. `feedback/urls.py` на бэке). */
  feedbackWorks: 'feedback/works',
  feedbackLibs: 'feedback/libs',
} as const;

/** DRF collection list: `segment/` */
export function regularPath(segment: string): string {
  return `${segment}/`;
}

/** DRF detail: `segment/id/` */
export function detailPath(segment: string, id: string | number): string {
  return `${segment}/${id}/`;
}

/** Кастомное действие на объекте: `segment/id/action/` */
export function actionPath(segment: string, id: string | number, action: string): string {
  return `${segment}/${id}/${action}/`;
}
