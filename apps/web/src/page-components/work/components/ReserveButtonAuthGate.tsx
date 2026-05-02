'use client';

import { ReserveModalTrigger } from './ReserveModalTrigger';
import { useAuth } from '@global/auth/auth-context';
import { AuthStatus } from '@global/auth/enums';

type ReserveButtonAuthGateProps = {
  disabled?: boolean;
  variant?: 'primary' | 'default';
  className?: string;
  context?: { workId?: string; libraryBranchId?: string };
};

export function ReserveButtonAuthGate({ disabled, variant, className, context }: ReserveButtonAuthGateProps) {
  const { user, status } = useAuth();
  const isAuthed = status === AuthStatus.Ready && Boolean(user);

  // if (!isAuthed) return null;

  return <ReserveModalTrigger disabled={disabled} variant={variant} className={className} context={context} />;
}

