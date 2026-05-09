'use client';

import { Alert, Spin } from 'antd';
import { useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { WorkList } from '@features/catalog/ui';
import { WorkListVariant } from '@features/catalog/ui/WorkList/enums';
import { buildWorkListParamsFromCatalogUrl } from '@features/catalog/buildWorkListParamsFromCatalogUrl';
import { getSmartlibApi } from '@global/api';

const api = getSmartlibApi();

export function CatalogWorksSection() {
  const searchParams = useSearchParams();
  const queryKey = searchParams.toString();

  const { data: works, isPending, isError, error } = useQuery({
    queryKey: ['catalog', 'works', queryKey],
    queryFn: () => api.works.works.list(buildWorkListParamsFromCatalogUrl(new URLSearchParams(queryKey))),
  });

  const { data: authors, isPending: authorsPending } = useQuery({
    queryKey: ['catalog', 'authors'],
    queryFn: () => api.authors.list(),
  });

  const { data: genres, isPending: genresPending } = useQuery({
    queryKey: ['catalog', 'genres'],
    queryFn: () => api.works.genre.list(),
  });

  const loading = isPending || authorsPending || genresPending;

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: 48 }}>
        <Spin size="large" />
      </div>
    );
  }

  if (isError) {
    return (
      <Alert
        type="error"
        message="Не удалось загрузить каталог"
        description={error instanceof Error ? error.message : undefined}
      />
    );
  }

  if (!authors || !genres || !works) return null;

  return (
    <WorkList works={works} authors={authors} genres={genres} variant={WorkListVariant.Masonry} />
  );
}
