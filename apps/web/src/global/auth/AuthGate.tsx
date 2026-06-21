'use client';

import { useAuthContext } from 'src/global/auth/AuthContext';
import { AuthStatus } from '@global/auth/enums';
import { Modal } from 'antd';
import React, { JSX, useCallback, useState } from 'react';
import { LoginForm } from 'src/features/auth';
import { useAuthGuard } from '@global/auth/useAuthGuard';
import { useRouter } from 'next/navigation';

type ClickableProps = {
  onClick?: React.MouseEventHandler<HTMLElement>;
};

export function WithAuthGate<P extends ClickableProps>(Component: React.ComponentType<P>): React.FC<P> {
  function WithAuthGateComponent(props: P): JSX.Element {
    const { user, status } = useAuthContext();
    const router = useRouter();

    const isAuthed = status === AuthStatus.Ready && Boolean(user);

    return (
      <>
        <Component {...props}/>
      </>
    );
  }

  const innerName =
    (Component as { displayName?: string; name?: string }).displayName ?? (Component as { name?: string }).name;
  WithAuthGateComponent.displayName = `WithAuthGate(${innerName ?? 'Component'})`;

  return WithAuthGateComponent;
}
