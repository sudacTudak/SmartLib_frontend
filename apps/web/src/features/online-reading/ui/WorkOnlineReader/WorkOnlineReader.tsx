'use client';

import dynamic from 'next/dynamic';
import { useMemo } from 'react';
import { Button } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Loader } from '@shared/ui/components';

import { getOrCreateInitialPage } from '../../model/readingProgressStorage';

import styles from './WorkOnlineReader.module.scss';

const PdfViewer = dynamic(() => import('../PdfViewer').then((mod) => mod.PdfViewer), {
  ssr: false,
  loading: () => (
    <div className={styles.loading}>
      <Loader size="large" />
    </div>
  ),
});

type WorkOnlineReaderProps = {
  workId: string;
  workTitle: string;
  pdfUrl: string;
  onClose: () => void;
};

export function WorkOnlineReader({ workId, workTitle, pdfUrl, onClose }: WorkOnlineReaderProps) {
  const initialPage = useMemo(() => getOrCreateInitialPage(workId), [workId]);

  return (
    <section className={styles.root}>
      <header className={styles.header}>
        <h1 className={styles.title}>{workTitle}</h1>
        <Button type="default" icon={<ArrowLeftOutlined />} onClick={onClose}>
          К описанию
        </Button>
      </header>
      <div className={styles.readerBody}>
        <PdfViewer workId={workId} pdfUrl={pdfUrl} initialPage={initialPage} />
      </div>
    </section>
  );
}
