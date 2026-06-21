import { RightOutlined } from '@ant-design/icons';
import { Button, ConfigProvider, Dropdown, ThemeConfig } from 'antd';
import { ItemType } from 'antd/es/menu/interface';
import { useCallback, useMemo, useState } from 'react';
import classNames from 'classnames';

import styles from './UserStatusDropdown.module.scss';
import { PrimaryText } from '@shared/ui/components';
import { themeVars } from '@shared-packages/ui';

interface IUserStatusDropdownProps {
  userName: string;
  logout: () => void;
}

type TUserStatusDropdownTheme = ThemeConfig & {
  components: {
    Button: {
      textColorActive: string;
    };
  };
};

export function UserStatusDropdown({ userName, logout }: IUserStatusDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenChange = useCallback((newState: boolean) => {
    setIsOpen(newState);
  }, []);

  const dropdownItems = useMemo(() => {
    return [
      {
        key: 'menuTitle',
        label: 'Профиль',
        disabled: true,
      },
      {
        type: 'divider',
      },
      { key: 'logout', label: 'Выйти', onClick: logout },
    ] as ItemType[];
  }, [logout]);

  const themeConfig = useMemo(
    () =>
      ({
        components: {
          Button: {
            textTextHoverColor: themeVars.color.text.button.hover,
            textTextActiveColor: themeVars.color.text.button.active,
            colorBgTextActive: themeVars.color.common.transparent,
          },
        },
      }) as TUserStatusDropdownTheme,
    [],
  );

  return (
    <ConfigProvider theme={themeConfig}>
      <Dropdown menu={{ items: dropdownItems }} trigger={['click']} onOpenChange={handleOpenChange}>
        <Button
          type="text"
          className={classNames(styles.userNameBtn, {
            [styles.open]: isOpen,
          })}
        >
          {userName}
          <RightOutlined className={styles.icon} />
        </Button>
      </Dropdown>
    </ConfigProvider>
  );
}
