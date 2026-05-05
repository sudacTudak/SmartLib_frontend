import { designTokenLiterals as d } from './design-tokens';

/**
 * Семантическая карта поверх литералов из `design-tokens.ts` (тот же SSOT, что и `:root` в `DesignTokensRootStyle`).
 */
export const themeVars = {
  color: {
    common: {
      white: d.colorWhite,
      yellow: d.colorYellow,
      lightRed: d.colorLightRed,
    },
    brand: {
      primary: d.colorPrimaryLight,
      success: d.colorSuccessLight,
      warning: d.colorWarningLight,
      error: d.colorErrorLight,
      info: d.colorInfoLight,
    },
    text: {
      primary: d.colorTextLight,
      secondary: d.colorTextSecondaryLight,
      tertiary: d.colorTextTertiaryLight,
      quaternary: d.colorTextQuaternaryLight,

      button: {
        default: d.textButtonDefaultLight,
        hover: d.textButtonHoverLight,
        active: d.textButtonActiveLight,
        cancel: {
          default: d.textButtonCancelDefaultLight,
          hover: d.textButtonCancelHoverLight,
          active: d.textButtonCancelActiveLight,
        },
      },
    },
    fill: {
      background: {
        screen: {
          base: d.colorBgLight,
          container: d.colorBgContainerLight,
          layout: d.colorBgLayoutLight,
          elevated: d.colorBgElevatedLight,
        },
        components: {
          button: {
            primary: {
              default: d.colorFillBackgroundComponentsButtonPrimaryDefaultLight,
              hover: d.colorFillBackgroundComponentsButtonPrimaryHoverLight,
              active: d.colorFillBackgroundComponentsButtonPrimaryActiveLight,
            },
            secondary: {
              default: d.colorFillBackgroundComponentsButtonSecondaryDefaultLight,
              hover: d.colorFillBackgroundComponentsButtonSecondaryHoverLight,
              active: d.colorFillBackgroundComponentsButtonSecondaryActiveLight,
            },
          },
        },
      },
    },
    icon: {
      primary: {
        default: d.colorIconPrimaryDefaultLight,
        hover: d.colorIconPrimaryHoverLight,
        active: d.colorIconPrimaryActiveLight,
      },
    },
    border: {
      primary: d.colorBorderLight,
      secondary: d.colorBorderSecondaryLight,
    },
  },
  sizes: {
    borderRadius: {
      small: d.borderRadiusSM,
      medium: d.borderRadius,
      large: d.borderRadiusLG,
    },
  },
} as const;

export type ThemeVars = typeof themeVars;
