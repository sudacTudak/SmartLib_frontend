import styles from './variables.module.css';

/**
 * Семантическая карта поверх литералов из `variables.module.css` (как в вашем примере с `themeVars`).
 * Расширяйте вложенность под продукт — здесь базовая схема Ant-подобных токенов.
 */
export const themeVars = {
  color: {
    common: {
      white: styles.colorWhite,
      yellow: styles.colorYellow
    },
    brand: {
      primary: styles.colorPrimaryLight,
      success: styles.colorSuccessLight,
      warning: styles.colorWarningLight,
      error: styles.colorErrorLight,
      info: styles.colorInfoLight,
    },
    text: {
      primary: styles.colorTextLight,
      secondary: styles.colorTextSecondaryLight,
      tertiary: styles.colorTextTertiaryLight,
      quaternary: styles.colorTextQuaternaryLight,

      button: {
        default: styles.textButtonDefaultLight,
        hover: styles.textButtonHoverLight,
        active: styles.textButtonActiveLight,
        cancel: {
          default: styles.textButtonCancelDefaultLight,
          hover: styles.textButtonCancelHoverLight,
          active: styles.textButtonCancelActiveLight,
        },
      },
    },
    fill: {
      background: {
        screen: {
          base: styles.colorBgLight,
          container: styles.colorBgContainerLight,
          layout: styles.colorBgLayoutLight,
          elevated: styles.colorBgElevatedLight,
        },
        components: {
          button: {
            primary: {
              default: styles.colorFillBackgroundComponentsButtonPrimaryDefaultLight,
              hover: styles.colorFillBackgroundComponentsButtonPrimaryHoverLight,
              active: styles.colorFillBackgroundComponentsButtonPrimaryActiveLight,
            },
            secondary: {
              default: styles.colorFillBackgroundComponentsButtonSecondaryDefaultLight,
              hover: styles.colorFillBackgroundComponentsButtonSecondaryHoverLight,
              active: styles.colorFillBackgroundComponentsButtonSecondaryActiveLight,
            },
          },
        },
      },
    },
    icon: {
      primary: {
        default: styles.colorIconPrimaryDefaultLight,
        hover: styles.colorIconPrimaryHoverLight,
        active: styles.colorIconPrimaryActiveLight,
      },
    },
    border: {
      primary: styles.colorBorderLight,
      secondary: styles.colorBorderSecondaryLight,
    },
  },
  sizes: {
    borderRadius: {
      small: 2,
      medium: 4,
      large: 8,
    },
  },
} as const;

export type ThemeVars = typeof themeVars;
