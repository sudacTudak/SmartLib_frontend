import type { IsoDateTimeString } from '../../types';

/**
 * `AmenityVendorReadSerializer`.
 */
export type AmenityVendor = {
  id: string;
  amenityName: string;
  vendorName: string;
  previewLink: string;
  createdAt: IsoDateTimeString;
};

/**
 * `AmenityReadSerializer` — list / retrieve (вложенный `vendor`).
 */
export type Amenity = {
  id: string;
  libraryBranchId: string;
  vendorId: string;
  vendor: AmenityVendor;
  previewLink: string;
  createdAt: IsoDateTimeString;
};

export type AmenityListData = Amenity[];
export type AmenityDetailData = Amenity;

/**
 * `AmenityWriteSerializer` — create / PATCH (без вложенного vendor в ответе).
 */
export type AmenityWriteResponse = {
  id: string;
  libraryBranchId: string;
  vendorId: string;
  previewLink: string;
  createdAt: IsoDateTimeString;
};

export type AmenityCreateBody = Record<string, unknown>;
export type AmenityPatchBody = Partial<Record<string, unknown>>;

export type AmenityListParams = Record<string, string | number | boolean | undefined>;

/** Стандартный destroy — 204 / `data: null`. */
export type AmenityDeleteData = null;

export type AmenityVendorListData = AmenityVendor[];
export type AmenityVendorDetailData = AmenityVendor;

/**
 * `AmenityVendorWriteSerializer` — только amenity_name, vendor_name, preview_link;
 * после create в ответе нет `id` в Meta.fields (пока бэкенд не расширит сериализатор).
 */
export type AmenityVendorWriteResponse = {
  amenityName: string;
  vendorName: string;
  previewLink: string;
};

export type AmenityVendorCreateBody = Record<string, unknown>;
export type AmenityVendorPatchBody = Partial<AmenityVendorWriteResponse>;

export type AmenityVendorDeleteData = null;
