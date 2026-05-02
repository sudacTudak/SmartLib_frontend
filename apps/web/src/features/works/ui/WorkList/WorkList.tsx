'use client';

import { IAuthor, IWork, Genre } from '@shared-packages/api';
import { Masonry, MasonryProps } from 'antd';
import { WorkCard } from '../WorkCard';
import { normalizeArray } from '@shared-packages/utils';
import { useMemo } from 'react';
import { BOOK_LIST_COLUMNS, BOOK_LIST_GAP } from './constants';

interface IWorkListProps {
  works: IWork[];
  authors: IAuthor[];
  genres: Genre[];
}

export const WorkList = ({ works, authors, genres }: IWorkListProps) => {
  const { ids: workIds, entities: workEntities } = normalizeArray({
    array: works,
    idLookup: 'id',
  });
  const { entities: authorsEntities } = normalizeArray({ array: authors, idLookup: 'id' });
  const { entities: genresEntities } = normalizeArray({ array: genres, idLookup: 'id' });

  const items = useMemo(() => {
    return workIds.map((workId) => {
      const work = workEntities[workId];
      const authorNames = work.authorIds.reduce((acc, authorId) => {
        if (authorsEntities[authorId]) acc.push(authorsEntities[authorId].name);
        return acc;
      }, [] as string[]);
      const genreTitles = (work.genreIds || [])
        .map((genreId) => genresEntities[genreId]?.title)
        .filter(Boolean) as string[];
      const isAvailable = work.booksAvailableTotal > 0;

      const item: NonNullable<MasonryProps['items']>[number] = {
        key: work.id,
        data: {},
      };

      item.children = (
        <WorkCard
          authorNames={authorNames}
          genreTitles={genreTitles}
          available={isAvailable}
          {...work}
        />
      );

      return item;
    });
  }, [workIds, workEntities, authorsEntities, genresEntities]);

  return <Masonry columns={BOOK_LIST_COLUMNS} gutter={BOOK_LIST_GAP} items={items} />;
};
