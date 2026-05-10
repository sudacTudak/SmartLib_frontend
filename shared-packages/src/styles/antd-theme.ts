import type { ThemeConfig } from 'antd';
import { designTokenLiterals } from './design-tokens';
import { themeVars } from './themeVars';

/**
 * Семантические цветовые ключи SmartLib (useToken, кастомные стили компонентов).
 * Полный `token` в рантайме = эти ключи нативных алиасов Ant Design, которые задаём ниже.
 */
export type SmartlibSemanticThemeTokens = {
  colorPrimaryRgb: string;
  colorYellow: string;

  colorBackgroundScreenBase: string;
  colorBackgroundScreenContainer: string;
  colorBackgroundScreenLayout: string;

  colorBackgroundComponentsElevated: string;
  colorBackgroundComponentsPrimaryDefault: string;
  colorBackgroundComponentsPrimaryHover: string;
  colorBackgroundComponentsPrimaryActive: string;
  colorBackgroundComponentsSecondaryDefault: string;
  colorBackgroundComponentsSecondaryHover: string;
  colorBackgroundComponentsSecondaryActive: string;
  colorBackgroundComponentsTertiaryDefault: string;
  colorBackgroundComponentsTertiaryHover: string;
  colorBackgroundComponentsTertiaryActive: string;

  colorBackgroundComponentsButtonPrimaryDefault: string;
  colorBackgroundComponentsButtonPrimaryHover: string;
  colorBackgroundComponentsButtonPrimaryActive: string;
  colorBackgroundComponentsButtonSecondaryDefault: string;
  colorBackgroundComponentsButtonSecondaryHover: string;
  colorBackgroundComponentsButtonSecondaryActive: string;

  colorTextButtonDefault: string;
  colorTextButtonHover: string;
  colorTextButtonActive: string;
  colorTextButtonCancelDefault: string;
  colorTextButtonCancelHover: string;
  colorTextButtonCancelActive: string;

  colorIconPrimaryDefault: string;
  colorIconPrimaryHover: string;
  colorIconPrimaryActive: string;
  colorIconSecondaryDefault: string;
  colorIconSecondaryHover: string;
  colorIconSecondaryActive: string;

  colorBorderPrimaryDefault: string;
  colorBorderPrimaryHover: string;
  colorBorderPrimaryActive: string;
  colorBorderSecondaryDefault: string;
  colorBorderSecondaryHover: string;
  colorBorderSecondaryActive: string;

  colorFillBgComponentsButtonPrimaryDefault: string;
  colorFillBgComponentsButtonPrimaryHover: string;
  colorFillBgComponentsButtonPrimaryActive: string;

  colorFillBgComponentsButtonSecondaryDefault: string;
  colorFillBgComponentsButtonSecondaryHover: string;
  colorFillBgComponentsButtonSecondaryActive: string;

  /** UI-красный (избранное и т.д.), см. также colorError семантический. */
  colorLightRed: string;
};

/** Единственный объект токена: алиасы AntD + ключи из {@link SmartlibSemanticThemeTokens}. */
export type SmartlibThemeToken = NonNullable<ThemeConfig['token']> & SmartlibSemanticThemeTokens;

/**
 * Конфиг темы SmartLib для `<ConfigProvider theme={…}>`: один `token`-объект, при необходимости расширяйте `components`.
 */
export type SmartlibThemeConfig = {
  token: SmartlibThemeToken;
  components?: ThemeConfig['components'];
};

/** @deprecated Используйте {@link SmartlibThemeConfig}. */
export type TCustomThemeConfig = SmartlibThemeConfig;

/**
 * Тема Ant Design на литералах из `themeVars` (`design-tokens.ts`).
 */
