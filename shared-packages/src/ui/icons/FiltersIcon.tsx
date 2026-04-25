import { memo } from 'react';

import type { IIconProps } from './types';

import styles from './styles.module.scss';
import classNames from 'classnames';

export const FiltersIcon = memo(function FiltersIcon(props: IIconProps) {
  const { width = 24, height = 24, onClick, className, testId } = props;
  const viewBox = '0 0 24 24';

  return (
    <svg
      onClick={onClick}
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox={viewBox}
      fill="none"
      data-testid={testId}
      className={classNames(styles.iconDefault, className)}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4 7.5V6.5H20V7.5H4ZM7 12.5V11.5H17V12.5H7ZM9 17.5V16.5H15V17.5H9Z"
        className={styles.svgIconFillInherit}
      />
    </svg>
  );
});
