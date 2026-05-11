import type { AxiosInstance } from 'axios';
import { ApiResource } from '../../api-resource';
import { ApiPaths } from '../../paths';
import type {
  SupplierCreateBody,
  SupplierDeleteData,
  SupplierDetailData,
  SupplierListData,
  SupplierPatchBody,
} from './types';

export function createSuppliersApi(client: AxiosInstance) {
  return new ApiResource<SupplierListData, SupplierDetailData, SupplierCreateBody, SupplierPatchBody, SupplierDeleteData>(
    client,
    ApiPaths.suppliers,
  );
}
