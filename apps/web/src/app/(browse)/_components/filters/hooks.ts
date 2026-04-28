import { DefaultOptionType } from 'antd/es/select';
import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getSmartlibApi } from 'src/lib/api';
import { CatalogFilterName } from 'src/features/filters/configs';

const api = getSmartlibApi();

function useGenreOptions() {
  const { data } = useQuery({
    queryKey: ['catalogFilters', 'genres'],
    queryFn: () => api.works.genre.list(),
  });
  return useMemo(() => {
    if (!data) return [];
    return data.map(({ title, id }) => ({ label: title, value: id }) as DefaultOptionType);
  }, [data]) as DefaultOptionType[];
}

function useLibraryBranchesOptions() {
  const { data } = useQuery({
    queryKey: ['catalogFilters', 'libraryBranches'],
    queryFn: () => api.libraries.list(),
  });
  return useMemo(() => {
    if (!data) return [];
    return data.map(({ id, address }) => ({ label: address, value: id }) as DefaultOptionType);
  }, [data]) as DefaultOptionType[];
}

function useAuthorsOptions() {
  const { data } = useQuery({
    queryKey: ['catalogFilters', 'authors'],
    queryFn: () => api.authors.list(),
  });

  return useMemo(() => {
    if (!data) return [];

    return data.map(({ id, name }) => ({ label: name, value: id }) as DefaultOptionType);
  }, [data]) as DefaultOptionType[];
}

export function useFiltersOptions() {
  const genreOptions = useGenreOptions();
  const librariesOptions = useLibraryBranchesOptions();
  const authorsOptions = useAuthorsOptions();

  return useMemo(
    () => ({
      [CatalogFilterName.Genre]: genreOptions,
      [CatalogFilterName.LibraryBranch]: librariesOptions,
      [CatalogFilterName.Author]: authorsOptions,
    }),
    [genreOptions, librariesOptions, authorsOptions],
  );
}
