import type { IsoDateString, IsoDateTimeString } from '../../types';

/** `BookLoanStatus` — int enum на бэкенде. */
export type BookLoanStatusCode = 0 | 1;

/**
 * `BookLoanReadSerializer` — list / retrieve / create / prolong.
 */
export type BookLoan = {
  id: string;
  book_id: string;
  library_branch_id: string;
  client_id: string | null;
  client_phone: string;
  client_email: string | null;
  client_fullname: string;
  loaned_till: IsoDateString;
  status: BookLoanStatusCode;
  closed_at: IsoDateTimeString | null;
  created_at: IsoDateTimeString;
  updated_at: IsoDateTimeString;
  created_by_id: string | null;
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
export type BookLoanProlongBody = { prolong_time: number };

export type BookLoanListParams = Record<string, string | number | boolean | undefined>;