export const smartlibAntdTheme: SmartlibThemeConfig = {
  token: {
    /** Бренд */
    colorPrimary: themeVars.color.brand.primary,
    colorPrimaryHover: themeVars.color.fill.background.components.button.primary.hover,
    colorPrimaryActive: themeVars.color.fill.background.components.button.primary.active,
    colorSuccess: themeVars.color.brand.success,
    colorWarning: themeVars.color.brand.warning,
    colorError: themeVars.color.brand.error,
    colorInfo: themeVars.color.brand.info,
    colorWhite: themeVars.color.common.white,

    colorPrimaryRgb: designTokenLiterals.colorPrimaryLightRgb,
    colorYellow: themeVars.color.common.yellow,
    colorLightRed: themeVars.color.common.lightRed,

    colorLink: themeVars.color.brand.primary,
    colorLinkHover: themeVars.color.fill.background.components.button.primary.hover,
    colorLinkActive: themeVars.color.fill.background.components.button.primary.active,

    colorPrimaryBg: themeVars.color.fill.background.components.tertiary.default,
    colorPrimaryBgHover: themeVars.color.fill.background.components.tertiary.hover,
    colorPrimaryBorder: themeVars.color.fill.background.components.secondary.default,
    colorPrimaryBorderHover: themeVars.color.fill.background.components.secondary.hover,

    colorFillTertiary: themeVars.color.fill.background.components.tertiary.default,
    colorFillSecondary: themeVars.color.fill.background.components.secondary.default,
    colorFillContent: themeVars.color.fill.background.screen.container,

    /** Тексты (AntD) */
    colorText: themeVars.color.text.primary,
    colorTextSecondary: themeVars.color.text.secondary,
    colorTextTertiary: themeVars.color.text.tertiary,
    colorTextQuaternary: themeVars.color.text.quaternary,
    colorTextLightSolid: themeVars.color.common.white,

    colorTextButtonDefault: themeVars.color.text.button.default,
    colorTextButtonHover: themeVars.color.text.button.hover,
    colorTextButtonActive: themeVars.color.text.button.active,
    colorTextButtonCancelDefault: themeVars.color.text.button.cancel.default,
    colorTextButtonCancelHover: themeVars.color.text.button.cancel.hover,
    colorTextButtonCancelActive: themeVars.color.text.button.cancel.active,

    /** Иконки — алиасы Ant + полный набор SmartLib */
    colorIcon: themeVars.color.icon.primary.default,
    colorIconHover: themeVars.color.icon.primary.hover,
    colorIconPrimaryDefault: themeVars.color.icon.primary.default,
    colorIconPrimaryHover: themeVars.color.icon.primary.hover,
    colorIconPrimaryActive: themeVars.color.icon.primary.active,
    colorIconSecondaryDefault: themeVars.color.icon.secondary.default,
    colorIconSecondaryHover: themeVars.color.icon.secondary.hover,
    colorIconSecondaryActive: themeVars.color.icon.secondary.active,

    /** Background / Screen */
    colorBgBase: themeVars.color.fill.background.screen.base,
    colorBgContainer: themeVars.color.fill.background.screen.container,
    colorBgLayout: themeVars.color.fill.background.screen.layout,
    colorBgElevated: themeVars.color.fill.background.components.elevated,

    colorBackgroundScreenBase: themeVars.color.fill.background.screen.base,
    colorBackgroundScreenContainer: themeVars.color.fill.background.screen.container,
    colorBackgroundScreenLayout: themeVars.color.fill.background.screen.layout,

    colorBackgroundComponentsElevated: themeVars.color.fill.background.components.elevated,

    colorBackgroundComponentsPrimaryDefault: themeVars.color.fill.background.components.primary.default,
    colorBackgroundComponentsPrimaryHover: themeVars.color.fill.background.components.primary.hover,
    colorBackgroundComponentsPrimaryActive: themeVars.color.fill.background.components.primary.active,
    colorBackgroundComponentsSecondaryDefault:
      themeVars.color.fill.background.components.secondary.default,
    colorBackgroundComponentsSecondaryHover: themeVars.color.fill.background.components.secondary.hover,
    colorBackgroundComponentsSecondaryActive:
      themeVars.color.fill.background.components.secondary.active,
    colorBackgroundComponentsTertiaryDefault: themeVars.color.fill.background.components.tertiary.default,
    colorBackgroundComponentsTertiaryHover: themeVars.color.fill.background.components.tertiary.hover,
    colorBackgroundComponentsTertiaryActive: themeVars.color.fill.background.components.tertiary.active,

    colorBackgroundComponentsButtonPrimaryDefault:
      themeVars.color.fill.background.components.button.primary.default,
    colorBackgroundComponentsButtonPrimaryHover:
      themeVars.color.fill.background.components.button.primary.hover,
    colorBackgroundComponentsButtonPrimaryActive:
      themeVars.color.fill.background.components.button.primary.active,
    colorBackgroundComponentsButtonSecondaryDefault:
      themeVars.color.fill.background.components.button.secondary.default,
    colorBackgroundComponentsButtonSecondaryHover:
      themeVars.color.fill.background.components.button.secondary.hover,
    colorBackgroundComponentsButtonSecondaryActive:
      themeVars.color.fill.background.components.button.secondary.active,

    colorFillBgComponentsButtonPrimaryDefault:
      themeVars.color.fill.background.components.button.primary.default,
    colorFillBgComponentsButtonPrimaryHover: themeVars.color.fill.background.components.button.primary.hover,
    colorFillBgComponentsButtonPrimaryActive:
      themeVars.color.fill.background.components.button.primary.active,

    colorFillBgComponentsButtonSecondaryDefault:
      themeVars.color.fill.background.components.button.secondary.default,
    colorFillBgComponentsButtonSecondaryHover:
      themeVars.color.fill.background.components.button.secondary.hover,
    colorFillBgComponentsButtonSecondaryActive:
      themeVars.color.fill.background.components.button.secondary.active,

    /** Обводки — алиасы Ant + состояния SmartLib */
    colorBorder: themeVars.color.border.primary.default,
    colorBorderSecondary: themeVars.color.border.secondary.default,
    colorSplit: themeVars.color.border.secondary.default,
    colorBorderPrimaryDefault: themeVars.color.border.primary.default,
    colorBorderPrimaryHover: themeVars.color.border.primary.hover,
    colorBorderPrimaryActive: themeVars.color.border.primary.active,
    colorBorderSecondaryDefault: themeVars.color.border.secondary.default,
    colorBorderSecondaryHover: themeVars.color.border.secondary.hover,
    colorBorderSecondaryActive: themeVars.color.border.secondary.active,

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
      itemSelectedBg: themeVars.color.fill.background.components.button.secondary.default,
      itemSelectedColor: themeVars.color.brand.primary,
    },
  },
};
