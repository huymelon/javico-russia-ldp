import * as React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'tertiary';
  size?: 'sm' | 'md' | 'lg' | 'icon';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    const variants = {
      primary: 'bg-[#003a59] text-white hover:bg-[#003a59]/90 shadow-lg shadow-[#003a59]/20',
      secondary: 'bg-[#506071] text-white hover:bg-[#506071]/90',
      outline: 'border border-[#003a59] text-[#003a59] hover:bg-[#003a59]/5',
      ghost: 'hover:bg-[#f2f4f5] text-[#40484c]',
      tertiary: 'bg-[#00401e] text-white hover:bg-[#00401e]/90 shadow-lg shadow-[#00401e]/20',
    };

    const sizes = {
      sm: 'px-3 py-1.5 text-xs',
      md: 'px-6 py-2.5 text-sm',
      lg: 'px-8 py-4 text-base',
      icon: 'p-2',
    };

    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-md font-bold transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none uppercase tracking-wider',
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';
