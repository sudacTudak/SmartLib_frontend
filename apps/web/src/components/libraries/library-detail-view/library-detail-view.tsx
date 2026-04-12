'use client';

import type { LibraryBranchDetailData } from '@shared-packages/api';
import { Alert, Descriptions, Typography } from 'antd';

import { AuthStatus } from 'src/lib/auth/enums';
import { useAuth } from 'src/lib/auth/auth-context';

type LibraryDetailViewProps = {
  library: LibraryBranchDetailData;
};

export function LibraryDetailView({ library }: LibraryDetailViewProps) {
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
        Библиотека
      </Typography.Title>
      <Descriptions bordered column={1} size="middle">
        <Descriptions.Item label="Адрес">{library.address}</Descriptions.Item>
        <Descriptions.Item label="Создана">{library.created_at}</Descriptions.Item>
        <Descriptions.Item label="Обновлена">{library.updated_at}</Descriptions.Item>
        <Descriptions.Item label="ID">{library.id}</Descriptions.Item>
      </Descriptions>
    </>
  );
}
