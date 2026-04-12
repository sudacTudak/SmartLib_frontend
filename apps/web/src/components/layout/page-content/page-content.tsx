import type { ReactNode } from 'react';

import styles from './page-content.module.scss';

type PageContentProps = {
  children: ReactNode;
  /** Доп. класс для вариаций (детальная книга / библиотека) */
  variant?: 'default' | 'detail';
};

export function PageContent({ children, variant = 'default' }: PageContentProps) {
  return (
    <div className={styles.root} data-variant={variant}>
      <div className={styles.inner}>{children}</div>
    </div>
  );
}
