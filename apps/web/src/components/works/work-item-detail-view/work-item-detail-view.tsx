'use client';

import type { WorkItemDetailData } from '@shared-packages/api';
import { Alert, Descriptions, Typography } from 'antd';

import { AuthStatus } from 'src/lib/auth/enums';
import { useAuth } from 'src/lib/auth/auth-context';

type WorkItemDetailViewProps = {
  item: WorkItemDetailData;
};

export function WorkItemDetailView({ item }: WorkItemDetailViewProps) {
  const { user, status } = useAuth();
  const viewer = status === AuthStatus.Ready ? user : null;

  const fullName = viewer ? [viewer.lastName, viewer.firstName, viewer.patronymic].filter(Boolean).join(' ') : '';

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
        {item.title}
      </Typography.Title>
      <Descriptions bordered column={{ xs: 1, sm: 1, md: 2 }} size="middle">
        <Descriptions.Item label="Авторы (id)">{item.authorIds.join(', ')}</Descriptions.Item>
        <Descriptions.Item label="Издательство">{item.publisher}</Descriptions.Item>
        <Descriptions.Item label="Год">{item.createdYear}</Descriptions.Item>
        <Descriptions.Item label="Жанр (id)">{item.genreId}</Descriptions.Item>
        <Descriptions.Item label="Филиал (id)">{item.libraryBranchId}</Descriptions.Item>
        <Descriptions.Item label="Всего экземпляров">{item.totalCount}</Descriptions.Item>
        <Descriptions.Item label="Доступно">{item.availableCount}</Descriptions.Item>
        <Descriptions.Item label="Описание" span={2}>
          {item.description || '—'}
        </Descriptions.Item>
        {item.onlineVersionLink ? (
          <Descriptions.Item label="Онлайн" span={2}>
            <Typography.Link href={item.onlineVersionLink} target="_blank" rel="noreferrer">
              {item.onlineVersionLink}
            </Typography.Link>
          </Descriptions.Item>
        ) : null}
      </Descriptions>
    </>
  );
}

