import type { ReactNode } from 'react';

import styles from './PageContent.module.scss';
import classNames from 'classnames';

type PageContentProps = {
  children: ReactNode;
  /** Доп. класс для вариаций (детальная книга / библиотека) */
  variant?: 'default' | 'detail';
};

export function PageContent({ children, variant = 'default' }: PageContentProps) {
  return (
    <div className={styles.root} data-variant={variant}>
      {variant === 'default' && <div className={classNames(styles.inner, styles.default)}>{children}</div>}
      {variant === 'detail' && (
        <div className={classNames(styles.inner, styles.detail)}>
          <div className={styles.content}>{children}</div>
        </div>
      )}
    </div>
  );
}
