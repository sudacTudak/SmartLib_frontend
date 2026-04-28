import { BookLoanStatus } from '@shared-packages/enums';
import type { IsoDateString, IsoDateTimeString } from '../../types';

/**
 * `WorkLoanReadSerializer` — list / retrieve / create / prolong.
 */
export type WorkLoan = {
  id: string;
  workItemId: string;
  libraryBranchId: string;
  clientId: string | null;
  clientPhone: string;
  clientEmail: string | null;
  clientFullname: string;
  loanedTill: IsoDateString;
  status: BookLoanStatus;
  closedAt: IsoDateTimeString | null;
  createdAt: IsoDateTimeString;
  updatedAt: IsoDateTimeString;
  createdById: string | null;
};

export type WorkLoanListData = WorkLoan[];
export type WorkLoanDetailData = WorkLoan;
export type WorkLoanCreateResponseData = WorkLoan;
export type WorkLoanProlongData = WorkLoan;

/**
 * `WorkLoanWriteSerializer` — тело POST create (FK и поля клиента).
 */
export type WorkLoanCreateBody = Record<string, unknown>;

/** Prolong: `WorkLoanProlongSerializer` — prolong_time (ms). */
export type WorkLoanProlongBody = { prolongTime: number };

export type WorkLoanListParams = Record<string, string | number | boolean | undefined>;

