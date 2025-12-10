'use client';

import { Fragment, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: ReactNode;
    size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
    showCloseButton?: boolean;
}

export default function Modal({
    isOpen,
    onClose,
    title,
    children,
    size = 'md',
    showCloseButton = true,
}: ModalProps) {
    const sizes = {
        sm: 'max-w-sm',
        md: 'max-w-md',
        lg: 'max-w-lg',
        xl: 'max-w-xl',
        full: 'max-w-4xl',
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 overflow-y-auto">
                    <div className="min-h-screen px-4 text-center">
                        {/* Overlay */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
                            onClick={onClose}
                        />

                        {/* Center trick */}
                        <span className="inline-block h-screen align-middle" aria-hidden="true">
                            &#8203;
                        </span>

                        {/* Modal */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ duration: 0.2, ease: 'easeOut' }}
                            className={`
                inline-block w-full ${sizes[size]} my-8 text-left align-middle
                bg-white rounded-2xl shadow-2xl overflow-hidden relative
              `}
                        >
                            {/* Header */}
                            {(title || showCloseButton) && (
                                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                                    {title && (
                                        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
                                    )}
                                    {showCloseButton && (
                                        <button
                                            onClick={onClose}
                                            className="p-2 rounded-full hover:bg-gray-100 transition-colors ml-auto"
                                        >
                                            <X className="w-5 h-5 text-gray-500" />
                                        </button>
                                    )}
                                </div>
                            )}

                            {/* Content */}
                            <div className="px-6 py-4">{children}</div>
                        </motion.div>
                    </div>
                </div>
            )}
        </AnimatePresence>
    );
}
