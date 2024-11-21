import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className,
  ...props
}: ButtonProps) {
  const baseClasses =
    'font-bold rounded transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2';

  const variantClasses =
    variant === 'primary'
      ? 'bg-black text-white hover:bg-gray-800 active:bg-gray-900 focus:ring-gray-500'
      : 'bg-white text-black border border-black hover:bg-gray-100 active:bg-gray-200 focus:ring-gray-500';

  const sizeClasses = {
    sm: 'px-3 py-1 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  }[size];

  const activeClass = 'active:scale-95';

  const combinedClasses =
    `${baseClasses} ${variantClasses} ${sizeClasses} ${activeClass} ${className || ''}`.trim();

  return (
    <button className={combinedClasses} {...props}>
      {children}
    </button>
  );
}
