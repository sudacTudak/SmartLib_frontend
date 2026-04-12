import { Checkbox, CheckboxProps, DatePicker, DatePickerProps, Input, InputProps, Radio, RadioProps, Select, SelectProps } from 'antd';
import {Dayjs} from 'dayjs'

enum FilterType {
    Checkobx = 0,
    Radio = 1,
    Input = 2,
    SingleSelect = 3,
    MultiSelect = 4,
    DateRange = 5,
}

interface IFilterCommonOptions<TValue, TProps extends object> {
    name: string;
    label?: string;
    type: FilterType;
    onChange: (value: TValue) => void;
    props: TProps
}

interface ICheckboxOptions extends IFilterCommonOptions<boolean, CheckboxProps> {
    type: FilterType.Checkobx
}

interface IRadioOptions<TValue extends number | string = number | string> extends IFilterCommonOptions<TValue, RadioProps> {
    type: FilterType.Radio
}

interface IInputOptions extends IFilterCommonOptions<string, InputProps> {
    type: FilterType.Input
}

interface ISingleSelectOptions<TValue extends number | string = number | string> extends IFilterCommonOptions<TValue, SelectProps> {
    type: FilterType.SingleSelect
}

interface IMultiSelectOptions<TValue extends number[] | string[] = number[] | string[]> extends IFilterCommonOptions<TValue, SelectProps> {
    type: FilterType.MultiSelect
}

interface IDateRange extends IFilterCommonOptions<Dayjs, DatePickerProps> {
    type: FilterType.DateRange
}

type TFilterOptions = ICheckboxOptions | IRadioOptions | IInputOptions | ISingleSelectOptions | IMultiSelectOptions | IDateRange

export class Filter<TOptions extends TFilterOptions> {
    componentsMap = {
        [FilterType.Checkobx]: Checkbox,
        [FilterType.Radio]: Radio,
        [FilterType.Input]: Input,
        [FilterType.SingleSelect]: Select,
        [FilterType.MultiSelect]: Select,
        [FilterType.DateRange]: DatePicker
    }
    options: Omit<TOptions, 'props'>
    props: Pick<TOptions, 'props'>
    
    constructor(options: TFilterOptions) {

    }

    asComponent() {
        
    }
}

export class FilterManager {

}