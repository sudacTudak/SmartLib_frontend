'use client'
import { Select } from "antd";
import { DefaultOptionType } from "antd/es/select";
import { memo, useCallback, useMemo } from "react";
import { useSearchContext } from "src/features/search";
import { SearchItemsType } from "src/features/search/enums";
import { SelectProps } from "antd/es/select";

type SearchItemSelectType = SelectProps<SearchItemsType>
type THandleSelect = NonNullable<SearchItemSelectType['onSelect']>

interface ISearchItemSelectProps {
    className?: string;
}

export const SearchItemSelect = memo(function SearchItemSelect({className}: ISearchItemSelectProps) {
    const {itemsType, setItemsType} = useSearchContext()

    const options = useMemo(() => [
        {
            label: 'Книги',
            value: SearchItemsType.Books
        },
        {
            label: 'Библиотеки',
            value: SearchItemsType.Libraries
        }
    ] as DefaultOptionType[], [])

    const handleSelect = useCallback<THandleSelect>((newValue) => {
        setItemsType(newValue);
    }, [setItemsType])

    return <Select
        value={itemsType}
        defaultValue={SearchItemsType.Books}
        options={options}
        onSelect={handleSelect}
        className={className}
    />
})