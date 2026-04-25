import { PageContent } from 'src/components/layout/page-content/page-content';
import { BookList } from '@features/books/components/BookList';
import { getSmartlibApi } from 'src/lib/api';

const api = getSmartlibApi()

export default async function CatalogPage() {
  const books = await api.books.bookBases.list();
  const authors = await api.authors.list();
  return (
    <PageContent>
      <BookList books={books} authors={authors} />
    </PageContent>
  );
}
