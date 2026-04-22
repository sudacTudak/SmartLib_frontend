import { Gender } from '@shared-packages/enums';
import type { IsoDateTimeString } from '../../types';

/**
 * `GetUserPublicSerializer` — users list / retrieve.
 * Поля: id, email, firstName, lastName, patronymic, gender, isActive, createdAt
 */
export type UserPublic = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  patronymic: string;
  gender: Gender;
  isActive: boolean;
  createdAt: IsoDateTimeString;
};

export type UsersListData = UserPublic[];
export type UsersDetailData = UserPublic;

/** Query list: см. `UsersViewSet` (без pydantic — произвольные query). */
export type UsersListParams = Record<string, string | number | boolean | undefined>;
