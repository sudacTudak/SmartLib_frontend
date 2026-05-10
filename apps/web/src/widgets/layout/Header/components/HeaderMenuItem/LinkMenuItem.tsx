import Link from 'next/link';
import { ILinkHeaderMenuItemProps } from './types';

import styles from './HeaderMenuItem.module.scss';

type TProps = Omit<ILinkHeaderMenuItemProps, 'itemType'>;

export function LinkMenuItem({ title, icon, href }: TProps) {
  if (href === '' || title === '') return null;

  return (
    <Link href={href} className={styles.menuItem}>
      {icon}
      <span className={styles.menuItemTitle}>{title}</span>
    </Link>
  );
}
