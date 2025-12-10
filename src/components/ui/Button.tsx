'use client';

import { forwardRef } from 'react';

interface ButtonProps {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
    size?: 'sm' | 'md' | 'lg' | 'xl';
    isLoading?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    fullWidth?: boolean;
    children?: React.ReactNode;
    className?: string;
    disabled?: boolean;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    type?: 'button' | 'submit' | 'reset';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            children,
            variant = 'primary',
            size = 'md',
            isLoading = false,
            leftIcon,
            rightIcon,
            fullWidth = false,
            className = '',
            disabled,
            type = 'button',
            onClick,
            ...props
        },
        ref
    ) => {
        const baseStyles = `
      inline-flex items-center justify-center gap-2 font-semibold
      rounded-xl transition-all duration-200 ease-out
      focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2
      disabled:opacity-50 disabled:cursor-not-allowed
      hover:scale-[1.02] active:scale-[0.98]
    `;

        const variants = {
            primary: `
        bg-gradient-to-r from-primary-500 to-primary-600 text-white
        hover:from-primary-600 hover:to-primary-700
        shadow-md hover:shadow-lg hover:shadow-primary-500/25
      `,
            secondary: `
        bg-secondary-500 text-white
        hover:bg-secondary-600
        shadow-md hover:shadow-lg hover:shadow-secondary-500/25
      `,
            outline: `
        border-2 border-primary-500 text-primary-600
        bg-transparent hover:bg-primary-50
      `,
            ghost: `
        text-gray-700 bg-transparent
        hover:bg-gray-100
      `,
            danger: `
        bg-red-500 text-white
        hover:bg-red-600
        shadow-md hover:shadow-lg hover:shadow-red-500/25
      `,
        };

        const sizes = {
            sm: 'px-4 py-2 text-sm',
            md: 'px-6 py-2.5 text-base',
            lg: 'px-8 py-3 text-lg',
            xl: 'px-10 py-4 text-xl',
        };

        return (
            <button
                ref={ref}
                type={type}
                onClick={onClick}
                className={`
          ${baseStyles}
          ${variants[variant]}
          ${sizes[size]}
          ${fullWidth ? 'w-full' : ''}
          ${className}
        `}
                disabled={disabled || isLoading}
                {...props}
            >
                {isLoading ? (
                    <>
                        <svg
                            className="animate-spin h-5 w-5"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            />
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                        </svg>
                        <span>Loading...</span>
                    </>
                ) : (
                    <>
                        {leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
                        {children}
                        {rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
                    </>
                )}
            </button>
        );
    }
);

Button.displayName = 'Button';

export default Button;
