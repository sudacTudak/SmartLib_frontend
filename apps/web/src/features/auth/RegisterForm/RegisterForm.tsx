'use client';

import { defaultResolveSubmitError } from '@shared-packages/components/auth';
import { Gender } from '@shared-packages/enums';
import { Form, Typography } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { ComponentType } from 'react';
import { useCallback, useMemo, useState } from 'react';

import { getAuthSession } from '@global/api';

import { RegisterFormStepOne } from './FormStepOne';
import { RegisterFormStepTwo } from './FormStepTwo';
import type { RegisterFormStepProps } from './types';

import styles from '@shared-packages/components/auth/auth-forms.module.scss';

export type RegisterFormValues = {
  email: string;
  password: string;
  confirm: string;
  gender: Gender;
  firstName: string;
  lastName: string;
  patronymic?: string;
};

type RegisterStep = 1 | 2;

type RegisterStepRegistry = Record<RegisterStep, ComponentType<RegisterFormStepProps>>;

export function RegisterForm() {
  const router = useRouter();
  const [form] = Form.useForm<RegisterFormValues>();
  const [step, setStep] = useState<RegisterStep>(1);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const clearSubmitError = () => setSubmitError(null);

  const goNext = useCallback(async () => {
    await form.validateFields(['email', 'password', 'confirm']);
    setSubmitError(null);
    setStep(2);
  }, [form]);

  const onBack = useCallback(() => {
    setSubmitError(null);
    setStep(1);
  }, []);

  const onFinish = async (values: RegisterFormValues) => {
    setSubmitting(true);
    setSubmitError(null);
    try {
      await getAuthSession().register({
        email: values.email,
        password: values.password,
        firstName: values.firstName.trim(),
        lastName: values.lastName.trim(),
        patronymic: values.patronymic?.trim() || undefined,
        gender: values.gender,
      });
      router.push('/login');
    } catch (e) {
      setSubmitError(defaultResolveSubmitError(e));
    } finally {
      setSubmitting(false);
    }
  };

  const stepComponents = useMemo<RegisterStepRegistry>(
    () => ({
      1: RegisterFormStepOne,
      2: RegisterFormStepTwo,
    }),
    [],
  );

  const StepComponent = stepComponents[step];

  const stepProps: RegisterFormStepProps = {
    submitError,
    onGoNext: goNext,
    submitting,
    onBack,
  };

  return (
    <div className={styles.root}>
      <div className={styles.headerRow}>
        <div className={styles.headerLeft}>
          <Link href="/" className={styles.homeLink}>
            На главную
          </Link>
        </div>
        <Typography.Title level={3} className={styles.headerTitle}>
          Регистрация
        </Typography.Title>
        <div className={styles.headerRight}>{step}/2</div>
      </div>

      <div onFocusCapture={clearSubmitError}>
        <Form<RegisterFormValues>
          form={form}
          layout="vertical"
          requiredMark={false}
          validateTrigger="onBlur"
          initialValues={{ gender: Gender.Male }}
          onFinish={onFinish}
        >
          <StepComponent {...stepProps} />
        </Form>
      </div>

      <p className={styles.footer}>
        Уже есть аккаунт? <Link href="/login">Войти</Link>
      </p>
    </div>
  );
}
