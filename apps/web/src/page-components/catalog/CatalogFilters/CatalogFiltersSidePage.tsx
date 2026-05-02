'use client';

import { CloseIcon } from '@shared-packages/ui/icons';
import { Drawer } from 'antd';
import { memo, useCallback, useMemo } from 'react';
import { CustomForm } from 'src/features/filters/ui';
import { CatalogFilterName, CatalogFiltersFieldConfigs } from '@features/filters/configs';
import { useFiltersOptions } from './hooks';

interface ICatalogFiltersSidePageProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

interface IFiltersFormData {
  [CatalogFilterName.Genre]: number[];
  [CatalogFilterName.LibraryBranch]: number[];
  [CatalogFilterName.Author]: string[];
  [CatalogFilterName.HasOnlineVersion]: boolean;
  [CatalogFilterName.OnlineOnly]: boolean;
  [CatalogFilterName.InStock]: boolean;
}

export const CatalogFiltersSidePage = memo(function CatalogFiltersSidePage({
  isOpen,
  setIsOpen,
}: ICatalogFiltersSidePageProps) {
  const onClose = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);
  const fieldsOptions = useFiltersOptions();

  const fields = useMemo(() => {
    return CatalogFiltersFieldConfigs.map((config) => {
      const { name } = config;

      if (!(name in fieldsOptions)) return config;

      const options = fieldsOptions[name as keyof typeof fieldsOptions];
      return { ...config, options };
    });
  }, [fieldsOptions]);

  const onFinish = useCallback((formData: IFiltersFormData) => {
    console.log('formData: ', formData);
  }, []);

  return (
    <Drawer
      open={isOpen}
      onClose={onClose}
      closeIcon={<CloseIcon width={32} height={32} />}
      placement="left"
      // maskClosable
    >
      <CustomForm<IFiltersFormData> filters={fields} onFinish={onFinish} />
    </Drawer>
  );
});
