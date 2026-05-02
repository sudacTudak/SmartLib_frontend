import Link from 'next/link';
import styles from './styles.module.scss';
import { useRouter } from 'next/router';
import { APP_ROUTES } from 'src/global/routes';

export function NotFoundErrorPage() {
  const router = useRouter();

  return (
    <div className={styles.errorPage}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.title}>404. Страница не найдена</h1>
          <p>Извините, мы не смогли найти то, что Вы искали.</p>
          <div>
            <button onClick={router.back}>Вернуться назад</button>
            <Link href={APP_ROUTES.catalog}>К каталогу</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
