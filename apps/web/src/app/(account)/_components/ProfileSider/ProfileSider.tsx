'use client';

import { Layout, Menu } from 'antd';
import { ItemType } from 'antd/es/menu/interface';
import { useRouter } from 'next/navigation';
import { memo, useMemo } from 'react';
import { ProfileRoutes } from '@features/profile/model';

export function ProfileSider() {
  const router = useRouter();

  const items = useMemo(() => {
    return ProfileRoutes.map((routeItem) => {
      const { route, title, icon } = routeItem;
      
      return {
        key: route,
        label: title,
        icon,
        onClick: () => router.push(routeItem.route),
      } as ItemType;
    });
  }, [router]);

  return (
    <Layout.Sider>
      <Menu mode="inline" items={items}/>
    </Layout.Sider>
  );
}

export const MemoizedProfileSider = memo(ProfileSider);
