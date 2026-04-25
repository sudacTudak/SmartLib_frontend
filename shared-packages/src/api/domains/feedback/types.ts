import type { IsoDateTimeString } from '../../types';

/**
 * `BookBasisFeedback` / `LibraryBranchFeedback` на бэке.
 * JSON отдаётся в camelCase (`clientId`, `bookBasisId`, `libraryBranchId`, ...).
 */
export interface IBookBasisFeedback {
  id: string;
  bookBasisId: string;
  clientId: string;
  score: number;
  comment: string | null;
  createdAt: IsoDateTimeString;
  updatedAt: IsoDateTimeString;
}

export interface ILibraryBranchFeedback {
  id: string;
  libraryBranchId: string;
  clientId: string;
  score: number;
  comment: string | null;
  createdAt: IsoDateTimeString;
  updatedAt: IsoDateTimeString;
}

export type TBookBasisFeedbackListData = IBookBasisFeedback[];
export type TBookBasisFeedbackDetailData = IBookBasisFeedback;
export type TBookBasisFeedbackByUserData = IBookBasisFeedback[];
export type TLibraryBranchFeedbackListData = ILibraryBranchFeedback[];
export type TLibraryBranchFeedbackDetailData = ILibraryBranchFeedback;
export type TLibraryBranchFeedbackByUserData = ILibraryBranchFeedback[];

export type TBookBasisFeedbackCreateBody = Pick<IBookBasisFeedback, 'bookBasisId' | 'score'> & {
  comment?: string | null;
};
export type TBookBasisFeedbackPatchBody = Partial<Pick<IBookBasisFeedback, 'score'>> & { comment?: string | null };

export type TLibraryBranchFeedbackCreateBody = Pick<ILibraryBranchFeedback, 'libraryBranchId' | 'score'> & {
  comment?: string | null;
};
export type TLibraryBranchFeedbackPatchBody = Partial<Pick<ILibraryBranchFeedback, 'score'>> & {
  comment?: string | null;
};

/** GET `.../by-user` — staff может запросить чужой `clientId`, клиенту параметр не нужен. */
export interface IFeedbackByUserParams {
  clientId?: string;
}

/** Query: опциональная фильтрация list / by-user по книге / филиалу. */
export interface IBookBasisFeedbackParentParams {
  bookBasisId?: string;
}
export interface ILibraryBranchFeedbackParentParams {
  libraryBranchId?: string;
}
