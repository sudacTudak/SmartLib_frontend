'use client';

import { Drawer } from 'antd';
import { memo, useCallback, useMemo } from 'react';
import { CustomFilterForm } from 'src/features/filters/ui';
import { CatalogFiltersFieldConfigs } from '@features/filters/configs';
import type { ICatalogFiltersFormState } from '@global/globalSearch';
import { useSearchContext } from '@global/globalSearch';
import { useFiltersOptions } from './hooks';
import { CloseOutlined } from '@ant-design/icons';

interface ICatalogFiltersSidePageProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

export const CatalogFiltersSidePage = memo(function CatalogFiltersSidePage({
  isOpen,
  setIsOpen,
}: ICatalogFiltersSidePageProps) {
  const { applyCatalogFilters, resetCatalogFilters, catalogFilters } = useSearchContext();
  const fieldsOptions = useFiltersOptions();

  const onClose = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  const fields = useMemo(() => {
    return CatalogFiltersFieldConfigs.map((config) => {
      const { name } = config;

      if (!(name in fieldsOptions)) return config;

      const options = fieldsOptions[name as keyof typeof fieldsOptions];
      return { ...config, options };
    });
  }, [fieldsOptions]);

  const onFinish = useCallback(
    (formData: ICatalogFiltersFormState) => {
      applyCatalogFilters(formData);
      onClose();
    },
    [applyCatalogFilters, onClose],
  );

  const onReset = useCallback(() => {
    resetCatalogFilters();
    onClose();
  }, [onClose, resetCatalogFilters]);

  return (
    <Drawer
      open={isOpen}
      onClose={onClose}
      closeIcon={<CloseOutlined style={{ width: 24, height: 24, fontSize: 20 }} />}
      placement="left"
      mask={{ closable: true }}
      destroyOnHidden // Временное решение для сброса незасабмиченных значений при закрытии формы
    >
      <CustomFilterForm<ICatalogFiltersFormState>
        filters={fields}
        initialValues={catalogFilters}
        onFinish={onFinish}
        onReset={onReset}
        submitButtonText="Принять"
        resetButtonText="Сбросить"
      />
    </Drawer>
  );
});
