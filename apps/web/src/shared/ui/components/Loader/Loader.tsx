import styles from './Loader.module.scss';
import classNames from 'classnames';

interface ILoaderProps {
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

export function Loader({ size = 'medium', className }: ILoaderProps) {
  return (
    <span
      className={classNames(styles.loader, styles[size], className)}
      role="status"
      aria-label="Загрузка"
    />
  );
}
