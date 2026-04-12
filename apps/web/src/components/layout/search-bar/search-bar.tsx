'use client';

import { Input, theme } from 'antd';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

export function SearchBar() {
  const { token } = theme.useToken();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState('');

  useEffect(() => {
    setQuery(searchParams.get('q') ?? '');
  }, [searchParams]);

  const onSearch = useCallback(
    (value: string) => {
      const q = value.trim();
      const params = new URLSearchParams();
      if (q) params.set('q', q);
      const suffix = params.toString() ? `?${params.toString()}` : '';
      router.push(`/catalog${suffix}`);
    },
    [router],
  );

  return (
    <div
      style={{
        paddingBlock: token.paddingSM,
        paddingInline: token.paddingLG,
        borderBottom: `1px solid ${token.colorBorderSecondary}`,
        background: token.colorBgElevated,
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <Input.Search
          placeholder="Название, автор, ISBN…"
          allowClear
          enterButton="Найти"
          size="large"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onSearch={onSearch}
          aria-label="Поиск по каталогу"
        />
      </div>
    </div>
  );
}
