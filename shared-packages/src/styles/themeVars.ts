import styles from './variables.module.css';

/**
 * Семантическая карта поверх литералов из `variables.module.css` (как в вашем примере с `themeVars`).
 * Расширяйте вложенность под продукт — здесь базовая схема Ant-подобных токенов.
 */
export const themeVars = {
  color: {
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
    },
    fill: {
      background: {
        screen: {
          base: styles.colorBgLight,
          container: styles.colorBgContainerLight,
          layout: styles.colorBgLayoutLight,
          elevated: styles.colorBgElevatedLight,
        },
      },
    },
    border: {
      primary: styles.colorBorderLight,
      secondary: styles.colorBorderSecondaryLight,
    },
  },
} as const;

export type ThemeVars = typeof themeVars;
