import styles from './GridItem.module.scss';
import classNames from 'classnames';
import { IInfoGridItem } from '../types';

type TGridItemProps = IInfoGridItem;

export function GridItem({ label, value, className, labelClassName, valueClassName }: TGridItemProps) {
  return (
    <div className={classNames(styles.infoCard, className)}>
      <p className={classNames(styles.infoLabel, labelClassName)}>{label}</p>
      <div className={classNames(styles.infoValue, valueClassName)}>{value}</div>
    </div>
  );
}
