'use client';

import { IAuthor, IWork, Genre } from '@shared-packages/api';
import { ConfigProvider, Masonry, MasonryProps, ThemeConfig, Typography } from 'antd';
import { WorkCard } from '../WorkCard';
import { normalizeArray } from '@shared-packages/utils';
import React, { useMemo } from 'react';
import { BOOK_LIST_COLUMNS, BOOK_LIST_GAP } from './constants';
import { WorkListVariant } from './enums';

import styles from './WorkList.module.scss';
import classNames from 'classnames';

interface IWorkListProps {
  works: IWork[];
  authors: IAuthor[];
  genres: Genre[];
  variant?: WorkListVariant;
  title?: string;
  titleLevel?: 1 | 2 | 3 | 4 | 5;
}

const { Title } = Typography;

export const WorkList = ({
  works,
  authors,
  genres,
  variant = WorkListVariant.TwoDirectionsList,
  title,
  titleLevel = 1,
}: IWorkListProps) => {
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
          rating={work.ratingAvg ?? 0}
          {...work}
        />
      );

      return item;
    });
  }, [workIds, workEntities, authorsEntities, genresEntities]);

  const listComponent = useMemo(() => {
    switch (variant) {
      case WorkListVariant.Masonry: {
        return <Masonry columns={BOOK_LIST_COLUMNS} gutter={BOOK_LIST_GAP} items={items} />;
      }
      case WorkListVariant.VerticalList: {
        return (
          <div className={classNames(styles.customList, styles.verticalList)}>
            {items.map((item) => (
              <React.Fragment key={item.key}>{item.children}</React.Fragment>
            ))}
          </div>
        );
      }
      case WorkListVariant.HorizontalList: {
        return (
          <div className={classNames(styles.customList, styles.horizontalList)}>
            {items.map((item) => (
              <React.Fragment key={item.key}>{item.children}</React.Fragment>
            ))}
          </div>
        );
      }
      case WorkListVariant.TwoDirectionsList:
      default: {
        return (
          <div className={styles.customList}>
            {items.map((item) => (
              <React.Fragment key={item.key}>{item.children}</React.Fragment>
            ))}
          </div>
        );
      }
    }
  }, [items, variant]);

  const themeConfig = useMemo(() => {
    if (!title) return {} as ThemeConfig;

    return {
      components: {
        Typography: {
          titleMarginBottom: 0,
          fontSizeHeading1: 24,
          fontSizeHeading2: 16,
          fontSizeHeading3: 14,
        },
      },
    } as ThemeConfig;
  }, [title]);

  const main = (
    <div className={styles.listContainer}>
      {title && <Title level={titleLevel}>{title}</Title>}
      {listComponent}
    </div>
  );

  if (themeConfig) {
    return <ConfigProvider theme={themeConfig}>{main}</ConfigProvider>;
  }

  return main;
};
