import { BookBasis } from '@shared-packages/api';
import { Flex } from 'antd';
import { BookCard } from '../BookCard';

interface IBookListProps {
  books: BookBasis[];
}

export const BookList = ({ books }: IBookListProps) => {
  return (
    <Flex gap={8}>
      {books.map((book) => (
        <BookCard key={book.id} {...book} />
      ))}
    </Flex>
  );
};
