// src/components/ui/Input.tsx
import React, { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: 'default' | 'error';
  fullWidth?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ variant = 'default', fullWidth = true, className = '', ...props }, ref) => {
    const baseStyles = `
      h-[44px] px-4 rounded-[15px] border-none outline-none 
      text-gray-800 placeholder-gray-500 transition-all duration-200 
      focus:ring-2 focus:ring-green-500
    `;
    
    const variantStyles = {
      default: 'bg-white',
      error: 'bg-white ring-2 ring-red-500'
    };

    const widthStyles = fullWidth ? 'w-full max-w-[367px]' : '';

    return (
      <input
        ref={ref}
        className={`${baseStyles} ${variantStyles[variant]} ${widthStyles} ${className}`}
        style={{ fontFamily: 'Montserrat, sans-serif' }}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';

export default Input;