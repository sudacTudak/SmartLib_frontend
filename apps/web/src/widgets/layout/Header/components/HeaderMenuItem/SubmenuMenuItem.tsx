'use client';

import { Dropdown } from 'antd';
import { IHeaderSubmenuItemAction, ISubmenuHeaderMenuItemProps, IHeaderSubmenuItemLink } from './types';
import { useMemo } from 'react';

import styles from './HeaderMenuItem.module.scss';

import classNames from 'classnames';
import { useRouter } from 'next/navigation';
import { HeaderSubmenuItemType } from './enums';
import { MenuItemType, ItemType } from 'antd/es/menu/interface';

type TProps = Omit<ISubmenuHeaderMenuItemProps, 'itemType'>;

export function SubmenuMenuItem({ items, menuTitle, title, icon, className }: TProps) {
  const router = useRouter();

  const menuItems = useMemo(() => {
    const initialItems = [] as ItemType[];

    if (menuTitle) {
      initialItems.push(
        {
          key: 'menuTitle',
          label: menuTitle,
          disabled: true,
        },
        {
          type: 'divider',
        },
      );
    }

    return items.reduce((acc, item) => {
      const handleActionClick: MenuItemType['onClick'] = (info) => (item as IHeaderSubmenuItemAction).onClick(info.key);
      const handleLinkClick = () => router.push((item as IHeaderSubmenuItemLink).href);

      const menuItem = {
        key: item.key,
        label: item.title,
        onClick: item.itemType === HeaderSubmenuItemType.Action ? handleActionClick : handleLinkClick,
        extra: item.suffix
      } as MenuItemType;

      acc.push(menuItem);
      return acc;
    }, initialItems);
  }, [items, menuTitle, router]) as MenuItemType[];

  return (
    <Dropdown menu={{ items: menuItems }} placement="bottomRight" trigger={['hover']}>
      <div className={classNames(styles.menuItem, className)}>
        {icon}
        <span className={styles.menuItemTitle}>{title}</span>
      </div>
    </Dropdown>
  );
}
