import { ReactNode } from 'react';

export interface IInfoGridItem {
  id: string | number;
  label: string;
  value: ReactNode | string | number;
  className?: string;
  labelClassName?: string;
  valueClassName?: string;
}
