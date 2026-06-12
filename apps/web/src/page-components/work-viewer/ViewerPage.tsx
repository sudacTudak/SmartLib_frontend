import { ViewerPageView } from './ViewerPageView';
import { IWork } from '@shared-packages/api';

type ViewerPageProps = {
  work: IWork;
};

export function ViewerPage({ work }: ViewerPageProps) {
  return <ViewerPageView work={work} />;
}
