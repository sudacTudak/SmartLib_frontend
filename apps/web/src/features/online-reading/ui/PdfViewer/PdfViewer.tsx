'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Document, Page } from 'react-pdf';
import { Button, Flex } from 'antd';
import { LeftOutlined, MenuOutlined, RightOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import { Loader } from '@shared/ui/components';
import { ToFavoriteButton } from '@features/catalog/ui';

import { configurePdfWorker } from '../../lib/configurePdfWorker';
import { saveReadingPage } from '../../model/readingProgressStorage';

import styles from './PdfViewer.module.scss';
import { IconButton } from '@shared-packages/ui/buttons';
import { APP_ROUTES } from '@global/routes';
import { ToFavoriteButtonVariant } from '@features/catalog/ui/ToFavoriteButton/enums';

configurePdfWorker();

const THUMBNAIL_WIDTH = 88;
const MAIN_PAGE_WIDTH = 720;

type PdfViewerProps = {
  workId: string;
  pdfUrl: string;
  initialPage: number;
};

function getScrollTopInContainer(container: HTMLElement, element: HTMLElement): number {
  return element.getBoundingClientRect().top - container.getBoundingClientRect().top + container.scrollTop;
}

function scrollSidebarToThumbnail(sidebar: HTMLElement, page: number) {
  const thumbnail = sidebar.querySelector<HTMLElement>(`[data-thumbnail-page="${page}"]`);
  if (!thumbnail) {
    return;
  }

  const thumbnailTop = getScrollTopInContainer(sidebar, thumbnail);
  const thumbnailBottom = thumbnailTop + thumbnail.offsetHeight;
  const visibleTop = sidebar.scrollTop;
  const visibleBottom = visibleTop + sidebar.clientHeight;

  if (thumbnailTop < visibleTop) {
    sidebar.scrollTop = thumbnailTop;
    return;
  }

  if (thumbnailBottom > visibleBottom) {
    sidebar.scrollTop = thumbnailBottom - sidebar.clientHeight;
  }
}

export function PdfViewer({ workId, pdfUrl, initialPage }: PdfViewerProps) {
  const feedRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLElement>(null);
  const pageElementRefs = useRef<Map<number, HTMLDivElement>>(new Map());
  const isProgrammaticScrollRef = useRef(false);
  const hasRestoredInitialPageRef = useRef(false);

  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(initialPage);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);

  useEffect(() => {
    setPageNumber(initialPage);
    hasRestoredInitialPageRef.current = false;
  }, [initialPage, pdfUrl]);

  useEffect(() => {
    setNumPages(0);
    setLoadError(null);
    pageElementRefs.current.clear();
  }, [pdfUrl]);

  const scrollFeedToPage = useCallback((page: number, behavior: ScrollBehavior = 'smooth') => {
    const feedElement = feedRef.current;
    const pageElement = pageElementRefs.current.get(page);
    if (!feedElement || !pageElement) {
      return;
    }

    isProgrammaticScrollRef.current = true;
    feedElement.scrollTo({ top: getScrollTopInContainer(feedElement, pageElement), behavior });
    window.setTimeout(
      () => {
        isProgrammaticScrollRef.current = false;
      },
      behavior === 'smooth' ? 500 : 0,
    );
  }, []);

  const goToPage = useCallback(
    (nextPage: number, behavior: ScrollBehavior = 'smooth') => {
      const clampedPage = numPages > 0 ? Math.min(Math.max(1, nextPage), numPages) : Math.max(1, nextPage);

      setPageNumber(clampedPage);
      scrollFeedToPage(clampedPage, behavior);
    },
    [numPages, scrollFeedToPage],
  );

  useEffect(() => {
    if (pageNumber >= 1) {
      saveReadingPage(workId, pageNumber);
    }
  }, [workId, pageNumber]);

  useEffect(() => {
    if (!numPages || hasRestoredInitialPageRef.current) {
      return;
    }

    const targetPage = Math.min(Math.max(1, initialPage), numPages);
    hasRestoredInitialPageRef.current = true;
    goToPage(targetPage, 'auto');
  }, [numPages, initialPage, goToPage]);

  useEffect(() => {
    const feedElement = feedRef.current;
    if (!feedElement || numPages === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (isProgrammaticScrollRef.current) {
          return;
        }

        const mostVisibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (!mostVisibleEntry) {
          return;
        }

        const nextPage = Number((mostVisibleEntry.target as HTMLElement).dataset.page);
        if (nextPage > 0) {
          setPageNumber(nextPage);
        }
      },
      {
        root: feedElement,
        threshold: [0.25, 0.5, 0.75],
      },
    );

    pageElementRefs.current.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [numPages]);

  useEffect(() => {
    const sidebarElement = sidebarRef.current;
    if (!sidebarElement || numPages === 0) {
      return;
    }

    scrollSidebarToThumbnail(sidebarElement, pageNumber);
  }, [pageNumber, numPages]);

  const pageLabels = useMemo(() => {
    if (!numPages) {
      return [];
    }
    return Array.from({ length: numPages }, (_, index) => index + 1);
  }, [numPages]);

  const handleDocumentLoad = useCallback(({ numPages: total }: { numPages: number }) => {
    setNumPages(total);
    setLoadError(null);
    setPageNumber((current) => Math.min(Math.max(1, current), total));
  }, []);

  const handleDocumentError = useCallback(() => {
    setLoadError('Не удалось загрузить PDF. Проверьте ссылку или попробуйте позже.');
  }, []);

  const documentOptions = useMemo(
    () => ({
      isEvalSupported: false,
      withCredentials: true,
    }),
    [],
  );

  const isFirstPage = pageNumber <= 1;
  const isLastPage = numPages > 0 && pageNumber >= numPages;

  const workPageLink = useMemo(() => APP_ROUTES.work(workId), [workId]);

  const setPageElementRef = useCallback((page: number, element: HTMLDivElement | null) => {
    if (element) {
      pageElementRefs.current.set(page, element);
      return;
    }
    pageElementRefs.current.delete(page);
  }, []);

  const handleSidebarMenuOpenChange = useCallback(() => {
    setIsSidebarOpen((prev) => !prev);
  }, []);

  return (
    <div className={styles.root}>
      <Flex className={styles.toolbar} align="center">
        <Flex align="center" gap={8}>
          <Button
            type="default"
            href={workPageLink}
            icon={<LeftOutlined />}
            iconPlacement="start"
          >
            К книге
          </Button>
          <IconButton icon={<MenuOutlined />} sideSize={24} onClick={handleSidebarMenuOpenChange} type="default" />
          <ToFavoriteButton workId={workId} variant={ToFavoriteButtonVariant.Icon} />
        </Flex>
        <Flex className={styles.pageControls} justify="center">
          <Flex>
            <IconButton
              icon={<LeftOutlined />}
              type="default"
              onClick={() => goToPage(pageNumber - 1)}
              disabled={isFirstPage}
              aria-label="Предыдущая страница"
              sideSize={24}
            />
            <span className={styles.pageCounter}>{numPages > 0 ? `${pageNumber} / ${numPages}` : '—'}</span>
            <IconButton
              icon={<RightOutlined />}
              type="default"
              onClick={() => goToPage(pageNumber + 1)}
              disabled={isLastPage}
              aria-label="Следующая страница"
              sideSize={24}
            />
          </Flex>
        </Flex>
      </Flex>

      <div className={styles.body}>
        {loadError ? (
          <p className={classNames(styles.status, styles.error)}>{loadError}</p>
        ) : (
          <Document
            key={pdfUrl}
            file={pdfUrl}
            options={documentOptions}
            onLoadSuccess={handleDocumentLoad}
            onLoadError={handleDocumentError}
            loading={
              <div className={styles.feedLoading}>
                <Loader size="large" />
              </div>
            }
            error={<p className={classNames(styles.status, styles.error)}>Не удалось загрузить PDF.</p>}
            className={styles.document}
          >
            {numPages > 0 && (
              <>
                <aside
                  ref={sidebarRef}
                  className={classNames(styles.sidebar, { [styles.sidebarHidden]: !isSidebarOpen })}
                  aria-label="Страницы документа"
                >
                  {pageLabels.map((page) => (
                    <button
                      key={page}
                      type="button"
                      data-thumbnail-page={page}
                      className={classNames(styles.thumbnailButton, {
                        [styles.thumbnailButtonActive]: page === pageNumber,
                      })}
                      onClick={() => goToPage(page, 'auto')}
                      aria-label={`Страница ${page}`}
                      aria-current={page === pageNumber ? 'page' : undefined}
                    >
                      <Page
                        pageNumber={page}
                        width={THUMBNAIL_WIDTH}
                        renderTextLayer={false}
                        renderAnnotationLayer={false}
                      />
                      <span className={styles.thumbnailLabel}>{page}</span>
                    </button>
                  ))}
                </aside>

                <div ref={feedRef} className={styles.feed}>
                  {pageLabels.map((page) => (
                    <div
                      key={page}
                      ref={(element) => setPageElementRef(page, element)}
                      data-page={page}
                      className={styles.pageItem}
                    >
                      <div className={styles.pageWrap}>
                        <Page
                          pageNumber={page}
                          width={MAIN_PAGE_WIDTH}
                          renderTextLayer={false}
                          renderAnnotationLayer={false}
                          loading={
                            <div className={styles.pageLoading}>
                              <Loader size="large" />
                            </div>
                          }
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </Document>
        )}
      </div>
    </div>
  );
}
