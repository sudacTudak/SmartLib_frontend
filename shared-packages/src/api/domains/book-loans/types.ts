import { BookLoanStatus } from '@shared-packages/enums';
import type { IsoDateString, IsoDateTimeString } from '../../types';

/**
 * `BookLoanReadSerializer` — list / retrieve / create / prolong.
 */
export type BookLoan = {
  id: string;
  bookId: string;
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

export type BookLoanListData = BookLoan[];
export type BookLoanDetailData = BookLoan;
export type BookLoanCreateResponseData = BookLoan;
export type BookLoanProlongData = BookLoan;

/**
 * `BookLoanWriteSerializer` — тело POST create (FK и поля клиента).
 */
export type BookLoanCreateBody = Record<string, unknown>;

/** Prolong: `BookLoanProlongSerializer` — prolong_time (ms). */
export type BookLoanProlongBody = { prolongTime: number };

export type BookLoanListParams = Record<string, string | number | boolean | undefined>;
