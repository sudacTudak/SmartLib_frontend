import type { AxiosInstance } from 'axios';
import { apiPath } from '../../apiPath';
import { ApiPaths, actionPath, detailPath, regularPath } from '../../paths';
import type { HttpSuccessBody } from '../../types';
import { unwrapData } from '../../unwrap';
import type {
  WorkLoanCreateBody,
  WorkLoanCreateResponseData,
  WorkLoanDetailData,
  WorkLoanListData,
  WorkLoanListParams,
  WorkLoanProlongBody,
  WorkLoanProlongData,
} from './types';

/**
 * `WorkLoanViewSet`: list, retrieve, create, prolong.
 * PATCH/DELETE на бэкенде нет.
 */
export function createWorkLoansApi(client: AxiosInstance) {
  return {
    list: async (params?: WorkLoanListParams) => {
      const res = await client.get<HttpSuccessBody<WorkLoanListData>>(
        apiPath(regularPath(ApiPaths.workLoans)),
        { params },
      );
      return unwrapData<WorkLoanListData>(res);
    },
    get: async (id: string | number) => {
      const res = await client.get<HttpSuccessBody<WorkLoanDetailData>>(
        apiPath(detailPath(ApiPaths.workLoans, id)),
      );
      return unwrapData<WorkLoanDetailData>(res);
    },
    create: async (body: WorkLoanCreateBody) => {
      const res = await client.post<HttpSuccessBody<WorkLoanCreateResponseData>>(
        apiPath(regularPath(ApiPaths.workLoans)),
        body,
      );
      return unwrapData<WorkLoanCreateResponseData>(res);
    },

    /** POST `work-loans/{id}/prolong/` */
    prolong: async (id: string | number, body?: WorkLoanProlongBody) => {
      const res = await client.post<HttpSuccessBody<WorkLoanProlongData>>(
        apiPath(actionPath(ApiPaths.workLoans, id, 'prolong')),
        body ?? {},
      );
      return unwrapData<WorkLoanProlongData>(res);
    },
  };
}

