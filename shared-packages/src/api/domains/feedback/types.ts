import type { IsoDateTimeString } from '../../types';

/**
 * `WorkFeedback` / `LibraryBranchFeedback` на бэке.
 */
export interface IWorkFeedback {
  id: string;
  workId: string;
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

export type TWorkFeedbackListData = IWorkFeedback[];
export type TWorkFeedbackDetailData = IWorkFeedback;
export type TWorkFeedbackByUserData = IWorkFeedback[];
export type TLibraryBranchFeedbackListData = ILibraryBranchFeedback[];
export type TLibraryBranchFeedbackDetailData = ILibraryBranchFeedback;
export type TLibraryBranchFeedbackByUserData = ILibraryBranchFeedback[];

export type TWorkFeedbackCreateBody = Pick<IWorkFeedback, 'workId' | 'score'> & {
  comment?: string | null;
};
export type TWorkFeedbackPatchBody = Partial<Pick<IWorkFeedback, 'score'>> & { comment?: string | null };

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
export interface IWorkFeedbackParentParams {
  workId?: string;
}
export interface ILibraryBranchFeedbackParentParams {
  libraryBranchId?: string;
}
