import type { IsoDateTimeString } from '../../types';

/**
 * `LibraryBranchSerializer` — `fields = '__all__'`: id, address, created_at, updated_at.
 * Destroy в ViewSet не подключён — только list / retrieve / create / partial_update.
 */
export type LibraryBranch = {
  id: string;
  address: string;
  createdAt: IsoDateTimeString;
  updatedAt: IsoDateTimeString;
};

export type LibraryBranchListData = LibraryBranch[];
export type LibraryBranchDetailData = LibraryBranch;
export type LibraryBranchCreateBody = Pick<LibraryBranch, 'address'>;
export type LibraryBranchPatchBody = Partial<LibraryBranchCreateBody>;

export type LibraryBranchListParams = Record<string, string | number | boolean | undefined>;
