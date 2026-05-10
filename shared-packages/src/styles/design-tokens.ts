export const designTokenLiterals = {
  colorPrimaryLight: '#0092fa',
  colorPrimaryLightRgb: 'rgb(0, 146, 250)',
  colorSuccessLight: '#52c41a',
  colorWarningLight: '#ffb122',
  /** Семантическая ошибка (формы, AntD colorError); отличается от «мягкого» colorLightRed для избранного и т.п. */
  colorErrorLight: '#e53935',
  colorInfoLight: '#007fd6',

  colorGreen: '#52c41a',
  colorWhite: '#ffffff',
  colorYellow: '#ffb122',
  /** Коралловый акцент (избранное, мягкие деструктивные действия); не смешивать с семантическим colorErrorLight. */
  colorLightRed: '#F95849',

  colorGreenTransparent: 'rgba(82, 196, 26, 18%)',
  colorYellowTransparent: 'rgb(255, 177, 34, 18%)',
  colorLightRedTransparent: 'rgb(249, 88, 73, 18%)',

  colorTextLight: 'rgba(0, 0, 0, 0.88)',
  colorTextSecondaryLight: 'rgba(0, 0, 0, 0.65)',
  colorTextTertiaryLight: 'rgba(0, 0, 0, 0.45)',
  colorTextQuaternaryLight: 'rgba(0, 0, 0, 0.25)',

  textButtonDefaultLight: '#334155',
  textButtonHoverLight: '#0092fa',
  textButtonActiveLight: '#006bb8',
  textButtonCancelDefaultLight: '#e53935',
  textButtonCancelHoverLight: '#c62828',
  textButtonCancelActiveLight: '#b71c1c',

  /** Color / Background / Screen — глобальные фоны страниц и крупных виджетов. */
  colorBackgroundScreenBaseLight: '#ffffff',
  colorBackgroundScreenContainerLight: '#ffffff',
  colorBackgroundScreenLayoutLight: '#f0f6fc',

  /**
   * Color / Background / Components — поверхности модалок, поповеров и т.д. (раньше colorBgElevated).
   * Допускается совпадение с screen/container.
   */
  colorBackgroundComponentsElevatedLight: '#ffffff',

  /** Тинты под выделения, строки таблиц, нейтральные «слои» (пересечения с кнопками допустимы). */
  colorBackgroundComponentsPrimaryDefaultLight: '#bfe4ff',
  colorBackgroundComponentsPrimaryHoverLight: '#8fd0ff',
  colorBackgroundComponentsPrimaryActiveLight: '#5cbbff',
  colorBackgroundComponentsSecondaryDefaultLight: '#dff0ff',
  colorBackgroundComponentsSecondaryHoverLight: '#cfe8ff',
  colorBackgroundComponentsSecondaryActiveLight: '#bedfff',
  colorBackgroundComponentsTertiaryDefaultLight: '#f2f8fd',
  colorBackgroundComponentsTertiaryHoverLight: '#e8f3fb',
  colorBackgroundComponentsTertiaryActiveLight: '#deedfa',

  /** Color / Background / Components / Button */
  colorBackgroundComponentsButtonPrimaryDefaultLight: '#0092fa',
  colorBackgroundComponentsButtonPrimaryHoverLight: '#007fd6',
  colorBackgroundComponentsButtonPrimaryActiveLight: '#006bb8',
  /** Вторичная заливка: от белого к светло-серому (нейтральная, без тёмного slate). */
  colorBackgroundComponentsButtonSecondaryDefaultLight: '#ffffff',
  colorBackgroundComponentsButtonSecondaryHoverLight: '#f3f4f6',
  colorBackgroundComponentsButtonSecondaryActiveLight: '#e8eaef',

  /** Одиночные иконки; для текста можно брать те же значения, но токены разделены осознанно. */
  colorIconPrimaryDefaultLight: '#475569',
  colorIconPrimaryHoverLight: '#0092fa',
  colorIconPrimaryActiveLight: '#006bb8',
  colorIconSecondaryDefaultLight: '#94a3b8',
  colorIconSecondaryHoverLight: '#64748b',
  colorIconSecondaryActiveLight: '#475569',

  colorBorderPrimaryDefaultLight: '#cfd8e6',
  colorBorderPrimaryHoverLight: '#aebccf',
  colorBorderPrimaryActiveLight: '#92a4bd',
  colorBorderSecondaryDefaultLight: '#e8edf5',
  colorBorderSecondaryHoverLight: '#dde3ee',
  colorBorderSecondaryActiveLight: '#d0d8e6',

  /**
   * Тени (CSS: `--smartlib-shadow-*`). Hover: нейтральный подъём + 1px кольцо rgba под colorPrimary (#0092fa ~22%).
   */
  shadowCardDefaultLight: '0 1px 2px rgba(15, 23, 42, 0.05)',
  shadowCardHoverLight:
    '0 4px 14px rgba(15, 23, 42, 0.1), 0 0 0 1px rgba(0, 146, 250, 0.22)',

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
    `--smartlib-color-green: ${L.colorGreen}`,

    `--smartlib-color-yellow-transparent: ${L.colorYellowTransparent}`,
    `--smartlib-color-light-red-transparent: ${L.colorLightRedTransparent}`,
    `--smartlib-color-green-transparent: ${L.colorGreenTransparent}`,

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
    `--smartlib-color-icon-secondary: ${L.colorIconSecondaryDefaultLight}`,
    `--smartlib-color-icon-secondary-hover: ${L.colorIconSecondaryHoverLight}`,
    `--smartlib-color-icon-secondary-active: ${L.colorIconSecondaryActiveLight}`,

    `--smartlib-color-background-screen-base: ${L.colorBackgroundScreenBaseLight}`,
    `--smartlib-color-background-screen-container: ${L.colorBackgroundScreenContainerLight}`,
    `--smartlib-color-background-screen-layout: ${L.colorBackgroundScreenLayoutLight}`,

    `--smartlib-color-background-components-elevated: ${L.colorBackgroundComponentsElevatedLight}`,
    `--smartlib-color-background-components-primary-default: ${L.colorBackgroundComponentsPrimaryDefaultLight}`,
    `--smartlib-color-background-components-primary-hover: ${L.colorBackgroundComponentsPrimaryHoverLight}`,
    `--smartlib-color-background-components-primary-active: ${L.colorBackgroundComponentsPrimaryActiveLight}`,
    `--smartlib-color-background-components-secondary-default: ${L.colorBackgroundComponentsSecondaryDefaultLight}`,
    `--smartlib-color-background-components-secondary-hover: ${L.colorBackgroundComponentsSecondaryHoverLight}`,
    `--smartlib-color-background-components-secondary-active: ${L.colorBackgroundComponentsSecondaryActiveLight}`,
    `--smartlib-color-background-components-tertiary-default: ${L.colorBackgroundComponentsTertiaryDefaultLight}`,
    `--smartlib-color-background-components-tertiary-hover: ${L.colorBackgroundComponentsTertiaryHoverLight}`,
    `--smartlib-color-background-components-tertiary-active: ${L.colorBackgroundComponentsTertiaryActiveLight}`,

    `--smartlib-color-background-components-button-primary-default: ${L.colorBackgroundComponentsButtonPrimaryDefaultLight}`,
    `--smartlib-color-background-components-button-primary-hover: ${L.colorBackgroundComponentsButtonPrimaryHoverLight}`,
    `--smartlib-color-background-components-button-primary-active: ${L.colorBackgroundComponentsButtonPrimaryActiveLight}`,
    `--smartlib-color-background-components-button-secondary-default: ${L.colorBackgroundComponentsButtonSecondaryDefaultLight}`,
    `--smartlib-color-background-components-button-secondary-hover: ${L.colorBackgroundComponentsButtonSecondaryHoverLight}`,
    `--smartlib-color-background-components-button-secondary-active: ${L.colorBackgroundComponentsButtonSecondaryActiveLight}`,

    `--smartlib-color-border-primary-default: ${L.colorBorderPrimaryDefaultLight}`,
    `--smartlib-color-border-primary-hover: ${L.colorBorderPrimaryHoverLight}`,
    `--smartlib-color-border-primary-active: ${L.colorBorderPrimaryActiveLight}`,
    `--smartlib-color-border-secondary-default: ${L.colorBorderSecondaryDefaultLight}`,
    `--smartlib-color-border-secondary-hover: ${L.colorBorderSecondaryHoverLight}`,
    `--smartlib-color-border-secondary-active: ${L.colorBorderSecondaryActiveLight}`,

    `--smartlib-shadow-card-default: ${L.shadowCardDefaultLight}`,
    `--smartlib-shadow-card-hover: ${L.shadowCardHoverLight}`,

    /** Совместимость: короткие алиасы под существующие SCSS. */
    `--smartlib-color-bg: ${L.colorBackgroundScreenBaseLight}`,
    `--smartlib-color-bg-container: ${L.colorBackgroundScreenContainerLight}`,
    `--smartlib-color-bg-layout: ${L.colorBackgroundScreenLayoutLight}`,

    `--smartlib-color-border: ${L.colorBorderPrimaryDefaultLight}`,
    `--smartlib-color-border-secondary: ${L.colorBorderSecondaryDefaultLight}`,

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
