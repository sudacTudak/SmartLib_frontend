import type { AxiosInstance } from 'axios';
import { apiPath } from '../../apiPath';
import { ApiPaths, detailPath } from '../../paths';
import type { HttpSuccessBody } from '../../types';
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

const BOOK_BASIS_FEEDBACKS = `${ApiPaths.feedbackWorks}/feedbacks`;
const LIB_BRANCH_FEEDBACKS = `${ApiPaths.feedbackLibs}/feedbacks`;

function bookBasisByUserPath(): string {
  return `${BOOK_BASIS_FEEDBACKS}/by-user/`;
}

function libraryBranchByUserPath(): string {
  return `${LIB_BRANCH_FEEDBACKS}/by-user/`;
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
        const res = await client.get<HttpSuccessBody<TBookBasisFeedbackListData>>(apiPath(`${BOOK_BASIS_FEEDBACKS}/`), {
          params: parent,
        });
        return unwrapData<TBookBasisFeedbackListData>(res);
      },
      byUser: async (parent: IBookBasisFeedbackParentParams, params?: IFeedbackByUserParams) => {
        const res = await client.get<HttpSuccessBody<TBookBasisFeedbackByUserData>>(
          apiPath(bookBasisByUserPath()),
          { params: mergeParams(parent, params) },
        );
        return unwrapData<TBookBasisFeedbackByUserData>(res);
      },
      create: async (body: TBookBasisFeedbackCreateBody) => {
        const res = await client.post<HttpSuccessBody<TBookBasisFeedbackDetailData>>(
          apiPath(`${BOOK_BASIS_FEEDBACKS}/`),
          body,
        );
        return unwrapData<TBookBasisFeedbackDetailData>(res);
      },
      partialUpdate: async (feedbackId: string | number, body: TBookBasisFeedbackPatchBody) => {
        const res = await client.patch<HttpSuccessBody<TBookBasisFeedbackDetailData>>(
          apiPath(detailPath(BOOK_BASIS_FEEDBACKS, feedbackId)),
          body,
        );
        return unwrapData<TBookBasisFeedbackDetailData>(res);
      },
      delete: async (feedbackId: string | number) => {
        const res = await client.delete<HttpSuccessBody<null>>(apiPath(detailPath(BOOK_BASIS_FEEDBACKS, feedbackId)));
        return unwrapData<null>(res);
      },
    },

    libraryBranches: {
      list: async (parent: ILibraryBranchFeedbackParentParams) => {
        const res = await client.get<HttpSuccessBody<TLibraryBranchFeedbackListData>>(
          apiPath(`${LIB_BRANCH_FEEDBACKS}/`),
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
          apiPath(`${LIB_BRANCH_FEEDBACKS}/`),
          body,
        );
        return unwrapData<TLibraryBranchFeedbackDetailData>(res);
      },
      partialUpdate: async (feedbackId: string | number, body: TLibraryBranchFeedbackPatchBody) => {
        const res = await client.patch<HttpSuccessBody<TLibraryBranchFeedbackDetailData>>(
          apiPath(detailPath(LIB_BRANCH_FEEDBACKS, feedbackId)),
          body,
        );
        return unwrapData<TLibraryBranchFeedbackDetailData>(res);
      },
      delete: async (feedbackId: string | number) => {
        const res = await client.delete<HttpSuccessBody<null>>(apiPath(detailPath(LIB_BRANCH_FEEDBACKS, feedbackId)));
        return unwrapData<null>(res);
      },
    },
  };
}
