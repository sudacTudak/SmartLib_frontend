/**
 * Query list: `StaffListQueryParams` (libraryId, positionId, email, permissions).
 */
export type StaffListParams = {
  libraryId?: string;
  positionId?: string;
  email?: string;
  permissions?: string | string[];
};

/** `ReadUserPermissionsSerializer`: id + code (enum `UserPermissions`). */
export type StaffPermission = { id: string; code: number };

/**
 * `GetStaffSerializer` — list / retrieve / после `update-permissions`.
 */
export type Staff = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  patronymic: string;
  gender: string;
  role: string;
  libraryBranchId: string | null;
  positionId: string | null;
  userPermissions: StaffPermission[];
};

export type StaffListData = Staff[];
export type StaffDetailData = Staff;

/**
 * `CreateStaffSerializer` — ответ 201: поля без `password` (write_only);
 * `id` в Meta не указан — в JSON может не быть, пока не добавят в сериализатор.
 */
export type StaffCreateResponseData = {
  email: string;
  firstName: string;
  lastName: string;
  patronymic: string;
  gender: string;
  role: string;
  libraryBranchId: string;
  positionId: string;
};

/**
 * `UpdateStaffSerializer` — PATCH: email, firstName, lastName, patronymic, gender.
 */
export type StaffPatchBody = Partial<
  Pick<Staff, 'email' | 'firstName' | 'lastName' | 'patronymic' | 'gender'>
>;

export type StaffCreateBody = Record<string, unknown>;

/** Тело ответа PATCH — только поля из `UpdateStaffSerializer`. */
export type StaffPatchData = StaffPatchBody;

/** `UpdateUserPermissionSerializer` + ответ `GetStaffSerializer`. */
export type StaffUpdatePermissionsBody = { permissions: number[] };
export type StaffUpdatePermissionsData = Staff;

/** Стандартный destroy — 204 / `data: null`. */
export type StaffDeleteData = null;
