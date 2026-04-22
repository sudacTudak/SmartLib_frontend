import { Suspense, use } from 'react';
import { PageContent } from 'src/components/layout/page-content/page-content';
import { BookList } from '@features/books/components/BookList';
import { Loader } from 'src/features/ui/Loader';
import { getSmartlibApi } from 'src/lib/api';

const api = getSmartlibApi()

export default async function CatalogPage() {
  const books = await api.books.bookBases.list()
  console.log('books: ', books);

  return (
    <PageContent>
        <BookList books={books}/>
    </PageContent>
  );
}
