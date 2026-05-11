'use client';

import { memo, useEffect, type ReactNode } from 'react';
import { Button, Flex, Form, Rate } from 'antd';

import styles from './FeedbackForm.module.scss';
import { SmartlibForm } from '@shared/ui/components/forms';
import { CustomTextArea } from '@shared/ui/components/inputs';
import { FeedbackFormMode, ICommonFeedbackData } from '../../model';

type TFeedbackFormData = ICommonFeedbackData;

export interface IFeedbackFormProps {
  onFinish: (data: ICommonFeedbackData) => void;
  disabled?: boolean;
  className?: string;
  overlay?: ReactNode;
  mode?: FeedbackFormMode;
  initialValues?: Partial<ICommonFeedbackData>;
  onEditClick?: () => void;
}

const { useForm } = Form;

const RATING_RULES = [
  { required: true, message: 'Пожалуйста, поставьте оценку' },
  {
    type: 'number' as const,
    min: 1,
    message: 'Рейтинг должен быть от 1 до 5',
  },
];

export const FeedbackForm = memo(function FeedbackForm({
  onFinish,
  disabled,
  className,
  overlay,
  mode = FeedbackFormMode.Create,
  initialValues,
  onEditClick,
}: IFeedbackFormProps) {
  const [form] = useForm<TFeedbackFormData>();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues as TFeedbackFormData);
    }
  }, [form, initialValues]);

  const isFieldsDisabled = mode === FeedbackFormMode.View || disabled;

  return (
    <SmartlibForm
      form={form}
      onFinish={onFinish}
      disabled={isFieldsDisabled}
      className={className}
      layout="vertical"
      initialValues={initialValues}
      overlay={overlay}
    >
      <Flex vertical gap={10}>
        <Form.Item label="Рейтинг" name="rating" rules={RATING_RULES}>
          <Rate />
        </Form.Item>
        <Form.Item label="Комментарий (необязательно)" name="comment">
          <CustomTextArea />
        </Form.Item>
        <Flex justify="flex-end">
          {mode === FeedbackFormMode.View ? (
            <Button
              type="default"
              onClick={onEditClick}
              disabled={false}
              className={styles.submitButton}
            >
              Редактировать
            </Button>
          ) : (
            <Button
              type="primary"
              htmlType="submit"
              disabled={disabled}
              className={styles.submitButton}
            >
              Отправить
            </Button>
          )}
        </Flex>
      </Flex>
    </SmartlibForm>
  );
});
