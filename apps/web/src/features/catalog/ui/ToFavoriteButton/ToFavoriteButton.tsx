'use client';

import { Button, ConfigProvider, ThemeConfig } from 'antd';
import { ToFavoriteButtonVariant } from './enums';
import { HeartOutlined } from '@ant-design/icons';
import { useCallback, useMemo } from 'react';

import styles from './ToFavoriteButton.module.scss';
import { themeVars } from '@shared-packages/ui';

import classNames from 'classnames';
import { useAuthGuard } from '@global/auth';
import { IconButton } from '@shared-packages/ui/buttons';
import { IWork } from '@shared-packages/api';

interface IToFavoriteButtonProps {
  variant?: ToFavoriteButtonVariant;
  workId: IWork['id'];
  className?: string;
}

export function ToFavoriteButton({ className, workId, variant }: IToFavoriteButtonProps) {
  const { modalNode, guardAction } = useAuthGuard();
  const isIcon = variant === ToFavoriteButtonVariant.Icon;

  const handleClick = useCallback(() => {
    guardAction(() => console.log('Hello from ToFavoriteButton: ', workId));
  }, [guardAction]);

  const themeConig = useMemo(
    () =>
      ({
        components: {
          Button: {
            colorText: themeVars.color.common.lightRed,
            colorBgContainer: 'transparent',
            colorBorder: 'transparent',
            fontWeight: 500,
            ...(isIcon ? { paddingInline: 0 } : {}),
          },
        },
      }) as ThemeConfig,
    [],
  );

  const componentInner = useMemo(() => {
    if (isIcon) {
      return (
        <IconButton
          onClick={handleClick}
          variant="text"
          type="default"
          sideSize={24}
          useOuterToken
          className={classNames(styles.favoriteButton, className)}
        >
          <HeartOutlined />
        </IconButton>
      );
    }

    return (
      <>
        <Button onClick={handleClick} variant="text" className={classNames(styles.favoriteButton, className)}>
          <span>В избранное</span> <HeartOutlined />
        </Button>
      </>
    );
  }, [isIcon, className, handleClick]);

  return (
    <>
      <ConfigProvider theme={themeConig}>{componentInner}</ConfigProvider>
      {modalNode}
    </>
  );
}
