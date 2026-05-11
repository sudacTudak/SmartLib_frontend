export interface ICommonFeedbackData {
  rating: number;
  comment?: string;
}

export enum FeedbackFormMode {
  Create = 'create',
  View = 'view',
  Edit = 'edit',
}
