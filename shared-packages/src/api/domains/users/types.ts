import { Gender } from '@shared-packages/enums';
import type { IsoDateTimeString } from '../../types';

/**
 * `GetUserPublicSerializer` — users list / retrieve.
 * Поля: id, email, first_name, last_name, patronymic, gender, is_active, created_at
 */
export type UserPublic = {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  patronymic: string;
  gender: Gender;
  is_active: boolean;
  created_at: IsoDateTimeString;
};

export type UsersListData = UserPublic[];
export type UsersDetailData = UserPublic;

/** Query list: см. `UsersViewSet` (без pydantic — произвольные query). */
export type UsersListParams = Record<string, string | number | boolean | undefined>;
