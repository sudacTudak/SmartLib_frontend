'use client';

import { memo } from 'react';
import { FULL_HEADER_HEIGHT } from 'src/features/layout';
import classNames from 'classnames';

import styles from './SimilarWorksSection.module.scss';
import { IWork } from '@shared-packages/api';
import { SimilarWorksWidget } from './SimilarWorksWidget';

interface ISimilarWorksSectionProps {
  className?: string;
  workId: IWork['id'];
}

export const SimilarWorksSection = memo(function SimilarWorksSection({ className, workId }: ISimilarWorksSectionProps) {
  const widgetHeight = `calc(100vh - 30px - ${FULL_HEADER_HEIGHT}px)`;

  return (
    <section className={classNames(styles.similarWorksSection, className)}>
      <div className={styles.similarWorksWidget} style={{ height: widgetHeight }}>
        <SimilarWorksWidget workId={workId} />
      </div>
    </section>
  );
});
