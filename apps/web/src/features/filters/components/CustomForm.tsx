'use client';

import { memo, useMemo } from 'react';
import { Button, Flex, Form, Typography } from 'antd';
import { FilterComponentsByType } from '../configsHelpers';
import { TFormFilter } from '../types';

const { useForm } = Form;
const { Title } = Typography;

interface CustomFormLocal<TFormData extends object> {
  title?: string;
  filters: TFormFilter[];
  onFinish: ((formData: TFormData) => void) | ((formData: TFormData) => Promise<void>);
  initialValues?: Partial<TFormData>;
  submitButtonText?: string;
}

function CustomFormLocal<TFormData extends object>({
  title,
  filters,
  initialValues,
  submitButtonText,
  onFinish,
}: CustomFormLocal<TFormData>) {
  const [form] = useForm<TFormData>();

  const fields = useMemo(() => {
    return filters.map((filter) => {
      const { filterType, ...props } = filter;
      const FilterComponent = FilterComponentsByType[filterType] as React.FunctionComponent<
        typeof props
      >;

      return (
        <Form.Item key={props.name}>
          <FilterComponent {...props} />
        </Form.Item>
      );
    });
  }, [filters]);

  return (
    <Flex vertical gap={10}>
      {title && <Title level={2}>{title}</Title>}
      <Form form={form} initialValues={initialValues} onFinish={onFinish}>
        {fields}
      </Form>
      <Flex justify="flex-end">
        <Button type="primary" htmlType="submit">
          {submitButtonText ?? 'OK'}
        </Button>
      </Flex>
    </Flex>
  );
}

export const CustomForm = memo(CustomFormLocal) as typeof CustomFormLocal;
