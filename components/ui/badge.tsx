import React from 'react';
import { clsx } from 'clsx';

interface BadgeProps {
    children: React.ReactNode;
    variant?: 'default' | 'secondary' | 'outline' | 'destructive';
    className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
    children,
    variant = 'default',
    className
}) => {
    const baseStyles = 'inline-flex items-center rounded-full px-3 py-1 text-xs font-medium transition-colors';

    const variants = {
        default: 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white',
        secondary: 'bg-gradient-to-r from-purple-500 to-pink-500 text-white',
        outline: 'border border-white/20 text-white bg-white/10',
        destructive: 'bg-gradient-to-r from-red-500 to-pink-500 text-white'
    };

    return (
        <span className={clsx(baseStyles, variants[variant], className)}>
            {children}
        </span>
    );
};