import Image from 'next/image';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getWorkCategoryLabel } from '@shared-packages/enums';

import { PageContent } from 'src/components/layout/page-content/page-content';
import { loadLibraryBranchDetail, loadWorkDetail } from 'src/lib/catalog-loaders';
import { getPublicServerApi } from 'src/lib/server-api';
import { LibraryAvailabilityCard, ReserveButtonAuthGate } from 'src/components/book-detail';

import styles from 'src/components/book-detail/BookDetailPage.module.scss';

type BookPageProps = {
  params: Promise<{ bookId: string }>;
};

export const dynamicParams = true;

export async function generateMetadata({ params }: BookPageProps): Promise<Metadata> {
  const { bookId } = await params;
  try {
    const work = await loadWorkDetail(bookId);
    return {
      title: `${work.title} — SmartLib`,
      description: work.description?.slice(0, 160) ?? undefined,
    };
  } catch {
    return { title: 'Произведение — SmartLib' };
  }
}

export default async function BookPage({ params }: BookPageProps) {
  const { bookId } = await params;

  try {
    const api = getPublicServerApi();

    const authors = await api.authors.list();
    const genres = await api.works.genre.list();
    const work = await loadWorkDetail(bookId);

    const authorNames = work.authorIds
      .map((id) => authors.find((a) => a.id === id)?.name)
      .filter(Boolean) as string[];

    const genreTitles = work.genreIds
      .map((id) => genres.find((g) => g.id === id)?.title)
      .filter(Boolean) as string[];

    const workItems = await api.works.workItems.listByWork({ work: work.id, onlyAvailable: true });
    const hasAnyAvailable = workItems.some((wi) => wi.availableCount > 0);
    const totalAvailable = workItems.reduce((acc, wi) => acc + (wi.availableCount || 0), 0);

    const branches = await Promise.all(workItems.map((wi) => loadLibraryBranchDetail(wi.libraryBranchId)));

    const coverSrc = `https://placehold.co/720x960/png?text=Work`;

    return (
      <PageContent variant="detail">
        <div className={styles.root}>
          <section className={styles.hero}>
            <div className={styles.cover}>
              <Image src={coverSrc} alt={work.title} fill sizes="280px" className={styles.coverImg} />
            </div>

            <div className={styles.meta}>
              <h1 className={styles.title}>{work.title}</h1>

              <div className={styles.subRow}>
                <span className={`${styles.pill} ${styles.pillPrimary}`}>{getWorkCategoryLabel(work.category)}</span>
                {genreTitles.slice(0, 3).map((t) => (
                  <span key={t} className={styles.pill}>
                    {t}
                  </span>
                ))}
              </div>

              <div className={styles.infoGrid}>
                <div className={styles.infoCard}>
                  <div className={styles.infoLabel}>Год</div>
                  <div className={styles.infoValue}>{work.createdYear}</div>
                </div>
                <div className={styles.infoCard}>
                  <div className={styles.infoLabel}>Издательство</div>
                  <div className={styles.infoValue}>{work.publisher || '—'}</div>
                </div>
                <div className={styles.infoCard}>
                  <div className={styles.infoLabel}>В наличии (всего)</div>
                  <div className={styles.infoValue}>{totalAvailable}</div>
                </div>
              </div>

              <div className={styles.subRow}>
                <span className={styles.label}>Авторы:</span>
                <span>{authorNames.length ? authorNames.join(', ') : '—'}</span>
              </div>

              <p className={styles.desc}>{work.description || '—'}</p>

              <div className={styles.actions}>
                {work.onlineVersionLink ? (
                  <a
                    href={work.onlineVersionLink}
                    target="_blank"
                    rel="noreferrer"
                    className={styles.readOnlineLink}
                  >
                    Читать онлайн
                  </a>
                ) : null}

                <ReserveButtonAuthGate
                  disabled={!hasAnyAvailable}
                  variant="primary"
                  className={styles.reserveButton}
                  context={{ workId: work.id }}
                />
              </div>
            </div>
          </section>

          <section className={styles.slider}>
            <h2 className={styles.sectionTitle}>Филиалы, где есть в наличии ({workItems.length})</h2>
            <div className={styles.scrollRow}>
              {workItems.map((wi, idx) => (
                <LibraryAvailabilityCard key={wi.id} branch={branches[idx]} item={wi} />
              ))}
            </div>
          </section>
        </div>
      </PageContent>
    );
  } catch {
    notFound();
  }
}

