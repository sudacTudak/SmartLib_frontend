import type { IsoDateTimeString } from '../../types';

/**
 * `SupplierSerializer` — list / retrieve / create / patch.
 */
export type Supplier = {
  id: string;
  name: string;
  created_at: IsoDateTimeString;
};

export type SupplierListData = Supplier[];
export type SupplierDetailData = Supplier;
export type SupplierCreateBody = Pick<Supplier, 'name'>;
export type SupplierPatchBody = Partial<SupplierCreateBody>;

/** Стандартный destroy — 204 / `data: null`. */
export type SupplierDeleteData = null;

export type SupplierListParams = Record<string, string | number | boolean | undefined>;
