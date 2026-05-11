'use client';

import { useMemo, type ReactElement, type ReactNode } from 'react';
import { ConfigProvider, Form, FormProps, ThemeConfig } from 'antd';
import classNames from 'classnames';

import styles from './SmartlibForm.module.scss';

/**
 * Form Props включает в себя render-prop children, который не принимается JSX Form во время спреда.
 * Заглушаем тип таким образом, при этом сохраняя runtime функционал.
 */
const FormWithFullProps = Form as <TValues = unknown>(props: FormProps<TValues>) => ReactElement;

interface ISmartlibFormProps<TValues> extends FormProps<TValues> {
  className?: string;
  overlay?: ReactNode;
}

export function SmartlibForm<TValues>({ className, overlay, ...props }: ISmartlibFormProps<TValues>) {
  const themeConfig = useMemo(
    () =>
      ({
        components: {
          Checkbox: {
            controlHeight: 24,
          },
        },
      }) as ThemeConfig,
    [],
  );

  return (
    <div className={styles.wrapper}>
      <ConfigProvider theme={themeConfig}>
        <FormWithFullProps<TValues>
          layout="vertical"
          className={classNames(styles.smartlibForm, className)}
          {...props}
        />
      </ConfigProvider>
      {overlay}
    </div>
  );
}
