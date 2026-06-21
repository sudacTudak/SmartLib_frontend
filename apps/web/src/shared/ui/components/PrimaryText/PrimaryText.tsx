import { ReactNode } from 'react';
import styles from './PrimaryText.module.scss';
import classNames from 'classnames';

interface IPrimaryTextProps {
  children: ReactNode;
  className?: string;
  active?: boolean;
}

export function PrimaryText({ children, className, active }: IPrimaryTextProps) {
  const isActive = active ?? true;

  return <span className={classNames(styles.text, { [styles.active]: isActive }, className)}>{children}</span>;
}
