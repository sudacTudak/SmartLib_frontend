'use client';

import type { BookDetailData } from '@shared-packages/api';
import { Alert, Descriptions, Typography } from 'antd';

import { AuthStatus } from 'src/lib/auth/enums';
import { useAuth } from 'src/lib/auth/auth-context';

type BookDetailViewProps = {
  book: BookDetailData;
};

export function BookDetailView({ book }: BookDetailViewProps) {
  const { user, status } = useAuth();
  const viewer = status === AuthStatus.Ready ? user : null;

  const fullName = viewer
    ? [viewer.last_name, viewer.first_name, viewer.patronymic].filter(Boolean).join(' ')
    : '';

  return (
    <>
      {viewer && (
        <Alert
          type="info"
          showIcon
          message="Сессия"
          description={`Вы вошли как ${viewer.email}${fullName ? ` (${fullName})` : ''}.`}
          style={{ marginBottom: 16 }}
        />
      )}
      <Typography.Title level={2} style={{ marginTop: 0 }}>
        {book.title}
      </Typography.Title>
      <Descriptions bordered column={{ xs: 1, sm: 1, md: 2 }} size="middle">
        <Descriptions.Item label="Автор">{book.author}</Descriptions.Item>
        <Descriptions.Item label="Издательство">{book.publisher}</Descriptions.Item>
        <Descriptions.Item label="Год">{book.created_year}</Descriptions.Item>
        <Descriptions.Item label="Жанр (id)">{book.genre_id}</Descriptions.Item>
        <Descriptions.Item label="Филиал (id)">{book.library_branch_id}</Descriptions.Item>
        <Descriptions.Item label="Всего экземпляров">{book.total_count}</Descriptions.Item>
        <Descriptions.Item label="Доступно">{book.available_count}</Descriptions.Item>
        <Descriptions.Item label="Описание" span={2}>
          {book.description || '—'}
        </Descriptions.Item>
        {book.online_version_link ? (
          <Descriptions.Item label="Онлайн" span={2}>
            <Typography.Link href={book.online_version_link} target="_blank" rel="noreferrer">
              {book.online_version_link}
            </Typography.Link>
          </Descriptions.Item>
        ) : null}
      </Descriptions>
    </>
  );
}
