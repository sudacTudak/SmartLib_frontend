import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { WorkItemDetailView } from 'src/components/works/work-item-detail-view/work-item-detail-view';
import { PageContent } from 'src/components/layout/page-content/page-content';
import { loadBookDetail } from 'src/lib/catalog-loaders';
import { collectBookIdsForSSG } from 'src/lib/ssg-ids';

type WorkItemPageProps = {
  params: Promise<{ workItemId: string }>;
};

export async function generateStaticParams() {
  const ids = await collectBookIdsForSSG();
  return ids.map((workItemId) => ({ workItemId }));
}

export const dynamicParams = true;

export async function generateMetadata({ params }: WorkItemPageProps): Promise<Metadata> {
  const { workItemId } = await params;
  try {
    const item = await loadBookDetail(workItemId);
    return {
      title: `${item.title} — SmartLib`,
      description: item.description?.slice(0, 160) ?? undefined,
    };
  } catch {
    return { title: 'Произведение — SmartLib' };
  }
}

export default async function WorkItemPage({ params }: WorkItemPageProps) {
  const { workItemId } = await params;

  try {
    const item = await loadBookDetail(workItemId);

    return (
      <PageContent variant="detail">
        <WorkItemDetailView item={item} />
      </PageContent>
    );
  } catch {
    notFound();
  }
}

