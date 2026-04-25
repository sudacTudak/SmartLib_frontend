import type { ThemeConfig } from 'antd';
import { themeVars } from './themeVars';

export type TCustomThemeConfig = ThemeConfig & {}

/**
 * Тема Ant Design на литералах из `themeVars` (и `variables.module.css`).
 * Шрифт / радиус пока не вынесены в themeVars — см. `smartlib-root.css`.
 */
export const smartlibAntdTheme: TCustomThemeConfig = {
  token: {
    colorPrimary: themeVars.color.brand.primary,
    colorSuccess: themeVars.color.brand.success,
    colorWarning: themeVars.color.brand.warning,
    colorError: themeVars.color.brand.error,
    colorInfo: themeVars.color.brand.info,

    colorText: themeVars.color.text.primary,
    colorTextSecondary: themeVars.color.text.secondary,
    colorTextTertiary: themeVars.color.text.tertiary,
    colorTextQuaternary: themeVars.color.text.quaternary,

    colorBgBase: themeVars.color.fill.background.screen.base,
    colorBgContainer: themeVars.color.fill.background.screen.container,
    colorBgLayout: themeVars.color.fill.background.screen.layout,
    colorBgElevated: themeVars.color.fill.background.screen.elevated,

    colorBorder: themeVars.color.border.primary,
    colorBorderSecondary: themeVars.color.border.secondary,

    fontFamily:
      "-apple-system, blinkmacsystemfont, 'Segoe UI', roboto, 'Helvetica Neue', arial, 'Noto Sans', sans-serif",
    fontSize: 14,
    lineHeight: 1.5714285714285714,

    borderRadiusSM: themeVars.sizes.borderRadius.small,
    borderRadius: themeVars.sizes.borderRadius.medium,
    borderRadiusLG: themeVars.sizes.borderRadius.large,
  },
  components: {
    Segmented: {
      trackBg: themeVars.color.fill.background.screen.layout,
      itemColor: themeVars.color.text.secondary,
      itemHoverColor: themeVars.color.brand.primary,
      itemSelectedBg: themeVars.color.fill.background.screen.container,
      itemSelectedColor: themeVars.color.brand.primary,
    },
  },
};
