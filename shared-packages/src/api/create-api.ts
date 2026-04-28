import type { AxiosInstance } from 'axios';
import { createAmenitiesApi } from './domains/amenities';
import { createAuthorsApi } from './domains/authors';
import { createAuthApi } from './domains/auth';
import { createWorkLoansApi } from './domains/work-loans';
import { createWorksApi } from './domains/works';
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
    works: createWorksApi(client),
    libraries: createLibrariesApi(client),
    workLoans: createWorkLoansApi(client),
    feedback: createFeedbackApi(client),
    positions: createPositionsApi(client),
    inventory: createInventoryApi(client),
    suppliers: createSuppliersApi(client),
    amenities: createAmenitiesApi(client),
  };
}

export type SmartlibApi = ReturnType<typeof createSmartlibApi>;
