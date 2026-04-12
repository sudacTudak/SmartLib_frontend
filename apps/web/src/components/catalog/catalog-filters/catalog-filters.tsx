'use client';

import { Card, theme, Typography } from 'antd';

export function CatalogFilters() {
  const { token } = theme.useToken();

  return (
    <aside
      style={{
        width: 280,
        flexShrink: 0,
        padding: token.padding,
        borderRight: `1px solid ${token.colorBorderSecondary}`,
        background: token.colorBgContainer,
        minHeight: 200,
      }}
      aria-label="Фильтры каталога"
    >
      <Card size="small" title="Фильтры" bordered={false} style={{ background: 'transparent' }}>
        <Typography.Paragraph type="secondary" style={{ marginBottom: 0 }}>
          Здесь будут фильтры по библиотекам, жанрам, доступности и т.д.
        </Typography.Paragraph>
      </Card>
    </aside>
  );
}
