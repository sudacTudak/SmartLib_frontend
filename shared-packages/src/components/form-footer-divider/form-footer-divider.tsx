import cn from 'classnames';
import type { HTMLAttributes } from 'react';

import styles from './form-footer-divider.module.scss';

export type FormFooterDividerProps = Omit<HTMLAttributes<HTMLSpanElement>, 'children'>;

/** Вертикальный разделитель 1px между ссылками в футере формы / страницы. */
export function FormFooterDivider({ className, ...rest }: FormFooterDividerProps) {
  return (
    <span
      {...rest}
      className={cn(styles.root, className)}
      role="separator"
      aria-hidden="true"
    />
  );
}
