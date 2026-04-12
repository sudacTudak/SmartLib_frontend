import Link from 'next/link';

import styles from '../auth-form.module.scss';

export default function LoginPage() {
  return (
    <>
      <h1 className={styles.title}>Вход</h1>
      <p className={styles.lead}>Форма авторизации — позже (API + состояние сессии).</p>
      <form className={styles.form} noValidate>
        <label className={styles.label}>
          Email
          <input className={styles.input} type="email" name="email" autoComplete="email" disabled />
        </label>
        <label className={styles.label}>
          Пароль
          <input
            className={styles.input}
            type="password"
            name="password"
            autoComplete="current-password"
            disabled
          />
        </label>
        <button className={styles.submit} type="button" disabled>
          Войти
        </button>
      </form>
      <p className={styles.footer}>
        <Link href="/register">Регистрация</Link>
        {' · '}
        <Link href="/reset-password">Забыли пароль?</Link>
      </p>
      <p className={styles.back}>
        <Link href="/">На главную</Link>
      </p>
    </>
  );
}
