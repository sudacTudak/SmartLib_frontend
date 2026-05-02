/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    /* `postcss-modules-values` в Next — из css-loader; здесь не добавляем — иначе предупреждение дубликата. */
    autoprefixer: {},
  },
};

export default config;
