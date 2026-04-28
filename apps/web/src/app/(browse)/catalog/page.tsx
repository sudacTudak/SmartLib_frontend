import { PageContent } from 'src/components/layout/page-content/page-content';
import { WorkList } from '@features/works/components/WorkList';
import { getSmartlibApi } from 'src/lib/api';

const api = getSmartlibApi()

export default async function CatalogPage() {
  const works = await api.works.works.list();
  const authors = await api.authors.list();
  return (
    <PageContent>
      <WorkList works={works} authors={authors} />
    </PageContent>
  );
}
