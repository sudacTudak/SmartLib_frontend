import { Suspense } from 'react';
import { Spin } from 'antd';
import { PageContent } from '@widgets/layout/PageContent/PageContent';
import { CatalogWorksSection } from 'src/page-components/catalog/CatalogWorksSection';

function CatalogWorksFallback() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: 48 }}>
      <Spin size="large" />
    </div>
  );
}

export default function CatalogPage() {
  return (
    <PageContent>
      <Suspense fallback={<CatalogWorksFallback />}>
        <CatalogWorksSection />
      </Suspense>
    </PageContent>
  );
}
