import { memo } from 'react';
import { IIconProps } from './types';

import styles from './styles.module.scss';
import classNames from 'classnames';

export const CloseIcon = memo(function CloseIcon(props: IIconProps) {
  const { width = 16, height = 16, viewBox = '0 0 16 16', onClick, className, testId } = props;

  return (
    <svg
      onClick={onClick}
      width={width}
      height={height}
      viewBox={viewBox}
      className={classNames(styles.iconDefault, className)}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      data-testid={testId}
    >
      <path d="M12 4L4 12M4 4L12 12" className={styles.svgIconStrokeInherit} />
    </svg>
  );
});
