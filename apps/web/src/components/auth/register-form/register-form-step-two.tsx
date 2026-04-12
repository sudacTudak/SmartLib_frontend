'use client';

import { FormErrorBanner } from '@shared-packages/components/auth';
import { Gender } from '@shared-packages/enums';
import { Button, Form, Input, Segmented } from 'antd';

import type { RegisterFormStepProps } from './register-form-step-props';

import styles from '@shared-packages/components/auth/auth-forms.module.scss';

export function RegisterFormStepTwo({ submitError, submitting, onBack }: RegisterFormStepProps) {
  return (
    <div className={styles.step}>
      <Form.Item
        label="Ваш пол"
        name="gender"
        preserve
        rules={[{ required: true, message: 'Выберите пол' }]}
      >
        <Segmented
          block
          options={[
            { label: 'Мужской', value: Gender.Male },
            { label: 'Женский', value: Gender.Female },
          ]}
        />
      </Form.Item>

      <Form.Item
        label="Ваше имя"
        name="first_name"
        preserve
        rules={[
          { required: true, message: 'Введите имя' },
          { min: 2, max: 30, message: 'От 2 до 30 символов' },
        ]}
      >
        <Input autoComplete="given-name" placeholder="Имя" size="large" />
      </Form.Item>

      <Form.Item
        label="Ваша фамилия"
        name="last_name"
        preserve
        rules={[
          { required: true, message: 'Введите фамилию' },
          { min: 2, max: 30, message: 'От 2 до 30 символов' },
        ]}
      >
        <Input autoComplete="family-name" placeholder="Фамилия" size="large" />
      </Form.Item>

      <Form.Item label="Отчество (при наличии)" name="patronymic" preserve>
        <Input autoComplete="additional-name" placeholder="Необязательно" size="large" />
      </Form.Item>

      <FormErrorBanner message={submitError} />

      <Form.Item className={styles.actions}>
        <Button htmlType="button" block size="large" className={styles.backButton} onClick={onBack}>
          Назад
        </Button>
        <Button type="primary" htmlType="submit" block size="large" loading={submitting}>
          Зарегистрироваться
        </Button>
      </Form.Item>
    </div>
  );
}
