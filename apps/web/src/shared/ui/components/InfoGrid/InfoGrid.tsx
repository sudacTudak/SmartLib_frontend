'use client'

import { IInfoGridItem } from './types';
import styles from './InfoGrid.module.scss';
import { GridItem } from './GridItem';
import classNames from 'classnames';
import { Divider } from 'antd';
import React from 'react';

interface IInfoGridProps {
  items: IInfoGridItem[];
  className?: string;
}

export function InfoGrid({ items, className }: IInfoGridProps) {
  return (
    <div className={classNames(styles.infoGrid, className)}>
      {items.map((item, index, arr) => (
        <React.Fragment key={item.id}>
          <GridItem {...item} />
          {index < arr.length - 1 && <Divider className={styles.divider} variant="solid" vertical />}
        </React.Fragment>
      ))}
    </div>
  );
}
