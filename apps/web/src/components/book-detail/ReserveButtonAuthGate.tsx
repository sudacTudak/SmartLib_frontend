'use client';

import { ReserveModalTrigger } from './ReserveModalTrigger';
import { useAuth } from 'src/lib/auth/auth-context';
import { AuthStatus } from 'src/lib/auth/enums';

type ReserveButtonAuthGateProps = {
  disabled?: boolean;
  variant?: 'primary' | 'default';
  className?: string;
  context?: { workItemId?: string; workId?: string; libraryBranchId?: string };
};

export function ReserveButtonAuthGate({ disabled, variant, className, context }: ReserveButtonAuthGateProps) {
  const { user, status } = useAuth();
  const isAuthed = status === AuthStatus.Ready && Boolean(user);

  if (!isAuthed) return null;

  return <ReserveModalTrigger disabled={disabled} variant={variant} className={className} context={context} />;
}

