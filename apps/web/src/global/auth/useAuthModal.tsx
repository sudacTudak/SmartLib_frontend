'use client';

import { Modal } from 'antd';
import { useCallback, useState, type ReactNode } from 'react';
import { LoginForm } from 'src/features/auth';
import { useAuth } from './AuthContext';
import { AuthStatus } from './enums';

interface UseAuthModalReturn {
  modalNode: ReactNode;
  guardAction: (action: () => void) => void;
}

/**
 * Хук, возвращающий модальное окно логина и функцию-«guard»:
 * если пользователь не авторизован — открывает модалку, иначе — вызывает переданный action.
 */
export function useAuthGuard(): UseAuthModalReturn {
  const { user, status } = useAuth();
  const [open, setOpen] = useState(false);

  const isAuthed = status === AuthStatus.Ready && Boolean(user);

  const guardAction = useCallback(
    (action: () => void) => {
      if (isAuthed) {
        action();
      } else {
        setOpen(true);
      }
    },
    [isAuthed],
  );

  const modalNode = (
    <Modal open={open} onCancel={() => setOpen(false)} footer={null} destroyOnHidden>
      <LoginForm />
    </Modal>
  );

  return { modalNode, guardAction };
}
