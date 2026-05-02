import type { IsoDateTimeString } from '../../types';

/**
 * `LibraryBranchSerializer` — `fields = '__all__'`: id, address, created_at, updated_at.
 * Destroy в ViewSet не подключён — только list / retrieve / create / partial_update.
 */
export interface ILibraryBranch {
  id: string;
  address: string;
  previewLink: string | null;
  createdAt: IsoDateTimeString;
  updatedAt: IsoDateTimeString;
  /** Агрегат по отзывам (GET list/retrieve; при write-ответах может отсутствовать). */
  ratingAvg?: number | null;
  ratingCount?: number;
}

export type TLibraryBranchListData = ILibraryBranch[];
export type TLibraryBranchDetailData = ILibraryBranch;
export type TLibraryBranchCreateBody = Pick<ILibraryBranch, 'address'>;
export type TLibraryBranchPatchBody = Partial<TLibraryBranchCreateBody>;

export type TLibraryBranchListParams = Record<string, string | number | boolean | undefined>;
