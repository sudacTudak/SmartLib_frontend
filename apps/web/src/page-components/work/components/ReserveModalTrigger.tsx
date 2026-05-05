'use client';

import React, { useMemo, useState } from 'react';
import { Button, Modal } from 'antd';
import styles from './ReserveModalTrigger.module.scss';
import classNames from 'classnames';
import { WithAuthGate } from 'src/global/auth';

const GatedButton = WithAuthGate(Button);

type ReserveModalTriggerProps = {
  disabled?: boolean;
  label?: string;
  variant?: 'primary' | 'default';
  className?: string;
  /** Для будущей формы: workItemId/workId + libraryBranchId. */
  context?: { workItemId?: string; workId?: string; libraryBranchId?: string };
};

export function ReserveModalTrigger({
  disabled,
  label = 'Забронировать',
  variant = 'primary',
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
        <p className={styles.placeholder}>Форма бронирования будет добавлена позже.</p>
      </Modal>
    </>
  );
}
