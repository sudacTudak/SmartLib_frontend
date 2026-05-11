'use client';

import React, { useMemo, useState } from 'react';
import { Button, Modal } from 'antd';
import styles from './ReserveModalTrigger.module.scss';
import classNames from 'classnames';
import { WithAuthGate } from '@global/auth';
import { ReservationForm } from '@features/reservation/ui';
import { IWorkReservationContext } from '@features/reservation/model';

const GatedButton = WithAuthGate(Button);

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

  const title = useMemo(() => {
    if (context?.libraryBranchId) return 'Бронирование в филиале';
    return 'Бронирование';
  }, [context?.libraryBranchId]);

  return (
    <>
      <GatedButton
        className={classNames(styles.reserveButton, className)}
        type={variant}
        disabled={disabled}
        onClick={() => setOpen(true)}
      >
        {label}
      </GatedButton>
      <Modal title={title} open={open} onCancel={() => setOpen(false)} footer={null} destroyOnHidden>
        <div style={{paddingTop: 8}}>
          <ReservationForm workId={workId} workTitle={workTitle} context={context}/>
        </div>
      </Modal>
    </>
  );
}
