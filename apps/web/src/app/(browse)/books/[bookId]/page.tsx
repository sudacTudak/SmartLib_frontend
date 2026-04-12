import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { BookDetailView } from 'src/components/books/book-detail-view/book-detail-view';
import { PageContent } from 'src/components/layout/page-content/page-content';
import { loadBookDetail } from 'src/lib/catalog-loaders';
import { collectBookIdsForSSG } from 'src/lib/ssg-ids';
import { fetchViewerForPage } from 'src/lib/viewer';

type BookPageProps = {
  params: Promise<{ bookId: string }>;
};

/** Предрендер всех книг, известных на момент сборки (данные с публичного API). */
export async function generateStaticParams() {
  const ids = await collectBookIdsForSSG();
  return ids.map((bookId) => ({ bookId }));
}

/** Несовпавшие id обрабатываются на лету (первая отдача сгенерирует страницу). */
export const dynamicParams = true;

export async function generateMetadata({ params }: BookPageProps): Promise<Metadata> {
  const { bookId } = await params;
  try {
    const book = await loadBookDetail(bookId);
    return {
      title: `${book.title} — SmartLib`,
      description: book.description?.slice(0, 160) ?? undefined,
    };
  } catch {
    return { title: 'Книга — SmartLib' };
  }
}

export default async function BookPage({ params }: BookPageProps) {
  const { bookId } = await params;

  try {
    const book = await loadBookDetail(bookId);
    const viewer = await fetchViewerForPage();

    return (
      <PageContent variant="detail">
        <BookDetailView book={book} viewer={viewer} />
      </PageContent>
    );
  } catch {
    notFound();
  }
}
