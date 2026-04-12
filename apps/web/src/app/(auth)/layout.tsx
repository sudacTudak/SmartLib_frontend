import styles from './auth-layout.module.scss';

/** Страницы входа / регистрации / смены пароля — только форма, без шапки каталога. */
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.root}>
      <div className={styles.card}>{children}</div>
    </div>
  );
}
