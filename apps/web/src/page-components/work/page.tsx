import { IWorkFeedback, IWork } from '@shared-packages/api';
import { ILibraryBranch } from '@shared-packages/api/domains/libraries';

import { WorkDetailPageView } from './WorkDetailPageView';

interface IWorkDetailProps {
  work: IWork;
  libraryEntities: Record<string, ILibraryBranch>;
  feedbacks: IWorkFeedback[];
  libraryIds: ILibraryBranch['id'][];
  availabilityByLibrariesMap: Record<string, number>;
  authorNames: string[];
  genreTitles: string[];
  totalAvailableCount: number;
}

export function WorkDetailPage(props: IWorkDetailProps) {
  return <WorkDetailPageView {...props} />;
}
