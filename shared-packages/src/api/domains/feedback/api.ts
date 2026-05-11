import type { AxiosInstance } from 'axios';
import { apiPath } from '../../apiPath';
import { ApiPaths, detailPath } from '../../paths';
import type { HttpSuccessBody, RequestOptions } from '../../types';
import { unwrapData } from '../../unwrap';
import type {
  IBookBasisFeedbackParentParams,
  IFeedbackByUserParams,
  ILibraryBranchFeedbackParentParams,
  TBookBasisFeedbackByUserData,
  TBookBasisFeedbackCreateBody,
  TBookBasisFeedbackDetailData,
  TBookBasisFeedbackListData,
  TBookBasisFeedbackPatchBody,
  TLibraryBranchFeedbackByUserData,
  TLibraryBranchFeedbackCreateBody,
  TLibraryBranchFeedbackDetailData,
  TLibraryBranchFeedbackListData,
  TLibraryBranchFeedbackPatchBody,
} from './types';


function bookBasisByUserPath(): string {
  return `${ApiPaths.feedbackWorks}/by-user/`;
}

function libraryBranchByUserPath(): string {
  return `${ApiPaths.feedbackLibs}/by-user/`;
}

function mergeParams(parent: object, extra?: object) {
  return { ...parent, ...extra };
}

/**
 * `feedback/works/feedbacks/...` и `feedback/libs/feedbacks/...`
 * list / by-user: опциональный query `workId` / `libraryBranchId`;
 * create: тело с `workId` / `libraryBranchId`; patch/delete — только `pk` в path.
 */
export function createFeedbackApi(client: AxiosInstance) {
  return {
    works: {
      list: async (parent: IBookBasisFeedbackParentParams) => {
        const res = await client.get<HttpSuccessBody<TBookBasisFeedbackListData>>(apiPath(`${ApiPaths.feedbackWorks}/`), {
          params: parent,
        });
        return unwrapData<TBookBasisFeedbackListData>(res);
      },
      byUser: async (parent: IBookBasisFeedbackParentParams, params?: IFeedbackByUserParams, options?: RequestOptions) => {
        const res = await client.get<HttpSuccessBody<TBookBasisFeedbackByUserData>>(
          apiPath(bookBasisByUserPath()),
          { params: mergeParams(parent, params), signal: options?.signal },
        );
        return unwrapData<TBookBasisFeedbackByUserData>(res);
      },
      create: async (body: TBookBasisFeedbackCreateBody) => {
        const res = await client.post<HttpSuccessBody<TBookBasisFeedbackDetailData>>(
          apiPath(`${ApiPaths.feedbackWorks}/`),
          body,
        );
        return unwrapData<TBookBasisFeedbackDetailData>(res);
      },
      partialUpdate: async (feedbackId: string | number, body: TBookBasisFeedbackPatchBody) => {
        const res = await client.patch<HttpSuccessBody<TBookBasisFeedbackDetailData>>(
          apiPath(detailPath(ApiPaths.feedbackWorks, feedbackId)),
          body,
        );
        return unwrapData<TBookBasisFeedbackDetailData>(res);
      },
      delete: async (feedbackId: string | number) => {
        const res = await client.delete<HttpSuccessBody<null>>(apiPath(detailPath(ApiPaths.feedbackWorks, feedbackId)));
        return unwrapData<null>(res);
      },
    },

    libraryBranches: {
      list: async (parent: ILibraryBranchFeedbackParentParams) => {
        const res = await client.get<HttpSuccessBody<TLibraryBranchFeedbackListData>>(
          apiPath(`${ApiPaths.feedbackLibs}/`),
          { params: parent },
        );
        return unwrapData<TLibraryBranchFeedbackListData>(res);
      },
      byUser: async (parent: ILibraryBranchFeedbackParentParams, params?: IFeedbackByUserParams) => {
        const res = await client.get<HttpSuccessBody<TLibraryBranchFeedbackByUserData>>(
          apiPath(libraryBranchByUserPath()),
          { params: mergeParams(parent, params) },
        );
        return unwrapData<TLibraryBranchFeedbackByUserData>(res);
      },
      create: async (body: TLibraryBranchFeedbackCreateBody) => {
        const res = await client.post<HttpSuccessBody<TLibraryBranchFeedbackDetailData>>(
          apiPath(`${ApiPaths.feedbackLibs}/`),
          body,
        );
        return unwrapData<TLibraryBranchFeedbackDetailData>(res);
      },
      partialUpdate: async (feedbackId: string | number, body: TLibraryBranchFeedbackPatchBody) => {
        const res = await client.patch<HttpSuccessBody<TLibraryBranchFeedbackDetailData>>(
          apiPath(detailPath(ApiPaths.feedbackLibs, feedbackId)),
          body,
        );
        return unwrapData<TLibraryBranchFeedbackDetailData>(res);
      },
      delete: async (feedbackId: string | number) => {
        const res = await client.delete<HttpSuccessBody<null>>(apiPath(detailPath(ApiPaths.feedbackLibs, feedbackId)));
        return unwrapData<null>(res);
      },
    },
  };
}
