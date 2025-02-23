import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

export function Field({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return <div className={cn('grid gap-2', className)}>{children}</div>;
}

export function FieldGroup({ children }: { children: ReactNode }) {
  return <div className="grid gap-4">{children}</div>;
}
