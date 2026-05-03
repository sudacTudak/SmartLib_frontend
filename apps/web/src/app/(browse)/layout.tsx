import styles from './browse-layout.module.scss';
import { SearchContextProvider } from 'src/global/globalSearch';
import { HeaderPanel } from 'src/widgets/layout/HeaderPanel';

/** Каталог, карточки книги и библиотеки: общий шапка + поиск. */
export default function BrowseLayout({ children }: { children: React.ReactNode }) {
  return (
    <SearchContextProvider>
      <div className={styles.root}>
        <HeaderPanel />
        <div className={styles.main}>{children}</div>
      </div>
    </SearchContextProvider>
  );
}
