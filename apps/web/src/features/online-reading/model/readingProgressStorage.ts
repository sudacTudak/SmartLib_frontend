import type { IReadingProgressMap, IWorkReadingProgress } from './types';

export const READING_PROGRESS_STORAGE_KEY = 'smartlib.workReadingProgress';

function readMap(): IReadingProgressMap {
  if (typeof window === 'undefined') {
    return {};
  }

  try {
    const raw = window.localStorage.getItem(READING_PROGRESS_STORAGE_KEY);
    if (!raw) {
      return {};
    }

    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') {
      return {};
    }

    return parsed as IReadingProgressMap;
  } catch {
    return {};
  }
}

function writeMap(map: IReadingProgressMap): void {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    window.localStorage.setItem(READING_PROGRESS_STORAGE_KEY, JSON.stringify(map));
  } catch {
    // quota / private mode
  }
}

/** Возвращает сохранённую страницу или создаёт запись с 1-й страницей при первом открытии. */
export function getOrCreateInitialPage(workId: string): number {
  const map = readMap();
  const existing = map[workId];

  if (existing) {
    return Math.max(1, existing.currentPage);
  }

  const entry: IWorkReadingProgress = { workId, currentPage: 1 };
  map[workId] = entry;
  writeMap(map);
  return 1;
}

export function saveReadingPage(workId: string, currentPage: number): void {
  const map = readMap();
  map[workId] = { workId, currentPage: Math.max(1, currentPage) };
  writeMap(map);
}
