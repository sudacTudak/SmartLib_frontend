import { cache } from 'react';

import type { BookDetailData, LibraryBranchDetailData } from '@shared-packages/api';

import { getPublicServerApi } from './server-api';

export const loadBookDetail = cache(async (bookId: string): Promise<BookDetailData> => {
  return getPublicServerApi().books.book.get(bookId);
});

export const loadLibraryBranchDetail = cache(
  async (libraryId: string): Promise<LibraryBranchDetailData> => {
    return getPublicServerApi().libraries.get(libraryId);
  },
);
