'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { Document, Page } from 'react-pdf';
import { Button } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import { Loader } from '@shared/ui/components';

import { configurePdfWorker } from '../../lib/configurePdfWorker';
import { saveReadingPage } from '../../model/readingProgressStorage';

import styles from './PdfViewer.module.scss';

import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';

configurePdfWorker();

const THUMBNAIL_WIDTH = 88;
const MAIN_PAGE_WIDTH = 720;

type PdfViewerProps = {
  workId: string;
  pdfUrl: string;
  initialPage: number;
};

export function PdfViewer({ workId, pdfUrl, initialPage }: PdfViewerProps) {
  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(initialPage);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    setPageNumber(initialPage);
  }, [initialPage, pdfUrl]);

  useEffect(() => {
    // При смене PDF сбрасываем состояние, чтобы не рендерить страницы от старого транспорта.
    setNumPages(0);
    setLoadError(null);
  }, [pdfUrl]);

  const goToPage = useCallback(
    (nextPage: number) => {
      if (numPages > 0) {
        setPageNumber(Math.min(Math.max(1, nextPage), numPages));
        return;
      }
      setPageNumber(Math.max(1, nextPage));
    },
    [numPages],
  );

  useEffect(() => {
    if (pageNumber >= 1) {
      saveReadingPage(workId, pageNumber);
    }
  }, [workId, pageNumber]);

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

  const isFirstPage = pageNumber <= 1;
  const isLastPage = numPages > 0 && pageNumber >= numPages;

  const documentOptions = useMemo(
    () => ({
      isEvalSupported: false,
      withCredentials: true,
    }),
    [],
  );

  if (loadError) {
    return <p className={classNames(styles.status, styles.error)}>{loadError}</p>;
  }

  return (
    <Document
      key={pdfUrl}
      file={pdfUrl}
      options={documentOptions}
      onLoadSuccess={handleDocumentLoad}
      onLoadError={handleDocumentError}
      loading={
        <div className={styles.status}>
          <Loader size="large" />
        </div>
      }
      error={
        <p className={classNames(styles.status, styles.error)}>Не удалось загрузить PDF.</p>
      }
      className={styles.root}
    >
      {numPages > 0 && (
        <aside className={styles.sidebar} aria-label="Страницы документа">
          {pageLabels.map((page) => (
            <button
              key={page}
              type="button"
              className={classNames(styles.thumbnailButton, {
                [styles.thumbnailButtonActive]: page === pageNumber,
              })}
              onClick={() => goToPage(page)}
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
      )}

      <div className={styles.main}>
        <div className={styles.toolbar}>
          <Button
            icon={<LeftOutlined />}
            onClick={() => goToPage(pageNumber - 1)}
            disabled={isFirstPage}
            aria-label="Предыдущая страница"
          />
          <span className={styles.pageCounter}>
            {numPages > 0 ? `${pageNumber} / ${numPages}` : '—'}
          </span>
          <Button
            icon={<RightOutlined />}
            onClick={() => goToPage(pageNumber + 1)}
            disabled={isLastPage}
            aria-label="Следующая страница"
          />
        </div>

        <div className={styles.canvas}>
          <div className={styles.pageWrap}>
            <Page
              pageNumber={pageNumber}
              width={MAIN_PAGE_WIDTH}
              renderTextLayer={false}
              renderAnnotationLayer={false}
              loading={
                <div className={styles.status}>
                  <Loader size="large" />
                </div>
              }
            />
          </div>
        </div>
      </div>
    </Document>
  );
}
