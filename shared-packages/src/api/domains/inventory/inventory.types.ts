import type { IsoDateTimeString } from '../../types';

/** `InventoryMovementType` на бэкенде. */
export type InventoryMovementTypeCode = 'in' | 'out';

/**
 * `ReadInventoryMovementSerializer` — list / create (после создания).
 */
export type InventoryMovement = {
  id: string;
  type: InventoryMovementTypeCode;
  library_branch_id: string;
  book_basis_id: string;
  supplier_id: string | null;
  quantity: number;
  reason: string;
  comment: string;
  created_at: IsoDateTimeString;
};

export type InventoryMovementListData = InventoryMovement[];
export type InventoryMovementCreateResponseData = InventoryMovement;

export type InventoryMovementCreateBody = Record<string, unknown>;

export type InventoryMovementListParams = Record<string, string | number | boolean | undefined>;
