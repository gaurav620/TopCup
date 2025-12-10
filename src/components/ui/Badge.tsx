interface BadgeProps {
    children: React.ReactNode;
    variant?: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral';
    size?: 'sm' | 'md';
    className?: string;
}

export default function Badge({
    children,
    variant = 'primary',
    size = 'sm',
    className = '',
}: BadgeProps) {
    const variants = {
        primary: 'bg-primary-100 text-primary-700',
        success: 'bg-green-100 text-green-700',
        warning: 'bg-amber-100 text-amber-700',
        danger: 'bg-red-100 text-red-700',
        info: 'bg-blue-100 text-blue-700',
        neutral: 'bg-gray-100 text-gray-700',
    };

    const sizes = {
        sm: 'px-2 py-0.5 text-xs',
        md: 'px-3 py-1 text-sm',
    };

    return (
        <span
            className={`
        inline-flex items-center justify-center font-medium rounded-full
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
        >
            {children}
        </span>
    );
}
