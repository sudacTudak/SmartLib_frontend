import { IAuthor, IBookBasis } from '@shared-packages/api';
import { Flex } from 'antd';
import { BookCard } from '../BookCard';
import { normalizeArray } from '@shared-packages/utils';

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

  return (
    <Flex gap={8} wrap='wrap'>
      {booksIds.map((bookId) => {
        const book = booksEntities[bookId];
        const authorNames = book.authorIds.reduce((acc, authorId) => {
          if (authorsEntities[authorId]) acc.push(authorsEntities[authorId].name);
          return acc;
        }, [] as string[]);
        const isAvailable = book.booksAvailableTotal > 0;

        return (
          <BookCard key={book.id} authorNames={authorNames} available={isAvailable} {...book} />
        );
      })}
    </Flex>
  );
};
