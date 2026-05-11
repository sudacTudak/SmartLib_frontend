import { DefaultOptionType } from 'antd/es/select';

interface IUseOptionsParams<TData extends object> {
  data: TData[];
  valueLookup: keyof TData;
  labelLookup: keyof TData;
}

export function useOptions<TData extends object>({
  data,
  valueLookup,
  labelLookup,
}: IUseOptionsParams<TData>) {
  const uniqueIds: Set<number | string> = new Set([]);

  return data.reduce((acc, item) => {
    const value = item[valueLookup as keyof TData] as string | number;
    const label = item[labelLookup as keyof TData] as string;

    if (uniqueIds.has(value)) return acc;

    acc.push({ label, value });

    return acc;
  }, [] as DefaultOptionType[]);
}
