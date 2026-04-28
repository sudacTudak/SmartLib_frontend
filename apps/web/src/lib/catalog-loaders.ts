import { cache } from 'react';

import type { LibraryBranchDetailData, WorkItemDetailData } from '@shared-packages/api';

import { getPublicServerApi } from './server-api';

export const loadBookDetail = cache(async (bookId: string): Promise<WorkItemDetailData> => {
  return getPublicServerApi().works.workItems.get(bookId);
});

export const loadLibraryBranchDetail = cache(
  async (libraryId: string): Promise<LibraryBranchDetailData> => {
    return getPublicServerApi().libraries.get(libraryId);
  },
);
