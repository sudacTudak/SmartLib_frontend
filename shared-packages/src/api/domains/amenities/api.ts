import type { AxiosInstance } from 'axios';
import { ApiResource } from '../../api-resource';
import { ApiPaths } from '../../paths';
import type {
  AmenityCreateBody,
  AmenityDeleteData,
  AmenityListData,
  AmenityPatchBody,
  AmenityVendorCreateBody,
  AmenityVendorDeleteData,
  AmenityVendorListData,
  AmenityVendorPatchBody,
  AmenityVendorWriteResponse,
  AmenityWriteResponse,
} from './types';

export function createAmenitiesApi(client: AxiosInstance) {
  return {
    amenities: new ApiResource<AmenityListData, AmenityWriteResponse, AmenityCreateBody, AmenityPatchBody, AmenityDeleteData>(
      client,
      ApiPaths.amenities,
    ),
    vendors: new ApiResource<AmenityVendorListData, AmenityVendorWriteResponse, AmenityVendorCreateBody, AmenityVendorPatchBody, AmenityVendorDeleteData>(
      client,
      ApiPaths.amenityVendors,
    ),
  };
}
