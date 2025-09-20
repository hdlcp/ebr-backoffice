// src/components/ui/Button.tsx
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled,
  children,
  className = '',
  ...props
}) => {
  const baseStyles = `
    font-semibold transition-all duration-200 
    focus:ring-2 focus:ring-offset-2 
    disabled:opacity-50 disabled:cursor-not-allowed
    flex items-center justify-center
  `;

  const variantStyles = {
    primary: 'bg-[#007A3F] text-white hover:opacity-90 focus:ring-green-300',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-300',
    danger: 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-300'
  };

  const sizeStyles = {
    sm: 'px-3 py-2 text-sm rounded-lg',
    md: 'w-[174px] h-[49px] rounded-[20px]',
    lg: 'px-8 py-4 text-lg rounded-xl'
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      style={{ fontFamily: 'Montserrat, sans-serif' }}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
          Chargement...
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;