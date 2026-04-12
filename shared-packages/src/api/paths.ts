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
  usersStaff: 'users/staff',
  books: 'books',
  bookBases: 'books/book-bases',
  genre: 'books/genre',
  book: 'books/book',
  bookByLibrary: 'books/book/by-library',
  libs: 'libs',
  libBranch: 'libs/branch',
  bookLoans: 'book-loans',
  positions: 'positions',
  inventory: 'inventory',
  inventoryMovements: 'inventory/movements',
  suppliers: 'suppliers',
  amenities: 'amenities',
  amenityVendors: 'amenities/vendors',
} as const;

/** DRF collection list: `segment/` */
export function listPath(segment: string): string {
  return `${segment}/`;
}

/** DRF detail: `segment/id/` */
export function detailPath(segment: string, id: string | number): string {
  return `${segment}/${id}/`;
}

/** Кастомное действие на объекте: `segment/id/action/` */
export function actionPath(
  segment: string,
  id: string | number,
  action: string,
): string {
  return `${segment}/${id}/${action}/`;
}
