'use client';

import { memo, useMemo } from 'react';
import { Button, ConfigProvider, Flex, Form, ThemeConfig, Typography } from 'antd';
import { FilterComponentsByType } from '../configsHelpers';
import { FilterType } from '../enums';
import { TFormFilter } from '../types';

import styles from './CustomForm.module.scss';

const { useForm } = Form;
const { Title } = Typography;

interface CustomFormLocal<TFormData extends object> {
  title?: string;
  filters: TFormFilter[];
  onFinish: ((formData: TFormData) => void) | ((formData: TFormData) => Promise<void>);
  onReset?: () => void;
  initialValues?: Partial<TFormData>;
  submitButtonText?: string;
  resetButtonText?: string;
}

function CustomFormLocal<TFormData extends object>({
  title,
  filters,
  initialValues,
  submitButtonText,
  resetButtonText,
  onFinish,
  onReset,
}: CustomFormLocal<TFormData>) {
  const [form] = useForm<TFormData>();

  const fields = useMemo(() => {
    return filters.map((filter) => {
      const { filterType, name, label, ...componentProps } = filter;

      const FilterComponent = FilterComponentsByType[filterType] as React.FunctionComponent<object>;

      const selectMode =
        filterType === FilterType.MultiSelect ? { mode: 'multiple' as const } : {};

      return (
        <Form.Item
          key={String(name)}
          name={name}
          label={label}
          {...(filterType === FilterType.Checkobx ? { valuePropName: 'checked' as const } : {})}
        >
          <FilterComponent {...componentProps} {...selectMode} />
        </Form.Item>
      );
    });
  }, [filters]);

  const themeConfig = useMemo(
    () =>
      ({
        components: {
          Form: {
            itemMarginBottom: 12,
            verticalLabelPadding: 4,
          },
        },
      }) as ThemeConfig,
    [],
  );

  const shouldDisplayReset = resetButtonText && onReset;

  return (
    <ConfigProvider theme={themeConfig}>
      <Flex vertical gap={10}>
        {title && <Title level={2}>{title}</Title>}
        <Form className={styles.form} form={form} initialValues={initialValues} onFinish={onFinish} layout="vertical">
          {fields}
        </Form>
        <Flex justify="flex-end" align="center" gap={8}>
          {shouldDisplayReset && (
            <Button
              type="default"
              onClick={() => {
                if (onReset) {
                  onReset();
                } else {
                  form.resetFields();
                }
              }}
            >
              {resetButtonText}
            </Button>
          )}
          <Button type="primary" onClick={() => form.submit()}>
            {submitButtonText ?? 'OK'}
          </Button>
        </Flex>
      </Flex>
    </ConfigProvider>
  );
}

export const CustomForm = memo(CustomFormLocal) as typeof CustomFormLocal;
