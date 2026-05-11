import type { AxiosInstance } from 'axios';
import { ApiResource } from '../../api-resource';
import { ApiPaths } from '../../paths';
import type {
  TLibraryBranchCreateBody,
  TLibraryBranchDetailData,
  TLibraryBranchListData,
  TLibraryBranchPatchBody,
} from './types';

export function createLibrariesApi(client: AxiosInstance) {
  return new ApiResource<
    TLibraryBranchListData,
    TLibraryBranchDetailData,
    TLibraryBranchCreateBody,
    TLibraryBranchPatchBody
  >(client, ApiPaths.libBranch);
}
