'use client';

import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { IWork } from '@shared-packages/api';
import { ICommonFeedbackData } from 'src/features/feedback/model';
import { FeedbackForm } from 'src/features/feedback/ui';
import { FeedbackFormMode } from 'src/features/feedback/model';
import { useAuthModal } from '@global/auth';
import { useAuth } from '@global/auth';
import { AuthStatus } from '@global/auth/enums';
import { getSmartlibApi } from '@global/api';
import { ActionOverlay, ActionOverlayStatus } from '@shared/ui/components';
import { ConfigProvider, ThemeConfig } from 'antd';

interface IWorkFeedbackFormProps {
  workId: IWork['id'];
}

export const WorkFeedbackForm = memo(function WorkFeedbackForm({ workId }: IWorkFeedbackFormProps) {
  const { modalNode, guardAction } = useAuthModal();
  const { user, status } = useAuth();

  const [mode, setMode] = useState(FeedbackFormMode.Create);
  const [initialValues, setInitialValues] = useState<Partial<ICommonFeedbackData> | undefined>();
  const [existingFeedbackId, setExistingFeedbackId] = useState<string | null>(null);
  const [overlayStatus, setOverlayStatus] = useState<ActionOverlayStatus | null>(null);

  useEffect(() => {
    if (status !== AuthStatus.Ready || !user) return;

    const abortController = new AbortController();

    async function fetchExisting() {
      try {
        const feedbacks = await getSmartlibApi().feedback.works.list({ workId }, { signal: abortController.signal });
        if (!feedbacks.length) return;

        const existing = feedbacks[0];
        if (!existing.score || existing.score < 1) return;

        setExistingFeedbackId(existing.id);
        setInitialValues({ rating: existing.score, comment: existing.comment ?? undefined });
        setMode(FeedbackFormMode.View);
      } catch {
        // Отмена или отсутствие отзыва — остаёмся в режиме create
      }
    }

    void fetchExisting();
    return () => {
      abortController.abort();
    };
  }, [workId, user, status]);

  const submitFeedback = useCallback(
    async (data: ICommonFeedbackData) => {
      setOverlayStatus(ActionOverlayStatus.Loading);

      try {
        if (existingFeedbackId) {
          await getSmartlibApi().feedback.works.partialUpdate(existingFeedbackId, {
            score: data.rating,
            comment: data.comment ?? null,
          });
        } else {
          const created = await getSmartlibApi().feedback.works.create({
            workId,
            score: data.rating,
            comment: data.comment ?? null,
          });
          setExistingFeedbackId(created.id);
        }

        setInitialValues({ rating: data.rating, comment: data.comment });
        setMode(FeedbackFormMode.View);
        setOverlayStatus(ActionOverlayStatus.Success);
      } catch {
        setOverlayStatus(ActionOverlayStatus.Error);
      }
    },
    [workId, existingFeedbackId],
  );

  const handleFinish = useCallback(
    (data: ICommonFeedbackData) => {
      guardAction(() => {
        void submitFeedback(data);
      });
    },
    [guardAction, submitFeedback],
  );

  const handleEditClick = useCallback(() => {
    setMode(FeedbackFormMode.Edit);
  }, []);

  const handleOverlayClose = useCallback(() => {
    setOverlayStatus(null);
  }, []);

  const overlayNode = overlayStatus ? (
    <ActionOverlay
      status={overlayStatus}
      successMessage="Отзыв успешно отправлен!"
      errorMessage="Ошибка отправки. Попробуйте ещё раз."
      onClose={handleOverlayClose}
    />
  ) : null;

  return (
    <>
      {modalNode}
      <FeedbackForm
        onFinish={handleFinish}
        overlay={overlayNode}
        mode={mode}
        initialValues={initialValues}
        onEditClick={handleEditClick}
      />
    </>
  );
});
