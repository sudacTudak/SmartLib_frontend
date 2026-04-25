import type { AxiosInstance } from 'axios';
import { createAmenitiesApi } from './domains/amenities';
import { createAuthorsApi } from './domains/authors';
import { createAuthApi } from './domains/auth';
import { createBookLoansApi } from './domains/book-loans';
import { createBooksApi } from './domains/books';
import { createFeedbackApi } from './domains/feedback';
import { createInventoryApi } from './domains/inventory';
import { createLibrariesApi } from './domains/libraries';
import { createPositionsApi } from './domains/positions';
import { createStaffApi } from './domains/staff';
import { createSuppliersApi } from './domains/suppliers';
import { createUsersApi } from './domains/users';

/** Типизированные вызовы к API по доменам (см. `smartlib_backend` URLs). */
export function createSmartlibApi(client: AxiosInstance) {
  return {
    auth: createAuthApi(client),
    users: createUsersApi(client),
    staff: createStaffApi(client),
    authors: createAuthorsApi(client),
    books: createBooksApi(client),
    libraries: createLibrariesApi(client),
    bookLoans: createBookLoansApi(client),
    feedback: createFeedbackApi(client),
    positions: createPositionsApi(client),
    inventory: createInventoryApi(client),
    suppliers: createSuppliersApi(client),
    amenities: createAmenitiesApi(client),
  };
}

export type SmartlibApi = ReturnType<typeof createSmartlibApi>;
