import { UserWorksMenu } from './../UserWorksMenu';
import styles from './ActionsBar.module.scss';
import { HeaderMenuItem, HeaderMenuItemType, HeaderSubmenuItemType, THeaderSubmenuItem } from './../HeaderMenuItem';
import { useAuthContext } from '@global/auth';
import { AuthStatus } from '@global/auth/enums';
import { APP_ROUTES } from '@global/routes';
import { useMemo } from 'react';
import { UserOutlined } from '@ant-design/icons';

export function ActionsBar() {
  const { user, status, logoutLocal } = useAuthContext();
  const showUser = user && status === AuthStatus.Ready;

  const profileMenuItems = useMemo(
    () =>
      [
        { title: 'Профиль', itemType: HeaderSubmenuItemType.Link, href: APP_ROUTES.profile },
        { title: 'Выйти', itemType: HeaderSubmenuItemType.Action, onClick: logoutLocal },
      ] as THeaderSubmenuItem[],
    [logoutLocal],
  ) as THeaderSubmenuItem[];

  return (
    <div className={styles.actionsBar}>
      {showUser ? (
        <>
          <UserWorksMenu />
          <HeaderMenuItem
            itemType={HeaderMenuItemType.Submenu}
            title={user.email}
            items={profileMenuItems}
            menuTitle={user.email}
            icon={<UserOutlined style={{ width: 20, height: 20, fontSize: 20 }} />}
          />
        </>
      ) : (
        <HeaderMenuItem
          itemType={HeaderMenuItemType.Link}
          title="Профиль"
          href={APP_ROUTES.auth.login}
          icon={<UserOutlined style={{ width: 20, height: 20, fontSize: 20 }} />}
        />
      )}
    </div>
  );
}
