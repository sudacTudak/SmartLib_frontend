'use client';

import { IWorkReservationContext } from '@features/reservation/model';
import { IWork } from '@shared-packages/api';
import { ActionOverlay, ActionOverlayStatus } from '@shared/ui/components';
import { SmartlibForm } from '@shared/ui/components/forms';
import { Button, ConfigProvider, DatePicker, Flex, Form, Input, Select, ThemeConfig, Typography } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { useCallback, useMemo, useState } from 'react';

import styles from './ReservationForm.module.scss';
import { useQuery } from '@tanstack/react-query';
import { getSmartlibApi } from '@global/api';
import { useOptions } from '@shared/hooks';
import { ILibraryBranch } from '@shared-packages/api/domains/libraries';

interface IReservationFormProps {
  workId: IWork['id'];
  workTitle: IWork['title'];
  context?: IWorkReservationContext;
}

interface IReservationFormData {
  libraryBranchId: ILibraryBranch['id'];
  reserveUntil: Dayjs;
}

const api = getSmartlibApi();

export function ReservationForm({ workId, workTitle, context = {} }: IReservationFormProps) {
  const [overlayStatus, setOverlayStatus] = useState<ActionOverlayStatus | null>(null);
  const { data: libraryBranches = [] } = useQuery({
    queryKey: ['reservationForm', 'libraryBranch'],
    queryFn: () => api.libraries.list(),
  });
  const libraryOptions = useOptions({ data: libraryBranches, valueLookup: 'id', labelLookup: 'address' });

  const initialValues = useMemo(
    () =>
      ({
        libraryBranchId: context.libraryBranchId,
      }) as Partial<IReservationFormData>,
    [context],
  );

  const [form] = Form.useForm<IReservationFormData>();

  const reserveUntil = Form.useWatch('reserveUntil', form)

  const { minReservationDate, maxReservationDate } = useMemo(
    () => ({
      minReservationDate: dayjs().add(1, 'day'),
      maxReservationDate: dayjs().add(7, 'day'),
    }),
    [],
  );

  const handleOverlayClose = useCallback(() => {
    setOverlayStatus(null);
  }, []);

  const handleFinish = useCallback(() => {
    console.log(`Бронь книги ${workId}:${workTitle}`);
    setOverlayStatus(ActionOverlayStatus.Loading);

    setTimeout(() => setOverlayStatus(ActionOverlayStatus.Success), 2000);
  }, [workId, workTitle]);

  const overlayNode = overlayStatus ? (
    <ActionOverlay
      status={overlayStatus}
      successMessage={`Бронирование успешно оформлено.\nЗаберите книгу до ${reserveUntil.format('DD.MM.YYYY')}.`}
      errorMessage={"При бронировании возникла ошибка.\nПопробуйте ещё раз."}
      onClose={handleOverlayClose}
    />
  ) : null;

  const themeConfig = useMemo(() => {
    return {
      components: {
        Typography: {
          titleMarginBottom: 8,
          fontSizeHeading3: 14,
        },
      },
    } as ThemeConfig;
  }, []);

  return (
    <ConfigProvider theme={themeConfig}>
      <SmartlibForm form={form} overlay={overlayNode} onFinish={handleFinish} initialValues={initialValues} className={styles.form}>
        <Typography.Title level={3}>{workTitle}</Typography.Title>
        <Form.Item label="Библиотека" name="libraryBranchId">
          <Select disabled={context.libraryBranchId !== undefined} options={libraryOptions} />
        </Form.Item>
        <Form.Item label="Забронировать до" name="reserveUntil" className={styles.dateField}>
          <DatePicker minDate={minReservationDate} maxDate={maxReservationDate} className={styles.date} />
        </Form.Item>
        <Flex justify="flex-end">
          <Button type="primary" htmlType="submit">
            Забронировать
          </Button>
        </Flex>
      </SmartlibForm>
    </ConfigProvider>
  );
}
