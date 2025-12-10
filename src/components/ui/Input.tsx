'use client';

import { forwardRef, InputHTMLAttributes, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    hint?: string;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    showPasswordToggle?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
    (
        {
            label,
            error,
            hint,
            leftIcon,
            rightIcon,
            showPasswordToggle = false,
            type = 'text',
            className = '',
            id,
            ...props
        },
        ref
    ) => {
        const [showPassword, setShowPassword] = useState(false);
        const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

        const inputType = showPasswordToggle && type === 'password'
            ? (showPassword ? 'text' : 'password')
            : type;

        return (
            <div className="w-full">
                {label && (
                    <label
                        htmlFor={inputId}
                        className="block text-sm font-medium text-gray-700 mb-1.5"
                    >
                        {label}
                    </label>
                )}
                <div className="relative">
                    {leftIcon && (
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                            {leftIcon}
                        </div>
                    )}
                    <input
                        ref={ref}
                        id={inputId}
                        type={inputType}
                        className={`
              w-full px-4 py-3 rounded-xl border bg-white
              transition-all duration-200 ease-out
              placeholder:text-gray-400
              focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500
              disabled:bg-gray-100 disabled:cursor-not-allowed
              ${leftIcon ? 'pl-10' : ''}
              ${rightIcon || showPasswordToggle ? 'pr-10' : ''}
              ${error
                                ? 'border-red-300 focus:ring-red-500/20 focus:border-red-500'
                                : 'border-gray-200 hover:border-gray-300'
                            }
              ${className}
            `}
                        {...props}
                    />
                    {showPasswordToggle && type === 'password' && (
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    )}
                    {rightIcon && !showPasswordToggle && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                            {rightIcon}
                        </div>
                    )}
                </div>
                {error && (
                    <p className="mt-1.5 text-sm text-red-500 flex items-center gap-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {error}
                    </p>
                )}
                {hint && !error && (
                    <p className="mt-1.5 text-sm text-gray-500">{hint}</p>
                )}
            </div>
        );
    }
);

Input.displayName = 'Input';

export default Input;
