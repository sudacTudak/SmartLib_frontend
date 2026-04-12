import type { AxiosInstance } from 'axios';
import { apiPath } from '../../apiPath';
import { ApiPaths, regularPath } from '../../paths';
import type { HttpSuccessBody } from '../../types';
import { unwrapData } from '../../unwrap';
import type {
  InventoryMovementCreateBody,
  InventoryMovementCreateResponseData,
  InventoryMovementListData,
  InventoryMovementListParams,
} from './types';

/**
 * `InventoryMovementViewSet`: только list и create (кастомный create).
 * GET/PATCH/DELETE по id нет.
 */
export function createInventoryApi(client: AxiosInstance) {
  return {
    list: async (params?: InventoryMovementListParams) => {
      const res = await client.get<HttpSuccessBody<InventoryMovementListData>>(
        apiPath(regularPath(ApiPaths.inventoryMovements)),
        { params },
      );
      return unwrapData<InventoryMovementListData>(res);
    },
    create: async (body: InventoryMovementCreateBody) => {
      const res = await client.post<HttpSuccessBody<InventoryMovementCreateResponseData>>(
        apiPath(regularPath(ApiPaths.inventoryMovements)),
        body,
      );
      return unwrapData<InventoryMovementCreateResponseData>(res);
    },
  };
}
