import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { loadWorkDetail } from '@global/catalog-loaders';
import { getPublicServerApi } from '@global/server-api';
import { LibraryBranch } from '@shared-packages/api';
import { WorkDetailPage } from 'src/page-components/work';
import { normalizeArray } from '@shared-packages/utils';

type WorkPageProps = {
  params: Promise<{ workId: string }>;
};

export const dynamicParams = true;

export async function generateMetadata({ params }: WorkPageProps): Promise<Metadata> {
  const { workId } = await params;
  try {
    const work = await loadWorkDetail(workId);
    return {
      title: `${work.title} — SmartLib`,
      description: work.description?.slice(0, 160) ?? undefined,
    };
  } catch {
    return { title: 'Произведение — SmartLib' };
  }
}

export default async function WorkPage({ params }: WorkPageProps) {
  const { workId } = await params;

  try {
    const api = getPublicServerApi();

    const authors = await api.authors.list();
    const genres = await api.works.genre.list();
    const work = await loadWorkDetail(workId);

    const { availableByLibraryBranchIds: availableByLibraryBranchIds, totalAvailableCount } =
      await api.works.workItems.availabilityByWork({
        workId: work.id,
      });

    const libraries = await Promise.all(
      Object.keys(availableByLibraryBranchIds).map((libraryId) => api.libraries.get(libraryId)),
    );
    const normalizedLibraries = normalizeArray<LibraryBranch, string>({ array: libraries });

    const authorNames = work.authorIds.map((id) => authors.find((a) => a.id === id)?.name).filter(Boolean) as string[];
    const genreTitles = work.genreIds.map((id) => genres.find((g) => g.id === id)?.title).filter(Boolean) as string[];

    return (
      <WorkDetailPage
        work={work}
        libraryEntities={normalizedLibraries.entities}
        libraryIds={normalizedLibraries.ids}
        availabilityByLibrariesMap={availableByLibraryBranchIds}
        genreTitles={genreTitles}
        authorNames={authorNames}
        totalAvailableCount={totalAvailableCount}
      />
    );
  } catch {
    notFound();
  }
}
