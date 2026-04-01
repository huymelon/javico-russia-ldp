import * as React from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
  children?: React.ReactNode;
  className?: string;
  key?: React.Key;
}

export function Card({ className, hover = true, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'bg-white rounded-2xl border border-[#c3c6d5]/20 shadow-sm overflow-hidden transition-all duration-300',
        hover && 'hover:shadow-xl hover:-translate-y-1',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('p-6', className)} {...props} />;
}

export function CardContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('p-6 pt-0', className)} {...props} />;
}

export function CardFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('p-6 pt-0 border-t border-[#c3c6d5]/10', className)} {...props} />;
}
