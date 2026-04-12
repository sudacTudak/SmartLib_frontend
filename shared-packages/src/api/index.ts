export { API_PATH_PREFIX, apiPath } from './apiPath';

export { ApiPaths, regularPath as listPath, detailPath, actionPath } from './paths';

export type {
  TokenStorage,
  TokenPayload,
  EmptySuccessData,
  CreateSmartlibHttpClientOptions,
  HttpSuccessBody,
  HttpFailureBody,
  ResourceListParams,
  IsoDateTimeString,
  IsoDateString,
} from './types';

export { unwrapBody, unwrapData, isHttpSuccessBody, isHttpFailureBody } from './unwrap';

export { createSmartlibHttpClient, createClient } from './create-client';

export { createSmartlibApi, type SmartlibApi } from './create-api';

export type { AxiosInstance } from 'axios';

export { createMemoryTokenStorage } from './token-storage-memory';

export { TokenApi, SMARTLIB_REFRESH_TOKEN_STORAGE_KEY } from './token-api';

export { refreshTokensWithStorage } from './auth-interceptor';

export {
  createSmartlibAuthSession,
  type SmartlibAuthSession,
  type CreateSmartlibAuthSessionOptions,
} from './auth-session';

export { createAuthApi } from './domains/auth';
export { createUsersApi } from './domains/users';
export { createStaffApi } from './domains/staff';
export { createBooksApi } from './domains/books';
export { createLibrariesApi } from './domains/libraries';
export { createBookLoansApi } from './domains/book-loans';
export { createPositionsApi } from './domains/positions';
export { createInventoryApi } from './domains/inventory';
export { createSuppliersApi } from './domains/suppliers';
export { createAmenitiesApi } from './domains/amenities';

export type { LoginBody, RegisterBody, LogoutBody, ChangePasswordBody, ResetPasswordBody } from './domains/auth';

export type { UserPublic, UsersListParams, UsersListData, UsersDetailData } from './domains/users';

export type {
  BookBasis,
  BookListQueryParams,
  BookBasisListData,
  BookBasisDetailData,
  BookBasisCreateBody,
  BookBasisPatchBody,
  BookBasisDeleteData,
  Genre,
  GenreListData,
  GenreDetailData,
  GenreCreateBody,
  GenrePatchBody,
  GenreDeleteData,
  BookByLibrary,
  BookDetailData,
  BookByLibraryParams,
  BookByLibraryListData,
} from './domains/books';

export type {
  StaffPermission,
  Staff,
  StaffListParams,
  StaffListData,
  StaffDetailData,
  StaffCreateBody,
  StaffCreateResponseData,
  StaffPatchBody,
  StaffPatchData,
  StaffDeleteData,
  StaffUpdatePermissionsBody,
  StaffUpdatePermissionsData,
} from './domains/staff';

export type {
  LibraryBranch,
  LibraryBranchListParams,
  LibraryBranchListData,
  LibraryBranchDetailData,
  LibraryBranchCreateBody,
  LibraryBranchPatchBody,
} from './domains/libraries';

export type {
  BookLoan,
  BookLoanListParams,
  BookLoanListData,
  BookLoanDetailData,
  BookLoanCreateBody,
  BookLoanCreateResponseData,
  BookLoanProlongBody,
  BookLoanProlongData,
} from './domains/book-loans';

export type {
  Position,
  PositionListParams,
  PositionListData,
  PositionDetailData,
  PositionCreateBody,
  PositionPatchBody,
  PositionWriteResponseData,
  PositionDeleteData,
} from './domains/positions';

export type {
  InventoryMovement,
  InventoryMovementListParams,
  InventoryMovementListData,
  InventoryMovementCreateBody,
  InventoryMovementCreateResponseData,
} from './domains/inventory';

export type {
  Supplier,
  SupplierListParams,
  SupplierListData,
  SupplierDetailData,
  SupplierCreateBody,
  SupplierPatchBody,
  SupplierDeleteData,
} from './domains/suppliers';

export type {
  AmenityVendor,
  Amenity,
  AmenityWriteResponse,
  AmenityListParams,
  AmenityListData,
  AmenityDetailData,
  AmenityCreateBody,
  AmenityPatchBody,
  AmenityDeleteData,
  AmenityVendorListData,
  AmenityVendorDetailData,
  AmenityVendorCreateBody,
  AmenityVendorPatchBody,
  AmenityVendorWriteResponse,
  AmenityVendorDeleteData,
} from './domains/amenities';
