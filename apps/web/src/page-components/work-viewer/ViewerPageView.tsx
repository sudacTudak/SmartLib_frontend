'use client';

import dynamic from 'next/dynamic';
import { ConfigProvider, Flex, ThemeConfig } from 'antd';
import { useMemo, type CSSProperties } from 'react';
import { IWork } from '@shared-packages/api';
import { Loader } from '@shared/ui/components';
import { FULL_HEADER_HEIGHT } from 'src/features/layout';

import { resolveOnlinePdfUrl } from '@features/online-reading/lib/resolveOnlinePdfUrl';
import { getOrCreateInitialPage } from '@features/online-reading/model/readingProgressStorage';

import styles from './ViewerPageView.module.scss';
import { VIEWER_TOOLBAR_HEIGHT } from '@page-components/work-viewer/constants';

const PdfViewer = dynamic(() => import('@features/online-reading/ui/PdfViewer').then((mod) => mod.PdfViewer), {
  ssr: false,
  loading: () => (
    <div className={styles.loading}>
      <Loader size="large" />
    </div>
  ),
});

type TViewerPageViewTheme = ThemeConfig & {
  token: {
    mainHeaderHeight: number;
    upperPanelHeight: number;
  };
};

interface IViewerPageViewProps {
  work: IWork;
}

export function ViewerPageView({ work }: IViewerPageViewProps) {
  const pdfUrl = useMemo(() => resolveOnlinePdfUrl(work.onlineVersionLink!), [work.onlineVersionLink]);
  const initialPage = useMemo(() => getOrCreateInitialPage(work.id), [work.id]);

  const themeConfig = useMemo(() => ({
    token: {
      mainHeaderHeight: FULL_HEADER_HEIGHT,
      upperPanelHeight: VIEWER_TOOLBAR_HEIGHT
    }
  }) as TViewerPageViewTheme, []);

  return (
    <ConfigProvider theme={themeConfig}>
      <Flex className={styles.root}>
        <PdfViewer workId={work.id} pdfUrl={pdfUrl} initialPage={initialPage} />
      </Flex>
    </ConfigProvider>
  );
}
