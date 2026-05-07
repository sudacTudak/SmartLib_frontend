import { PageContent } from 'src/widgets/layout';

import styles from './BookDetailPage.module.scss';
import Image from 'next/image';
import { IWork } from '@shared-packages/api';
import { InfoGrid, TextTag, TextTagColor, TextTagSize } from '@shared/ui/components';
import { LibraryAvailabilityCard, ReserveModalTrigger } from './components';
import { getGridInfoItems } from './tools';
import { WORK_CATEGORY_SINGLE_LABELS, WorkCategory } from '@shared-packages/enums';
import { ILibraryBranch } from '@shared-packages/api/domains/libraries';
import { PrimaryText } from '@shared/ui/components/PrimaryText';
import { ToFavoriteButton } from '@features/catalog/ui';
import { workCoverPlaceholder300x430Url } from '@shared-packages/ui';
import { Button } from 'antd';
import { SimilarWorksWidget } from './components/SimilarWorksWidget';

interface IWorkDetailProps {
  work: IWork;
  libraryEntities: Record<string, ILibraryBranch>;
  libraryIds: ILibraryBranch['id'][];
  availabilityByLibrariesMap: Record<string, number>;
  authorNames: string[];
  genreTitles: string[];
  totalAvailableCount: number;
}

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

  const coverSrc = work.previewLink ?? workCoverPlaceholder300x430Url;

  return (
    <PageContent variant="detail">
      <div className={styles.root}>
        <section className={styles.previewColumn}>
          <div className={styles.cover}>
            <Image src={coverSrc} alt={work.title} width={300} height={430} className={styles.coverImg} />
          </div>
          <div className={styles.actions}>
            {work.onlineVersionLink && (
              <Button type="default" href={work.onlineVersionLink} target="_blank" rel="noreferrer">
                Читать онлайн
              </Button>
            )}
            <ReserveModalTrigger
              disabled={!isAnywhereAvailable}
              variant="primary"
              className={styles.reserveButton}
              context={{ workId: work.id }}
            />
            <ToFavoriteButton />
          </div>
        </section>

        <div className={styles.infoColumn}>
          <section className={styles.meta}>
            <div className={styles.contentHeader}>
              <h1 className={styles.title}>{work.title}</h1>
              <div className={styles.infoRows}>
                <div className={styles.subRow}>
                  <span className={styles.label}>{authorNames.length > 1 ? 'Авторы:' : 'Автор:'}</span>
                  <span>{authorNames.length ? authorNames.join(', ') : '—'}</span>
                </div>
                <div className={styles.subRow}>
                  <span className={styles.label}>Издательство:</span>
                  <span>{work.publisher}</span>
                </div>
                <div className={styles.subRow}>
                  {work.category !== WorkCategory.Book && (
                    <TextTag
                      text={WORK_CATEGORY_SINGLE_LABELS[work.category]}
                      color={TextTagColor.Gray}
                      size={TextTagSize.Medium}
                    />
                  )}
                  {genreTitles.slice(0, 3).map((genre) => (
                    <TextTag key={genre} text={genre} color={TextTagColor.Blue} size={TextTagSize.Medium} />
                  ))}
                </div>
              </div>
            </div>

            <InfoGrid items={gridInfoItems} />

            <div className={styles.descriptionBlock}>
              <h2 className={styles.descriptionTitle}>О книге</h2>
              <p className={styles.description}>{work.description || '—'}</p>
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
        <section className={styles.similarWorksWidget}>
          <SimilarWorksWidget workId={work.id} />
        </section>
      </div>
    </PageContent>
  );
}
