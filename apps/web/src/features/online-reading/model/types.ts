export type IWorkReadingProgress = {
  workId: string;
  currentPage: number;
};

export type IReadingProgressMap = Record<string, IWorkReadingProgress>;
