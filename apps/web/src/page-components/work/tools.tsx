import { StarFilled } from '@ant-design/icons';
import { IWork } from '@shared-packages/api';
import { IInfoGridItem } from '@shared/ui/components';
import { themeVars } from '@shared-packages/ui';

export function getGridInfoItems(work: IWork) {
  const gridInfoItems = [
    {
      id: 'rating',
      label: 'Рейтинг',
      value: (
        <>
          <span>{work.ratingAvg}</span>
          <StarFilled style={{ fontSize: 16, color: themeVars.color.common.yellow }} />
        </>
      ),
    },
    { id: 'feedback_count', label: 'Оценок', value: work.ratingCount },
    { id: 'volume', label: 'Страниц', value: work.volume },
    { id: 'year', label: 'Год', value: work.createdYear },
  ] as IInfoGridItem[];

  if (work.publisher) {
    gridInfoItems.push({ id: 'publisher', label: 'Издательство', value: work.publisher });
  }
  return gridInfoItems;
}
