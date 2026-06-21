import { WorkReservationStatus } from '@shared-packages/enums';
import type { IsoDateString, IsoDateTimeString } from '../../types';

/** Базовые поля read-сериализаторов брони. */
export interface IWorkReservation {
  id: string;
  clientId: string;
  workId: string;
  libraryBranchId: string;
  status: WorkReservationStatus;
  createdAt: IsoDateTimeString;
  reservedTill: IsoDateString;
  closedAt: IsoDateTimeString | null;
}

/** `ClientReadWorkReservationSerializer` — дополнительно index. */
export interface IClientWorkReservation extends IWorkReservation {
  index: number;
}

/** `StaffReadWorkReservationSerializer` — дополнительно responsibleStaffId. */
export interface IStaffWorkReservation extends IWorkReservation {
  responsibleStaffId: string | null;
}

export type TWorkReservationListData = IClientWorkReservation[] | IStaffWorkReservation[];
export type TWorkReservationDetailData = IClientWorkReservation | IStaffWorkReservation;
export type TWorkReservationCreateResponseData = IClientWorkReservation | IStaffWorkReservation;
export type TWorkReservationStatusData = IClientWorkReservation | IStaffWorkReservation;
export type TWorkReservationProlongData = IClientWorkReservation | IStaffWorkReservation;

/** `WriteWorkReservationSerializer` — POST create (clientId подставляется на бэкенде из сессии). */
export interface IWorkReservationCreateBody {
  workId: string;
  libraryBranchId: string;
  reservedTill: IsoDateString;
}

/** `WorkReservationStatusSerializer` — PATCH .../status. */
export interface IWorkReservationStatusBody {
  status: WorkReservationStatus;
}

/** `WorkReservationProlongSerializer` — PATCH .../prolong (prolong_time в ms). */
export interface IWorkReservationProlongBody {
  prolongTime: number;
}

export interface IWorkReservationListParams {
  clientId?: string; // Только для передачи менеджером
  status?: WorkReservationStatus;
}
