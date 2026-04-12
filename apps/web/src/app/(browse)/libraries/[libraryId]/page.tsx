import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { LibraryDetailView } from 'src/components/libraries/library-detail-view/library-detail-view';
import { PageContent } from 'src/components/layout/page-content/page-content';
import { loadLibraryBranchDetail } from 'src/lib/catalog-loaders';
import { collectLibraryBranchIdsForSSG } from 'src/lib/ssg-ids';

type LibraryPageProps = {
  params: Promise<{ libraryId: string }>;
};

export async function generateStaticParams() {
  const ids = await collectLibraryBranchIdsForSSG();
  return ids.map((libraryId) => ({ libraryId }));
}

export const dynamicParams = true;

export async function generateMetadata({ params }: LibraryPageProps): Promise<Metadata> {
  const { libraryId } = await params;
  try {
    const library = await loadLibraryBranchDetail(libraryId);
    return {
      title: `${library.address} — SmartLib`,
      description: `Филиал библиотеки: ${library.address}`,
    };
  } catch {
    return { title: 'Библиотека — SmartLib' };
  }
}

export default async function LibraryPage({ params }: LibraryPageProps) {
  const { libraryId } = await params;

  try {
    const library = await loadLibraryBranchDetail(libraryId);

    return (
      <PageContent variant="detail">
        <LibraryDetailView library={library} />
      </PageContent>
    );
  } catch {
    notFound();
  }
}
