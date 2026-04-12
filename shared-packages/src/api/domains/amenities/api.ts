import type { AxiosInstance } from 'axios';
import { apiPath } from '../../apiPath';
import { ApiPaths, detailPath, regularPath } from '../../paths';
import type { HttpSuccessBody } from '../../types';
import { unwrapData } from '../../unwrap';
import type {
  AmenityCreateBody,
  AmenityDeleteData,
  AmenityDetailData,
  AmenityListData,
  AmenityListParams,
  AmenityPatchBody,
  AmenityVendorCreateBody,
  AmenityVendorDeleteData,
  AmenityVendorDetailData,
  AmenityVendorListData,
  AmenityVendorPatchBody,
  AmenityVendorWriteResponse,
  AmenityWriteResponse,
} from './types';

/** `amenities` + `amenities/vendors`. */
export function createAmenitiesApi(client: AxiosInstance) {
  return {
    amenities: {
      list: async (params?: AmenityListParams) => {
        const res = await client.get<HttpSuccessBody<AmenityListData>>(
          apiPath(regularPath(ApiPaths.amenities)),
          { params },
        );
        return unwrapData<AmenityListData>(res);
      },
      get: async (id: string | number) => {
        const res = await client.get<HttpSuccessBody<AmenityDetailData>>(
          apiPath(detailPath(ApiPaths.amenities, id)),
        );
        return unwrapData<AmenityDetailData>(res);
      },
      create: async (body: AmenityCreateBody) => {
        const res = await client.post<HttpSuccessBody<AmenityWriteResponse>>(
          apiPath(regularPath(ApiPaths.amenities)),
          body,
        );
        return unwrapData<AmenityWriteResponse>(res);
      },
      partialUpdate: async (id: string | number, body: AmenityPatchBody) => {
        const res = await client.patch<HttpSuccessBody<AmenityWriteResponse>>(
          apiPath(detailPath(ApiPaths.amenities, id)),
          body,
        );
        return unwrapData<AmenityWriteResponse>(res);
      },
      delete: async (id: string | number) => {
        const res = await client.delete<HttpSuccessBody<AmenityDeleteData>>(
          apiPath(detailPath(ApiPaths.amenities, id)),
        );
        return unwrapData<AmenityDeleteData>(res);
      },
    },

    vendors: {
      list: async (params?: AmenityListParams) => {
        const res = await client.get<HttpSuccessBody<AmenityVendorListData>>(
          apiPath(regularPath(ApiPaths.amenityVendors)),
          { params },
        );
        return unwrapData<AmenityVendorListData>(res);
      },
      get: async (id: string | number) => {
        const res = await client.get<HttpSuccessBody<AmenityVendorDetailData>>(
          apiPath(detailPath(ApiPaths.amenityVendors, id)),
        );
        return unwrapData<AmenityVendorDetailData>(res);
      },
      create: async (body: AmenityVendorCreateBody) => {
        const res = await client.post<HttpSuccessBody<AmenityVendorWriteResponse>>(
          apiPath(regularPath(ApiPaths.amenityVendors)),
          body,
        );
        return unwrapData<AmenityVendorWriteResponse>(res);
      },
      partialUpdate: async (id: string | number, body: AmenityVendorPatchBody) => {
        const res = await client.patch<HttpSuccessBody<AmenityVendorWriteResponse>>(
          apiPath(detailPath(ApiPaths.amenityVendors, id)),
          body,
        );
        return unwrapData<AmenityVendorWriteResponse>(res);
      },
      delete: async (id: string | number) => {
        const res = await client.delete<HttpSuccessBody<AmenityVendorDeleteData>>(
          apiPath(detailPath(ApiPaths.amenityVendors, id)),
        );
        return unwrapData<AmenityVendorDeleteData>(res);
      },
    },
  };
}
