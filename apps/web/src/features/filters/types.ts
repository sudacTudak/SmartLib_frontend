import {
  CheckboxProps,
  DatePickerProps,
  InputProps,
  RadioProps,
  SelectProps,
} from 'antd';
import { Dayjs } from 'dayjs';
import { FilterType } from './enums';
import {FormItemProps} from 'antd';



interface IFilterCommonOptions<TValue> {
  label?: string;
  filterType: FilterType;
}

interface ICheckboxOptions extends IFilterCommonOptions<boolean>, CheckboxProps {
  filterType: FilterType.Checkobx;
}

interface IRadioOptions<TValue extends number | string = number | string>
  extends IFilterCommonOptions<TValue>, RadioProps {
  filterType: FilterType.Radio;
}

interface IInputOptions extends IFilterCommonOptions<string>, InputProps {
  filterType: FilterType.Input;
}

interface ISingleSelectOptions<TValue extends number | string = number | string>
  extends IFilterCommonOptions<TValue>, SelectProps {
  filterType: FilterType.SingleSelect;
}

interface IMultiSelectOptions<TValue extends number[] | string[] = number[] | string[]>
  extends IFilterCommonOptions<TValue>, SelectProps {
  filterType: FilterType.MultiSelect;
}

interface IDateRangeOptions extends IFilterCommonOptions<Dayjs>, DatePickerProps {
  filterType: FilterType.DateRange;
}

export type TFilter =
  | ICheckboxOptions
  | IRadioOptions
  | IInputOptions
  | ISingleSelectOptions
  | IMultiSelectOptions
  | IDateRangeOptions;

export type TFormFilter = TFilter & FormItemProps