'use client';

import { useMemo, useState } from 'react';
import { Button, Modal } from 'antd';
import styles from './ReserveModalTrigger.module.scss';
import classNames from 'classnames';


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
      <Button className={classNames(styles.reserveButton, className)} type={variant} disabled={disabled} onClick={() => setOpen(true)}>
        {label}
      </Button>
      <Modal
        title={title}
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
        destroyOnClose
      >
        <p className={styles.placeholder}>
          Форма бронирования будет добавлена позже.
        </p>
      </Modal>
    </>
  );
}

