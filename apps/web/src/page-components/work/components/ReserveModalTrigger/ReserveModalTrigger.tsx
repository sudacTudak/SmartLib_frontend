'use client';

import React, { useCallback, useMemo, useState } from 'react';
import { Button, Modal } from 'antd';
import styles from './ReserveModalTrigger.module.scss';
import classNames from 'classnames';
import { useAuthGuard } from '@global/auth';
import { ReservationForm } from '@features/reservation/ui';
import { IWorkReservationContext } from '@features/reservation/model';

type ReserveModalTriggerProps = {
  disabled?: boolean;
  label?: string;
  variant?: 'primary' | 'default';
  workId: string;
  workTitle: string;
  className?: string;
  context?: IWorkReservationContext;
};

export function ReserveModalTrigger({
  disabled,
  label = 'Забронировать',
  variant = 'primary',
  workId,
  workTitle,
  className,
  context,
}: ReserveModalTriggerProps) {
  const [open, setOpen] = useState(false);
  const { modalNode, guardAction } = useAuthGuard();

  const title = useMemo(() => {
    if (context?.libraryBranchId) return 'Бронирование в филиале';
    return 'Бронирование';
  }, [context?.libraryBranchId]);

  const handleButtonClick = useCallback(
    () => guardAction(() => setOpen(true)),
    [guardAction],
  );

  return (
    <>
      {modalNode}
      <Button
        className={classNames(styles.reserveButton, className)}
        type={variant}
        disabled={disabled}
        onClick={handleButtonClick}
      >
        {label}
      </Button>
      <Modal title={title} open={open} onCancel={() => setOpen(false)} footer={null} destroyOnHidden>
        <div style={{ paddingTop: 8 }}>
          <ReservationForm workId={workId} workTitle={workTitle} context={context} />
        </div>
      </Modal>
    </>
  );
}
