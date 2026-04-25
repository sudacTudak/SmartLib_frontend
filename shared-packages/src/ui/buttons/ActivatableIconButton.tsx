import { memo } from 'react';
import { IconButton, IIconButtonProps } from './IconButton';
import classNames from 'classnames';

import styles from './ActivatableIconButton.module.scss';

interface IActivatableIconButtonProps extends IIconButtonProps {
  isActive: boolean;
}

export const ActivatableIconButton = memo(function ActivatableIconButton({
  isActive,
  className,
  ...props
}: IActivatableIconButtonProps) {
  return (
    <IconButton
      className={classNames(styles.activatableIconButton, {
        [styles.active]: isActive,
      }, className)}
      {...props}
    />
  );
});
