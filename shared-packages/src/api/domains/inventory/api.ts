import type { AxiosInstance } from 'axios';
import { ApiResource } from '../../api-resource';
import { ApiPaths } from '../../paths';
import type { RequestOptions } from '../../types';
import type {
  InventoryMovementCreateBody,
  InventoryMovementCreateResponseData,
  InventoryMovementListData,
  InventoryMovementListParams,
} from './types';

export function createInventoryApi(client: AxiosInstance) {
  const resource = new ApiResource<InventoryMovementListData, InventoryMovementCreateResponseData, InventoryMovementCreateBody>(
    client,
    ApiPaths.inventoryMovements,
  );

  return {
    list: (params?: InventoryMovementListParams, options?: RequestOptions) => resource.list(params as Record<string, unknown>, options),
    create: (body: InventoryMovementCreateBody, options?: RequestOptions) => resource.create(body, options),
  };
}
