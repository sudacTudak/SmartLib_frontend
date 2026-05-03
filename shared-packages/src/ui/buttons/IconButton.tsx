import type { ButtonProps, ThemeConfig } from 'antd';
import { Button, ConfigProvider } from 'antd';
import classNames from 'classnames';

import styles from './IconButton.module.scss';

export interface IIconButtonProps extends ButtonProps {
  sideSize?: number;
  rounded?: boolean;
}

interface IIconButtonTheme {
  components: {
    Button: {
      buttonMinWidth: number;
    };
  };
}

const DEFAULT_ONE_SIDE_SIZE = 32;

export function IconButton({
  className,
  sideSize = DEFAULT_ONE_SIDE_SIZE,
  rounded = false,
  ...props
}: IIconButtonProps) {
  const btnStyles: ThemeConfig & IIconButtonTheme = {
    components: {
      Button: {
        // Button`s width
        buttonMinWidth: sideSize,
        // Button`s height
        controlHeight: sideSize,
      },
    },
  };

  return (
    <ConfigProvider theme={btnStyles}>
      <Button
        className={classNames(styles.button, { [styles.rounded]: rounded }, className)}
        type="primary"
        {...props}
      />
    </ConfigProvider>
  );
}
