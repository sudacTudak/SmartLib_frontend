'use client'

import { Button, ConfigProvider, ThemeConfig } from 'antd';
import { ToFavoriteButtonVariant } from './enums';
import { HeartOutlined } from '@ant-design/icons';
import { useCallback, useMemo } from 'react';

import styles from './ToFavoriteButton.module.scss';
import { themeVars } from '@shared-packages/ui';

interface IToFavoriteButtonProps {
  variant?: ToFavoriteButtonVariant;
}

const AuthGatedButton = Button

export function ToFavoriteButton(props: IToFavoriteButtonProps) {

  const handleClick = useCallback(() => {
    // placeholder
  }, []);

  const themeConig = useMemo(() => ({
    components: {
      Button: {
        colorText: themeVars.color.common.lightRed,
        colorBgContainer: 'transparent',
        colorBorder: 'transparent',
        fontWeight: 500,
      }
    }
  } as ThemeConfig), [])

  return <ConfigProvider theme={themeConig}>
    <AuthGatedButton onClick={handleClick} variant='text' className={styles.favoriteButton}>
    В избранное <HeartOutlined />
  </AuthGatedButton> 
  </ConfigProvider>   
}
