'use client';

import { Button, ButtonProps, ConfigProvider, ThemeConfig } from 'antd';
import { usePathname, useRouter } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import classNames from 'classnames';

import styles from './LinkButton.module.scss';
import { themeVars } from '@shared-packages/ui';

type TLinkButtonProps = Omit<ButtonProps, 'variant' | 'type' | 'href'> & {
  href: string;
  activatable?: boolean;
  isActive?: boolean;
};

export function LinkButton({ href, children, activatable = false, isActive, ...restProps }: TLinkButtonProps) {
  const router = useRouter();
  const pathname = usePathname();

  console.log('pathname: ', pathname);

  const isActiveByPathname = pathname.includes(href);
  const isActualActive = isActive ?? isActiveByPathname;
  console.log('isActialActive: ', isActualActive);

  const handleClick: NonNullable<TLinkButtonProps['onClick']> = useCallback(
    (e) => {
      e.preventDefault();
      router.push(href);
    },
    [router, href],
  );

  const themeConfig = useMemo(
    () =>
      ({
        components: {
          Button: {
            paddingInline: 8,
            borderRadius: themeVars.sizes.borderRadius.large,
          },
        },
      }) as ThemeConfig,
    [],
  );

  return (
    <ConfigProvider theme={themeConfig}>
      <Button
        type="link"
        onClick={handleClick}
        className={classNames({ [styles.active]: activatable && isActualActive })}
        {...restProps}
      >
        {children}
      </Button>
    </ConfigProvider>
  );
}
