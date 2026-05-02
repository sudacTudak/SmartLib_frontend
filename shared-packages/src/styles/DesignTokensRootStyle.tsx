import { getSmartlibDesignTokensRootCss } from './design-tokens';

/**
 * Вставляет глобальные `--smartlib-*` из `design-tokens.ts` (SSR-safe, без отдельного CSS-бандла).
 * Ставьте первым дочерним элементом у `<body>` (web) или перед приложением (admin).
 */
export function DesignTokensRootStyle() {
  return <style dangerouslySetInnerHTML={{ __html: getSmartlibDesignTokensRootCss() }} />;
}
