/**
 * Единый SSOT: литералы для JS (themeVars, Ant) и строка `:root` для глобальных `--smartlib-*`.
 * Без шага генерации: CSS-переменные вставляются через `<style>` в layout (SSR с первого байта HTML).
 */

export const designTokenLiterals = {
  colorPrimaryLight: '#0092fa',
  colorPrimaryLightRgb: 'rgb(0, 146, 250)',
  colorSuccessLight: '#52c41a',
  colorWarningLight: '#faad14',
  colorErrorLight: '#ff4d4f',
  colorInfoLight: '#1677ff',

  colorWhite: '#ffffff',
  colorYellow: '#ffb122',
  // colorLightRed: '#E83035',
  colorLightRed: '#F95849',

  colorTextLight: 'rgba(0, 0, 0, 0.88)',
  colorTextSecondaryLight: 'rgba(0, 0, 0, 0.65)',
  colorTextTertiaryLight: 'rgba(0, 0, 0, 0.45)',
  colorTextQuaternaryLight: 'rgba(0, 0, 0, 0.25)',

  textButtonDefaultLight: '#47536b',
  textButtonHoverLight: '#226dc3',
  textButtonActiveLight: '#1e61ae',
  textButtonCancelDefaultLight: '#f01400',
  textButtonCancelHoverLight: '#d61200',
  textButtonCancelActiveLight: '#bd1000',

  colorBgLight: '#ffffff',
  colorBgContainerLight: '#ffffff',
  colorBgLayoutLight: '#f5f5f5',
  colorBgElevatedLight: '#ffffff',

  colorFillBackgroundComponentsButtonPrimaryDefaultLight: '#2679d9',
  colorFillBackgroundComponentsButtonPrimaryHoverLight: '#226dc3',
  colorFillBackgroundComponentsButtonPrimaryActiveLight: '#1e61ae',
  colorFillBackgroundComponentsButtonSecondaryDefaultLight: '#47536b',
  colorFillBackgroundComponentsButtonSecondaryHoverLight: '#3d475c',
  colorFillBackgroundComponentsButtonSecondaryActiveLight: '#333b4d',

  colorBorderLight: '#d9d9d9',
  colorBorderSecondaryLight: '#f0f0f0',

  colorIconPrimaryDefaultLight: '#000000',
  colorIconPrimaryHoverLight: '#e8e2e3',
  colorIconPrimaryActiveLight: '#873212',

  borderRadiusSM: 2,
  borderRadius: 4,
  borderRadiusLG: 8
} as const;

const L = designTokenLiterals;

/** Глобальные `--smartlib-*` + типографика (те же значения, что раньше в ICSS). */
export function getSmartlibDesignTokensRootCss(): string {
  const decls = [
    `--smartlib-color-primary: ${L.colorPrimaryLight}`,
    `--smartlib-color-primary-rgb: ${L.colorPrimaryLightRgb}`,
    `--smartlib-color-success: ${L.colorSuccessLight}`,
    `--smartlib-color-warning: ${L.colorWarningLight}`,
    `--smartlib-color-error: ${L.colorErrorLight}`,
    `--smartlib-color-info: ${L.colorInfoLight}`,

    `--smartlib-color-white: ${L.colorWhite}`,
    `--smartlib-color-yellow: ${L.colorYellow}`,
    `--smartlib-color-light-red: ${L.colorLightRed}`,

    `--smartlib-color-text: ${L.colorTextLight}`,
    `--smartlib-color-text-secondary: ${L.colorTextSecondaryLight}`,
    `--smartlib-color-text-tertiary: ${L.colorTextTertiaryLight}`,
    `--smartlib-color-text-quaternary: ${L.colorTextQuaternaryLight}`,

    `--smartlib-text-button-default: ${L.textButtonDefaultLight}`,
    `--smartlib-text-button-hover: ${L.textButtonHoverLight}`,
    `--smartlib-text-button-active: ${L.textButtonActiveLight}`,
    `--smartlib-text-button-cancel-default: ${L.textButtonCancelDefaultLight}`,
    `--smartlib-text-button-cancel-hover: ${L.textButtonCancelHoverLight}`,
    `--smartlib-text-button-cancel-active: ${L.textButtonCancelActiveLight}`,

    `--smartlib-color-icon-primary: ${L.colorIconPrimaryDefaultLight}`,
    `--smartlib-color-icon-primary-hover: ${L.colorIconPrimaryHoverLight}`,
    `--smartlib-color-icon-primary-active: ${L.colorIconPrimaryActiveLight}`,

    `--smartlib-color-bg: ${L.colorBgLight}`,
    `--smartlib-color-bg-container: ${L.colorBgContainerLight}`,
    `--smartlib-color-bg-layout: ${L.colorBgLayoutLight}`,
    `--smartlib-color-bg-elevated: ${L.colorBgElevatedLight}`,

    `--smartlib-color-fill-background-components-button-primary-default: ${L.colorFillBackgroundComponentsButtonPrimaryDefaultLight}`,
    `--smartlib-color-fill-background-components-button-primary-hover: ${L.colorFillBackgroundComponentsButtonPrimaryHoverLight}`,
    `--smartlib-color-fill-background-components-button-primary-active: ${L.colorFillBackgroundComponentsButtonPrimaryActiveLight}`,
    `--smartlib-color-fill-background-components-button-secondary-default: ${L.colorFillBackgroundComponentsButtonSecondaryDefaultLight}`,
    `--smartlib-color-fill-background-components-button-secondary-hover: ${L.colorFillBackgroundComponentsButtonSecondaryHoverLight}`,
    `--smartlib-color-fill-background-components-button-secondary-active: ${L.colorFillBackgroundComponentsButtonSecondaryActiveLight}`,

    `--smartlib-color-border: ${L.colorBorderLight}`,
    `--smartlib-color-border-secondary: ${L.colorBorderSecondaryLight}`,

    `--smartlib-font-family: -apple-system, blinkmacsystemfont, 'Segoe UI', roboto, 'Helvetica Neue', arial, 'Noto Sans', sans-serif`,
    `--smartlib-font-size: 14px`,
    `--smartlib-line-height: 1.5714285714285714`,

    `--smartlib-border-radius-sm: ${L.borderRadiusSM}px`,
    `--smartlib-border-radius: ${L.borderRadius}px`,
    `--smartlib-border-radius-lg: ${L.borderRadiusLG}px`,

    `--smartlib-size-unit: 4px`,
  ];
  return `:root{${decls.join(';')}}`;
}
