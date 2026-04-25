'use client'
import { Select } from "antd";
import { DefaultOptionType } from "antd/es/select";
import { SelectProps } from "rc-select";
import { memo, useCallback, useMemo } from "react";
import { useSearchContext } from "src/features/search";
import { SearchItemsType } from "src/features/search/enums";

type SearchItemSelectType = SelectProps<SearchItemsType>
type THandleSelect = NonNullable<SearchItemSelectType['onSelect']>

export const SearchItemSelect = memo(function SearchItemSelect() {
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
    />
})