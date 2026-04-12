import Link from 'next/link';

import styles from '../auth-form.module.scss';

export default function RegisterPage() {
  return (
    <>
      <h1 className={styles.title}>Регистрация</h1>
      <p className={styles.lead}>Форма регистрации — позже.</p>
      <form className={styles.form} noValidate>
        <label className={styles.label}>
          Email
          <input className={styles.input} type="email" name="email" autoComplete="email" disabled />
        </label>
        <label className={styles.label}>
          Пароль
          <input className={styles.input} type="password" name="password" autoComplete="new-password" disabled />
        </label>
        <button className={styles.submit} type="button" disabled>
          Зарегистрироваться
        </button>
      </form>
      <p className={styles.footer}>
        Уже есть аккаунт? <Link href="/login">Войти</Link>
      </p>
      <p className={styles.back}>
        <Link href="/">На главную</Link>
      </p>
    </>
  );
}
