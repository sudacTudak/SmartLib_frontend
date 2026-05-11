import type { AxiosInstance } from 'axios';
import { ApiResource } from '../../api-resource';
import { ApiPaths } from '../../paths';
import type { RequestOptions } from '../../types';
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

export function createFeedbackApi(client: AxiosInstance) {
  const worksResource = new ApiResource<
    TBookBasisFeedbackListData,
    TBookBasisFeedbackDetailData,
    TBookBasisFeedbackCreateBody,
    TBookBasisFeedbackPatchBody,
    null
  >(client, ApiPaths.feedbackWorks);

  const libsResource = new ApiResource<
    TLibraryBranchFeedbackListData,
    TLibraryBranchFeedbackDetailData,
    TLibraryBranchFeedbackCreateBody,
    TLibraryBranchFeedbackPatchBody,
    null
  >(client, ApiPaths.feedbackLibs);

  return {
    works: {
      list: (parent: IBookBasisFeedbackParentParams, options?: RequestOptions) =>
        worksResource.list(parent as Record<string, unknown>, options),
      byUser: (parent: IBookBasisFeedbackParentParams, params?: IFeedbackByUserParams, options?: RequestOptions) =>
        worksResource.customGet<TBookBasisFeedbackByUserData>('by-user', { ...parent, ...params }, options),
      create: (body: TBookBasisFeedbackCreateBody, options?: RequestOptions) =>
        worksResource.create(body, options),
      partialUpdate: (feedbackId: string | number, body: TBookBasisFeedbackPatchBody, options?: RequestOptions) =>
        worksResource.partialUpdate(feedbackId, body, options),
      delete: (feedbackId: string | number, options?: RequestOptions) =>
        worksResource.delete(feedbackId, options),
    },

    libraryBranches: {
      list: (parent: ILibraryBranchFeedbackParentParams, options?: RequestOptions) =>
        libsResource.list(parent as Record<string, unknown>, options),
      byUser: (parent: ILibraryBranchFeedbackParentParams, params?: IFeedbackByUserParams, options?: RequestOptions) =>
        libsResource.customGet<TLibraryBranchFeedbackByUserData>('by-user', { ...parent, ...params }, options),
      create: (body: TLibraryBranchFeedbackCreateBody, options?: RequestOptions) =>
        libsResource.create(body, options),
      partialUpdate: (feedbackId: string | number, body: TLibraryBranchFeedbackPatchBody, options?: RequestOptions) =>
        libsResource.partialUpdate(feedbackId, body, options),
      delete: (feedbackId: string | number, options?: RequestOptions) =>
        libsResource.delete(feedbackId, options),   },
  };
}
