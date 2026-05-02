import { IInfoGridItem } from './types';
import styles from './InfoGrid.module.scss';
import { GridItem } from './GridItem';
import classNames from 'classnames';

interface IInfoGridProps {
  items: IInfoGridItem[];
  className?: string;
}

export function InfoGrid({ items, className }: IInfoGridProps) {
  return (
    <div className={classNames(styles.infoGrid, className)}>
      {items.map((item) => (
        <GridItem key={item.id} {...item} />
      ))}
    </div>
  );
}
