'use client'

import { Header } from 'src/widgets/layout/Header';

import { HeaderVariant } from '@widgets/layout/Header/enums';
import { SearchContextProvider } from '@global/globalSearch';
import { Layout } from 'antd';
import { MemoizedProfileSider } from './../ProfileSider';
import { ReactNode } from 'react';

import styles from '../../layout.module.scss';

interface ILayoutProviderProps {
  children: ReactNode;
}

export function LayoutProvider({ children }: ILayoutProviderProps) {
  return (
    <SearchContextProvider>
      <Layout className={styles.root}>
        <Header variant={HeaderVariant.Short} />
        <Layout>
          <MemoizedProfileSider />
          <Layout.Content>{children}</Layout.Content>
        </Layout>
      </Layout>
    </SearchContextProvider>
  );
}
