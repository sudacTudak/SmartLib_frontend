import { InventoryMovementType } from '@shared-packages/enums';
import type { IsoDateTimeString } from '../../types';

/**
 * `ReadInventoryMovementSerializer` — list / create (после создания).
 */
export type InventoryMovement = {
  id: string;
  type: InventoryMovementType;
  libraryBranchId: string;
  bookBasisId: string;
  supplierId: string | null;
  quantity: number;
  reason: string;
  comment: string;
  createdAt: IsoDateTimeString;
};

export type InventoryMovementListData = InventoryMovement[];
export type InventoryMovementCreateResponseData = InventoryMovement;

export type InventoryMovementCreateBody = Record<string, unknown>;

export type InventoryMovementListParams = Record<string, string | number | boolean | undefined>;
