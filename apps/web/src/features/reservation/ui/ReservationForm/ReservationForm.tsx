'use client';

import { IWorkReservationContext } from '@features/reservation/model';
import { IWork } from '@shared-packages/api';
import { ActionOverlay, ActionOverlayStatus } from '@shared/ui/components';
import { SmartlibForm } from '@shared/ui/components/forms';
import { Button, ConfigProvider, DatePicker, Flex, Form, Select, ThemeConfig, Typography } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { useCallback, useMemo, useState } from 'react';

import styles from './ReservationForm.module.scss';
import { useQuery } from '@tanstack/react-query';
import { getSmartlibApi } from '@global/api';
import { useOptions } from '@shared/hooks';
import { ILibraryBranch } from '@shared-packages/api/domains/libraries';
import { DAY_JS_DATE_FORMATS } from '@shared-packages/utils/date';
import { SmartlibApiError } from '@shared-packages/api/errors';

interface IReservationFormProps {
  workId: IWork['id'];
  workTitle: IWork['title'];
  context?: IWorkReservationContext;
}

interface IReservationFormData {
  libraryBranchId: ILibraryBranch['id'];
  reserveTill: Dayjs;
}

const api = getSmartlibApi();

export function ReservationForm({ workId, workTitle, context = {} }: IReservationFormProps) {
  const [overlayStatus, setOverlayStatus] = useState<ActionOverlayStatus | null>(null);
  const [responseError, setResponseError] = useState<string>('');

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

  const reserveTill = Form.useWatch('reserveTill', form);

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

  const handleFinish = useCallback(
    async (data: IReservationFormData) => {
      const { libraryBranchId, reserveTill } = data;

      setOverlayStatus(ActionOverlayStatus.Loading);

      const reserveTillStr = reserveTill.format(DAY_JS_DATE_FORMATS.ONLY_DATE_YEAR_FIRST_DASHED);

      const api = getSmartlibApi();
      try {
        await api.workReservations.create(
          {
            workId,
            libraryBranchId,
            reservedTill: reserveTillStr,
          },
          { timeout: 60_000 },
        );

        setOverlayStatus(ActionOverlayStatus.Success);
      } catch (err) {
        if (SmartlibApiError.isSmartlibApiError(err)) {
          setResponseError(err.message);
        }
        setOverlayStatus(ActionOverlayStatus.Error);
      }
    },
    [workId],
  );

  const overlayErrorMessage = responseError
    ? `При бронировании возникла ошибка:\n${responseError}`
    : 'При бронировании возникла ошибка.\nПопробуйте ещё раз.';

  const overlayNode = overlayStatus ? (
    <ActionOverlay
      status={overlayStatus}
      successMessage={`Бронирование успешно оформлено.\nЗаберите книгу до ${reserveTill.format('DD.MM.YYYY')}.`}
      errorMessage={overlayErrorMessage}
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
      <SmartlibForm
        form={form}
        overlay={overlayNode}
        onFinish={handleFinish}
        initialValues={initialValues}
        className={styles.form}
      >
        <Typography.Title level={3}>{workTitle}</Typography.Title>
        <Form.Item label="Библиотека" name="libraryBranchId" rules={[{required: true}]}>
          <Select options={libraryOptions} />
        </Form.Item>
        <Form.Item label="Забронировать до" name="reserveTill" className={styles.dateField} rules={[{required: true}]}>
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
