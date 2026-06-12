import type { ButtonProps, ThemeConfig } from 'antd';
import { Button, ConfigProvider } from 'antd';
import classNames from 'classnames';
import { useMemo } from 'react';

import styles from './IconButton.module.scss';

export interface IIconButtonProps extends ButtonProps {
  sideSize?: number;
  rounded?: boolean;
  /**
   * Смержить тему ближайшего ConfigProvider выше по дереву с локальными
   * настройками размера кнопки (controlHeight, buttonMinWidth).
   */
  useOuterToken?: boolean;
}

const DEFAULT_ONE_SIDE_SIZE = 32;

function buildIconButtonTheme(sideSize: number, useOuterToken: boolean): ThemeConfig {
  const buttonSizeTokens = {
    buttonMinWidth: sideSize,
    controlHeight: sideSize,
  };

  if (useOuterToken) {
    return {
      inherit: true,
      components: {
        Button: buttonSizeTokens,
      },
    };
  }

  return {
    inherit: false,
    components: {
      Button: buttonSizeTokens,
    },
  };
}

export function IconButton({
  className,
  sideSize = DEFAULT_ONE_SIDE_SIZE,
  rounded = false,
  useOuterToken = false,
  ...props
}: IIconButtonProps) {
  const iconButtonTheme = useMemo(
    () => buildIconButtonTheme(sideSize, useOuterToken),
    [sideSize, useOuterToken],
  );

  return (
    <ConfigProvider theme={iconButtonTheme}>
      <Button
        className={classNames(styles.button, { [styles.rounded]: rounded }, className)}
        type="primary"
        {...props}
      />
    </ConfigProvider>
  );
}
