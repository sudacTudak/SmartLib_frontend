import { designTokenLiterals as d } from './themeTokens';

/**
 * Семантическая карта поверх литералов из `design-tokens.ts` (тот же SSOT, что и `:root` в `DesignTokensRootStyle`).
 */
export const themeVars = {
  color: {
    common: {
      white: d.colorWhite,
      yellow: d.colorYellow,
      lightRed: d.colorLightRed,
      transparent: d.colorTransparent,
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
          base: d.colorBackgroundScreenBaseLight,
          container: d.colorBackgroundScreenContainerLight,
          layout: d.colorBackgroundScreenLayoutLight,
        },
        components: {
          elevated: d.colorBackgroundComponentsElevatedLight,
          primary: {
            default: d.colorBackgroundComponentsPrimaryDefaultLight,
            hover: d.colorBackgroundComponentsPrimaryHoverLight,
            active: d.colorBackgroundComponentsPrimaryActiveLight,
          },
          secondary: {
            default: d.colorBackgroundComponentsSecondaryDefaultLight,
            hover: d.colorBackgroundComponentsSecondaryHoverLight,
            active: d.colorBackgroundComponentsSecondaryActiveLight,
          },
          tertiary: {
            default: d.colorBackgroundComponentsTertiaryDefaultLight,
            hover: d.colorBackgroundComponentsTertiaryHoverLight,
            active: d.colorBackgroundComponentsTertiaryActiveLight,
          },
          button: {
            primary: {
              default: d.colorBackgroundComponentsButtonPrimaryDefaultLight,
              hover: d.colorBackgroundComponentsButtonPrimaryHoverLight,
              active: d.colorBackgroundComponentsButtonPrimaryActiveLight,
            },
            secondary: {
              default: d.colorBackgroundComponentsButtonSecondaryDefaultLight,
              hover: d.colorBackgroundComponentsButtonSecondaryHoverLight,
              active: d.colorBackgroundComponentsButtonSecondaryActiveLight,
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
      secondary: {
        default: d.colorIconSecondaryDefaultLight,
        hover: d.colorIconSecondaryHoverLight,
        active: d.colorIconSecondaryActiveLight,
      },
    },
    border: {
      primary: {
        default: d.colorBorderPrimaryDefaultLight,
        hover: d.colorBorderPrimaryHoverLight,
        active: d.colorBorderPrimaryActiveLight,
      },
      secondary: {
        default: d.colorBorderSecondaryDefaultLight,
        hover: d.colorBorderSecondaryHoverLight,
        active: d.colorBorderSecondaryActiveLight,
      },
    },
  },
  sizes: {
    borderRadius: {
      small: d.borderRadiusSM,
      medium: d.borderRadius,
      large: d.borderRadiusLG,
    },
  },
  shadow: {
    card: {
      default: d.shadowCardDefaultLight,
      hover: d.shadowCardHoverLight,
    },
  },
} as const;

export type ThemeVars = typeof themeVars;
