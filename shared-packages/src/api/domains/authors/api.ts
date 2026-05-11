import type { AxiosInstance } from 'axios';
import { ApiResource } from '../../api-resource';
import { ApiPaths } from '../../paths';
import type { TAuthorCreateBody, TAuthorDetailData, TAuthorListData, TAuthorPatchBody } from './types';

export function createAuthorsApi(client: AxiosInstance) {
  return new ApiResource<TAuthorListData, TAuthorDetailData, TAuthorCreateBody, TAuthorPatchBody, null>(
    client,
    ApiPaths.authors,
  );
}
