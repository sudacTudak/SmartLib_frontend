'use client';

import { useAuth } from 'src/global/auth/AuthContext';
import { AuthStatus } from '@global/auth/enums';
import { Modal } from 'antd';
import React, { JSX, useCallback, useState } from 'react';
import { LoginForm } from 'src/features/auth';

type ClickableProps = {
  onClick?: React.MouseEventHandler<HTMLElement>;
};

export function WithAuthGate<P extends ClickableProps>(Component: React.ComponentType<P>): React.FC<P> {
  function WithAuthGateComponent(props: P): JSX.Element {
    const { onClick: userOnClick } = props;
    const { user, status } = useAuth();
    const isAuthed = status === AuthStatus.Ready && Boolean(user);
    const [isOpen, setIsOpen] = useState(false);

    const onClick = useCallback(
      (event: React.MouseEvent<HTMLElement>) => {
        if (isAuthed) {
          userOnClick?.(event);
          return;
        }
        setIsOpen(true);
      },
      [isAuthed, userOnClick],
    );

    return (
      <>
        <Modal open={isOpen} onCancel={() => setIsOpen(false)} footer={null}>
          <LoginForm />
        </Modal>
        <Component {...props} onClick={onClick as P['onClick']} />
      </>
    );
  }

  const innerName = (Component as { displayName?: string; name?: string }).displayName ?? (Component as { name?: string }).name;
  WithAuthGateComponent.displayName = `WithAuthGate(${innerName ?? 'Component'})`;

  return WithAuthGateComponent;
}
