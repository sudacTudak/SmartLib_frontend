import { ConfigProvider, Rate, RateProps, ThemeConfig } from 'antd';

import { useMemo } from 'react';
import { themeVars } from '@shared-packages/ui';

type TCustomRateProps = RateProps;

export function CustomRate({ className, ...props }: TCustomRateProps) {
  const themeConfig = useMemo(
    () =>
      ({
        components: {
          Rate: {
            starBg: themeVars.color.fill.background.components.primary.default,
            starColor: themeVars.color.common.yellow,
          },
        },
      }) as ThemeConfig,
    [],
  );

  return (
    <ConfigProvider theme={themeConfig}>
      <Rate className={className} {...props} />
    </ConfigProvider>
  );
}
