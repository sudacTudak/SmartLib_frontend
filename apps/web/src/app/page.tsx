import Link from 'next/link';

import styles from './home.module.scss';

export default function HomePage() {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>SmartLib</h1>
      <p className={styles.lead}>Онлайн-каталог библиотек и книг.</p>
      <ul className={styles.links}>
        <li>
          <Link href="/catalog">Каталог</Link>
        </li>
        <li>
          <Link href="/books/example-id">Пример: книга</Link>
        </li>
        <li>
          <Link href="/libraries/example-id">Пример: библиотека</Link>
        </li>
        <li>
          <Link href="/login">Вход</Link>
        </li>
        <li>
          <Link href="/cabinet">Личный кабинет</Link>
        </li>
      </ul>
    </main>
  );
}
