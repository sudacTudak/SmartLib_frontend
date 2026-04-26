'use client';

import { IAuthor, IBookBasis } from '@shared-packages/api';
import { Flex, Masonry, MasonryProps } from 'antd';
import { BookCard } from './BookCard';
import { normalizeArray } from '@shared-packages/utils';
import { useMemo } from 'react';
import { BOOK_LIST_COLUMNS, BOOK_LIST_GAP } from './constants';

interface IBookListProps {
  books: IBookBasis[];
  authors: IAuthor[];
}

export const BookList = ({ books, authors }: IBookListProps) => {
  const { ids: booksIds, entities: booksEntities } = normalizeArray({
    array: books,
    idLookup: 'id',
  });
  const { entities: authorsEntities } = normalizeArray({ array: authors, idLookup: 'id' });

  const bookItems = useMemo(() => {
    return booksIds.map((bookId) => {

      const book = booksEntities[bookId];
      const authorNames = book.authorIds.reduce((acc, authorId) => {
        if (authorsEntities[authorId]) acc.push(authorsEntities[authorId].name);
        return acc;
      }, [] as string[]);
      const isAvailable = book.booksAvailableTotal > 0;

      const item: NonNullable<MasonryProps['items']>[number] = {
        key: book.id,
        data: {}
      }

      item.children = <BookCard authorNames={authorNames} available={isAvailable} {...book} />

      return item;
    });
  }, [booksIds, booksEntities, authorsEntities]);

  return <Masonry columns={BOOK_LIST_COLUMNS} gutter={BOOK_LIST_GAP} items={bookItems}/>;
};
