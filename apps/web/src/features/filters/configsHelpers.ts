import { Checkbox, DatePicker, Input, Radio, Select } from 'antd';
import { FilterType } from './enums';

export const FilterComponentsByType = {
  [FilterType.Checkobx]: Checkbox,
  [FilterType.Radio]: Radio,
  [FilterType.Input]: Input,
  [FilterType.SingleSelect]: Select,
  [FilterType.MultiSelect]: Select,
  [FilterType.DateRange]: DatePicker,
} as const;
