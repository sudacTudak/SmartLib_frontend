import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { loadWorkDetail } from '@global/catalog-loaders';
import { ViewerPage } from '@page-components/work-viewer/ViewerPage';

type ViewerPageRouteProps = {
  params: Promise<{ workId: string }>;
};

export const dynamicParams = true;

export async function generateMetadata({ params }: ViewerPageRouteProps): Promise<Metadata> {
  const { workId } = await params;
  try {
    const work = await loadWorkDetail(workId);
    return {
      title: `${work.title} — SmartLib`,
    };
  } catch {
    return { title: 'SmartLib' };
  }
}

export default async function ViewerPageRoute({ params }: ViewerPageRouteProps) {
  const { workId } = await params;

  try {
    const work = await loadWorkDetail(workId);

    if (!work.onlineVersionLink) {
      notFound();
    }

    return <ViewerPage work={work} />;
  } catch {
    notFound();
  }
}
