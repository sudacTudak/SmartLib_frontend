import { PageContent } from '@widgets/layout/PageContent/PageContent';
import { WorkList } from 'src/features/catalog/ui/WorkList';
import { getSmartlibApi } from '@global/api';

const api = getSmartlibApi();

export default async function CatalogPage() {
  const works = await api.works.works.list();
  const authors = await api.authors.list();
  const genres = await api.works.genre.list();
  return (
    <PageContent>
      <WorkList works={works} authors={authors} genres={genres} />
    </PageContent>
  );
}
