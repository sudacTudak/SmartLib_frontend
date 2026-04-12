import Link from 'next/link';

import styles from '../auth-form.module.scss';

export default function ResetPasswordPage() {
  return (
    <>
      <h1 className={styles.title}>Смена пароля</h1>
      <p className={styles.lead}>Запрос ссылки на email — позже.</p>
      <form className={styles.form} noValidate>
        <label className={styles.label}>
          Email
          <input className={styles.input} type="email" name="email" autoComplete="email" disabled />
        </label>
        <button className={styles.submit} type="button" disabled>
          Отправить ссылку
        </button>
      </form>
      <p className={styles.footer}>
        <Link href="/login">Назад ко входу</Link>
      </p>
    </>
  );
}
