import type { AxiosInstance } from 'axios';
import { apiPath } from '../../apiPath';
import { ApiPaths, detailPath, listPath } from '../../paths';
import type { HttpSuccessBody } from '../../types';
import { unwrapData } from '../../unwrap';
import type {
  SupplierCreateBody,
  SupplierDeleteData,
  SupplierDetailData,
  SupplierListData,
  SupplierListParams,
  SupplierPatchBody,
} from './types';

export function createSuppliersApi(client: AxiosInstance) {
  return {
    list: async (params?: SupplierListParams) => {
      const res = await client.get<HttpSuccessBody<SupplierListData>>(
        apiPath(listPath(ApiPaths.suppliers)),
        { params },
      );
      return unwrapData<SupplierListData>(res);
    },
    get: async (id: string | number) => {
      const res = await client.get<HttpSuccessBody<SupplierDetailData>>(
        apiPath(detailPath(ApiPaths.suppliers, id)),
      );
      return unwrapData<SupplierDetailData>(res);
    },
    create: async (body: SupplierCreateBody) => {
      const res = await client.post<HttpSuccessBody<SupplierDetailData>>(
        apiPath(listPath(ApiPaths.suppliers)),
        body,
      );
      return unwrapData<SupplierDetailData>(res);
    },
    partialUpdate: async (id: string | number, body: SupplierPatchBody) => {
      const res = await client.patch<HttpSuccessBody<SupplierDetailData>>(
        apiPath(detailPath(ApiPaths.suppliers, id)),
        body,
      );
      return unwrapData<SupplierDetailData>(res);
    },
    delete: async (id: string | number) => {
      const res = await client.delete<HttpSuccessBody<SupplierDeleteData>>(
        apiPath(detailPath(ApiPaths.suppliers, id)),
      );
      return unwrapData<SupplierDeleteData>(res);
    },
  };
}
