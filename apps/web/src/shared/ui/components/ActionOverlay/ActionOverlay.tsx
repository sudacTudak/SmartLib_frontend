'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { CloseOutlined } from '@ant-design/icons';
import { Progress } from 'antd';
import classNames from 'classnames';
import { Loader } from '../Loader';

import styles from './ActionOverlay.module.scss';

export enum ActionOverlayStatus {
  Loading = 'loading',
  Success = 'success',
  Error = 'error',
}

export interface IActionOverlayProps {
  status: ActionOverlayStatus;
  successMessage?: string;
  errorMessage?: string;
  /** Время до автозакрытия (мс). По умолчанию 10000. */
  autoCloseDuration?: number;
  onClose: () => void;
}

const DEFAULT_AUTO_CLOSE_MS = 10_000;
const TICK_INTERVAL_MS = 1000;

export function ActionOverlay({
  status,
  successMessage = 'Готово!',
  errorMessage = 'Ошибка. Попробуйте ещё раз.',
  autoCloseDuration = DEFAULT_AUTO_CLOSE_MS,
  onClose,
}: IActionOverlayProps) {
  const totalSeconds = Math.ceil(autoCloseDuration / 1000);
  const [secondsLeft, setSecondsLeft] = useState(totalSeconds);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const isResult = status === ActionOverlayStatus.Success || status === ActionOverlayStatus.Error;
  const isSuccess = status === ActionOverlayStatus.Success;

  useEffect(() => {
    if (!isResult) return;

    setSecondsLeft(totalSeconds);

    intervalRef.current = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          onClose();
          return 0;
        }
        return prev - 1;
      });
    }, TICK_INTERVAL_MS);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isResult, totalSeconds, onClose]);

  const handleClose = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    onClose();
  }, [onClose]);

  const percent = Math.round((secondsLeft / totalSeconds) * 100);
  const strokeColor = isSuccess ? 'var(--ant-color-success)' : 'var(--ant-color-error)';

  const overlayClassName = classNames(styles.overlay, {
    [styles.overlaySuccess]: status === ActionOverlayStatus.Success,
    [styles.overlayError]: status === ActionOverlayStatus.Error,
  });

  return (
    <div className={overlayClassName}>
      {isResult && (
        <button type="button" className={styles.closeButton} onClick={handleClose} aria-label="Закрыть">
          <CloseOutlined />
        </button>
      )}

      {status === ActionOverlayStatus.Loading && (
        <div className={styles.content}>
          <Loader size="large" />
        </div>
      )}

      {isResult && (
        <div className={styles.content}>
          <span className={classNames(styles.messageText, isSuccess ? styles.successText : styles.errorText)}>
            {isSuccess ? successMessage : errorMessage}
          </span>

          <Progress
            type="circle"
            percent={percent}
            size={40}
            strokeColor={strokeColor}
            railColor="var(--ant-color-border)"
            format={() => <span className={styles.countdownText}>{secondsLeft}</span>}
          />
        </div>
      )}
    </div>
  );
}
