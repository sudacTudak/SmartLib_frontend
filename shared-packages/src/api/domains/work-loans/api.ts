import type { AxiosInstance } from 'axios';
import { ApiResource } from '../../api-resource';
import { ApiPaths } from '../../paths';
import type { RequestOptions } from '../../types';
import type {
  WorkLoanCreateBody,
  WorkLoanCreateResponseData,
  WorkLoanDetailData,
  WorkLoanListData,
  WorkLoanListParams,
  WorkLoanProlongBody,
  WorkLoanProlongData,
} from './types';

export function createWorkLoansApi(client: AxiosInstance) {
  const resource = new ApiResource<WorkLoanListData, WorkLoanDetailData, WorkLoanCreateBody>(
    client,
    ApiPaths.workLoans,
  );

  return {
    list: (params?: WorkLoanListParams, options?: RequestOptions) => resource.list(params as Record<string, unknown>, options),
    get: (id: string | number, options?: RequestOptions) => resource.get(id, options),
    create: (body: WorkLoanCreateBody, options?: RequestOptions) =>
      resource.create(body, options) as unknown as Promise<WorkLoanCreateResponseData>,
    prolong: (id: string | number, body?: WorkLoanProlongBody, options?: RequestOptions) =>
      resource.customPost<WorkLoanProlongData>(`${id}/prolong`, body ?? {}, options),
  };
}
