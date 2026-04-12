import styles from './form-error-banner.module.scss';

export type FormErrorBannerProps = {
  message: string | null;
};

export function FormErrorBanner({ message }: FormErrorBannerProps) {
  if (!message) return null;
  return (
    <div className={styles.root} role="alert">
      {message}
    </div>
  );
}
