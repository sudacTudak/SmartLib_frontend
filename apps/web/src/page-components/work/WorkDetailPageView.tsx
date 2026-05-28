'use client';

import dynamic from 'next/dynamic';
import { useMemo, useState } from 'react';
import Image from 'next/image';
import { Button } from 'antd';
import { IWorkFeedback, IWork } from '@shared-packages/api';
import { InfoGrid, TextTag, TextTagColor, TextTagSize } from '@shared/ui/components';
import { WORK_CATEGORY_SINGLE_LABELS, WorkCategory } from '@shared-packages/enums';
import { ILibraryBranch } from '@shared-packages/api/domains/libraries';
import { PrimaryText } from '@shared/ui/components/PrimaryText';
import { ToFavoriteButton } from '@features/catalog/ui';
import { workCoverPlaceholder300x430Url } from '@shared-packages/ui';
import { PageContent } from 'src/widgets/layout';
import { resolveOnlinePdfUrl } from '@features/online-reading/lib/resolveOnlinePdfUrl';

const WorkOnlineReader = dynamic(
  () => import('@features/online-reading/ui/WorkOnlineReader').then((mod) => mod.WorkOnlineReader),
  { ssr: false },
);

import { LibraryAvailabilityCard, ReserveModalTrigger } from './components';
import { SimilarWorksSection } from './components/SimilarWorksWidget';
import { WorkFeedbackForm } from './components/WorkFeedbackForm';
import { getGridInfoItems } from './tools';
import styles from './BookDetailPage.module.scss';

interface IWorkDetailPageViewProps {
  work: IWork;
  libraryEntities: Record<string, ILibraryBranch>;
  feedbacks: IWorkFeedback[];
  libraryIds: ILibraryBranch['id'][];
  availabilityByLibrariesMap: Record<string, number>;
  authorNames: string[];
  genreTitles: string[];
  totalAvailableCount: number;
}

export function WorkDetailPageView({
  work,
  libraryEntities,
  feedbacks,
  libraryIds,
  availabilityByLibrariesMap,
  authorNames,
  genreTitles,
  totalAvailableCount,
}: IWorkDetailPageViewProps) {
  const [isReadingOnline, setIsReadingOnline] = useState(false);

  const gridInfoItems = getGridInfoItems(work);
  const isAnywhereAvailable = totalAvailableCount > 0;
  const coverSrc = work.previewLink ?? workCoverPlaceholder300x430Url;

  const pdfUrl = useMemo(() => {
    if (!work.onlineVersionLink) {
      return null;
    }
    return resolveOnlinePdfUrl(work.onlineVersionLink);
  }, [work.onlineVersionLink]);

  if (isReadingOnline && pdfUrl) {
    return (
      <PageContent variant="detail">
        <WorkOnlineReader
          workId={work.id}
          workTitle={work.title}
          pdfUrl={pdfUrl}
          onClose={() => setIsReadingOnline(false)}
        />
      </PageContent>
    );
  }

  return (
    <PageContent variant="detail">
      <div className={styles.root}>
        <div className={styles.bookContent}>
          <section className={styles.previewColumn}>
            <div className={styles.cover}>
              <Image src={coverSrc} alt={work.title} width={300} height={430} className={styles.coverImg} />
            </div>
            <div className={styles.actions}>
              {pdfUrl && (
                <Button type="default" block onClick={() => setIsReadingOnline(true)}>
                  Читать онлайн
                </Button>
              )}
              <ReserveModalTrigger
                disabled={!isAnywhereAvailable}
                variant="primary"
                className={styles.reserveButton}
                workId={work.id}
                workTitle={work.title}
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
                    workTitle={work.title}
                    library={libraryEntities[libraryId]}
                    availableCount={availabilityByLibrariesMap[libraryId]}
                  />
                ))}
              </div>
            </section>

            <section className={styles.feedbackSection}>
              <h2 className={styles.sectionTitle}>
                Отзывы <PrimaryText>({feedbacks.length})</PrimaryText>:
              </h2>
              <WorkFeedbackForm workId={work.id} />
            </section>
          </div>
        </div>

        <SimilarWorksSection workId={work.id} className={styles.similarWorksSection} />
      </div>
    </PageContent>
  );
}
