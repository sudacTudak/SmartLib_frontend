'use client'

import Image from 'next/image';
import Link from 'next/link';
import { APP_ROUTES } from '@lib/routes';
import { Flex, Typography } from 'antd';
import classNames from 'classnames';
import styles from './BookCard.module.scss';

interface IBookCardProps {
  id: string;
  title: string;
  author: string;
  description: string | null;
  genre: string;
  rating?: number;
  onlineVersionLink: string | null;
  className?: string;
}

const { Title, Text } = Typography

export const BookCard = ({
  id,
  title,
  author,
  description,
  rating,
  onlineVersionLink,
  className,
}: IBookCardProps) => {
  return (
    <Flex vertical className={classNames(styles.bookCard, className)}>
      <Link href={APP_ROUTES.book(id)}>
        <Image
          src={'https://placehold.co/200x100/png'}
          alt="Картинка с книгой"
          width={200}
          height={100}
        />
        <Flex vertical className={styles.bookCardBody} gap={4}>
          <Title level={3}>{title}</Title>
          <Text>{author}</Text>
          <Text>{description}</Text>
          {onlineVersionLink && <Text type="success">Есть онлайн</Text>}
        </Flex>
      </Link>
    </Flex>
  );
};
