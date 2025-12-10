'use client';

import { HTMLAttributes, forwardRef } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface CardProps extends Omit<HTMLMotionProps<'div'>, 'ref'> {
    variant?: 'default' | 'glass' | 'elevated' | 'bordered';
    padding?: 'none' | 'sm' | 'md' | 'lg';
    hover?: boolean;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
    (
        {
            children,
            variant = 'default',
            padding = 'md',
            hover = false,
            className = '',
            ...props
        },
        ref
    ) => {
        const variants = {
            default: 'bg-white shadow-sm',
            glass: 'bg-white/80 backdrop-blur-md border border-white/50',
            elevated: 'bg-white shadow-lg',
            bordered: 'bg-white border border-gray-200',
        };

        const paddings = {
            none: '',
            sm: 'p-4',
            md: 'p-6',
            lg: 'p-8',
        };

        return (
            <motion.div
                ref={ref}
                whileHover={hover ? { y: -4, boxShadow: '0 12px 40px rgba(0,0,0,0.12)' } : undefined}
                className={`
          rounded-2xl overflow-hidden transition-all duration-300
          ${variants[variant]}
          ${paddings[padding]}
          ${className}
        `}
                {...props}
            >
                {children}
            </motion.div>
        );
    }
);

Card.displayName = 'Card';

export default Card;
