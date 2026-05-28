export { resolveOnlinePdfUrl } from './lib/resolveOnlinePdfUrl';
export { getOrCreateInitialPage, saveReadingPage, READING_PROGRESS_STORAGE_KEY } from './model/readingProgressStorage';
export type { IReadingProgressMap, IWorkReadingProgress } from './model/types';
// UI с react-pdf импортируйте напрямую из ui/WorkOnlineReader или ui/PdfViewer,
// чтобы pdfjs-dist не попадал в чанк страницы до открытия ридера.
