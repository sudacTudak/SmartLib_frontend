'use client'

import { useQuery } from '@tanstack/react-query';
import React, { memo } from 'react';
import { WorkList } from 'src/features/catalog/ui';
import { WorkListVariant } from 'src/features/catalog/ui/WorkList/enums';
import { getSmartlibApi } from 'src/global/api';

interface ISimilarWorksWidgetProps {
  workId: string;
}

const api = getSmartlibApi();

export const SimilarWorksWidget = memo(function SimilarWorksWidget({ workId }: ISimilarWorksWidgetProps) {
  const { data: works } = useQuery({
    queryKey: ['similarWorksWidget', 'works'],
    queryFn: () => api.works.works.getSimilar(workId),
  });
  const { data: authors } = useQuery({
    queryKey: ['similarWorksWidget', 'authors'],
    queryFn: () => api.authors.list(),
  });
  const { data: genres } = useQuery({
    queryKey: ['similarWorksWidget', 'genres'],
    queryFn: () => api.works.genre.list(),
  });

  if (!works || !authors || !genres) return null;

  return <WorkList variant={WorkListVariant.VerticalList} works={works} authors={authors} genres={genres} title='Похожие произведения' titleLevel={2}/>;
});
