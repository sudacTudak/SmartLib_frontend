'use client';

import { ConfigProvider, ThemeConfig } from 'antd';
import { memo, useMemo } from 'react';
import { FULL_HEADER_HEIGHT } from 'src/features/layout';
import classNames from 'classnames';

import styles from './SimilarWorksSection.module.scss';
import { IWork } from '@shared-packages/api';
import { SimilarWorksWidget } from './SimilarWorksWidget';

type TSimilarWorksSectionThemeConfig = ThemeConfig & {
  token: {
    headerHeight: number;
  };
};

interface ISimilarWorksSectionProps {
  className?: string;
  workId: IWork['id'];
}

export const SimilarWorksSection = memo(function SimilarWorksSection({ className, workId }: ISimilarWorksSectionProps) {
  const themeConfig = useMemo(
    () =>
      ({
        token: {
          headerHeight: FULL_HEADER_HEIGHT,
        },
      }) as TSimilarWorksSectionThemeConfig,
    [],
  );

  return (
    <ConfigProvider theme={themeConfig}>
      <section className={classNames(styles.similarWorksSection, className)}>
        <div className={styles.similarWorksWidget}>
          <SimilarWorksWidget workId={workId} />
        </div>
      </section>
    </ConfigProvider>
  );
});
