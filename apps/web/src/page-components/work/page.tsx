import { PageContent } from 'src/widgets/layout';

import styles from './BookDetailPage.module.scss';
import Image from 'next/image';
import { IWork } from '@shared-packages/api';
import { InfoGrid } from '@shared/ui/components';
import { LibraryAvailabilityCard, ReserveButtonAuthGate } from './components';
import { getGridInfoItems } from './tools';
import { WORK_CATEGORY_SINGLE_LABELS } from '@shared-packages/enums';
import { ILibraryBranch } from '@shared-packages/api/domains/libraries';
import { PrimaryText } from 'src/shared/ui/components/PrimaryText';

interface IWorkDetailProps {
  work: IWork;
  libraryEntities: Record<string, ILibraryBranch>;
  libraryIds: ILibraryBranch['id'][];
  availabilityByLibrariesMap: Record<string, number>;
  authorNames: string[];
  genreTitles: string[];
  totalAvailableCount: number;
}

const COVER_SRC = `https://placehold.co/720x960/png?text=Work`;

export function WorkDetailPage({
  work,
  libraryEntities,
  libraryIds,
  availabilityByLibrariesMap,
  authorNames,
  genreTitles,
  totalAvailableCount,
}: IWorkDetailProps) {
  const gridInfoItems = getGridInfoItems(work);
  const isAnywhereAvailable = totalAvailableCount > 0;

  return (
    <PageContent variant="detail">
      <div className={styles.root}>
        <section className={styles.hero}>
          <div className={styles.leftColumn}>
            <div className={styles.cover}>
              <Image src={COVER_SRC} alt={work.title} fill sizes="280px" className={styles.coverImg} />
            </div>
            <div className={styles.actions}>
              {work.onlineVersionLink && (
                <a href={work.onlineVersionLink} target="_blank" rel="noreferrer" className={styles.readOnlineLink}>
                  Читать онлайн
                </a>
              )}
              <ReserveButtonAuthGate
                disabled={!isAnywhereAvailable}
                variant="primary"
                className={styles.reserveButton}
                context={{ workId: work.id }}
              />
            </div>
          </div>

          <div className={styles.meta}>
            <h1 className={styles.title}>{work.title}</h1>

            <div className={styles.subRow}>
              <span className={styles.label}>{authorNames.length > 1 ? 'Авторы:' : 'Автор:'}</span>
              <span>{authorNames.length ? authorNames.join(', ') : '—'}</span>
            </div>

            <div className={styles.subRow}>
              <span className={`${styles.pill} ${styles.pillPrimary}`}>
                {WORK_CATEGORY_SINGLE_LABELS[work.category]}
              </span>
              {genreTitles.slice(0, 3).map((t) => (
                <span key={t} className={styles.pill}>
                  {t}
                </span>
              ))}
            </div>

            <InfoGrid items={gridInfoItems} />

            <div className={styles.descriptionBlock}>
              <h2 className={styles.descriptionTitle}>О книге</h2>
              <p className={styles.description}>{work.description || '—'}</p>
            </div>
          </div>
        </section>

        <section className={styles.slider}>
          <h2 className={styles.sectionTitle}>
            В наличии в филиалах <PrimaryText>({libraryIds.length})</PrimaryText>:
          </h2>
          <div className={styles.scrollRow}>
            {libraryIds.map((libraryId) => (
              <LibraryAvailabilityCard
                key={libraryId}
                workId={work.id}
                library={libraryEntities[libraryId]}
                availableCount={availabilityByLibrariesMap[libraryId]}
              />
            ))}
          </div>
        </section>
      </div>
    </PageContent>
  );
}
