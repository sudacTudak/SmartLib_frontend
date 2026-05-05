'use client';

import { Drawer } from 'antd';
import { memo, useCallback, useMemo } from 'react';
import { CustomForm } from 'src/features/filters/ui';
import { CatalogFilterName, CatalogFiltersFieldConfigs } from '@features/filters/configs';
import { useFiltersOptions } from './hooks';
import { CloseOutlined } from '@ant-design/icons';

interface ICatalogFiltersSidePageProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

interface IFiltersFormData {
  [CatalogFilterName.Genre]: number[];
  [CatalogFilterName.LibraryBranch]: number[];
  [CatalogFilterName.Author]: string[];
  [CatalogFilterName.HasOnlineVersion]: boolean;
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

  const onFinish = useCallback(
    (formData: IFiltersFormData) => {
      console.log('formData: ', formData);
      onClose();
    },
    [onClose],
  );

  const onReset = useCallback(() => {
    console.log('reset');
  }, [])

  return (
    <Drawer
      open={isOpen}
      onClose={onClose}
      closeIcon={<CloseOutlined style={{ width: 24, height: 24, fontSize: 20 }} />}
      placement="left"
      mask={{ closable: true }}
      destroyOnHidden // Временное решение для сброса незасабмиченных значений при закрытии формы
    >
      <CustomForm<IFiltersFormData> filters={fields} onFinish={onFinish} onReset={onReset} submitButtonText="Принять" resetButtonText='Сбросить' />
    </Drawer>
  );
});
