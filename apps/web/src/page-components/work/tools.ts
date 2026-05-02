import { IWork } from "@shared-packages/api";
import { IInfoGridItem } from "@shared/ui/components/InfoGrid/types";

export function getGridInfoItems(work: IWork) {
  const gridInfoItems = [
    { id: 'Рейтинг', label: 'Рейтинг', value: work.ratingAvg },
    { id: 'Оценок', label: 'Оценок', value: work.ratingCount },
    { id: 'Год', label: 'Год', value: work.createdYear },
  ] as IInfoGridItem[];

  if (work.publisher) {
    gridInfoItems.push({ id: 'Издательство', label: 'Издательство', value: work.publisher });
  }
  return gridInfoItems;
}