import React from 'react';
import { clsx } from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'default' | 'secondary' | 'outline' | 'ghost' | 'gradient';
    size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({
    children,
    className,
    variant = 'default',
    size = 'md',
    ...props
}) => {
    const baseStyles = 'inline-flex items-center justify-center rounded-xl font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-50 disabled:pointer-events-none';

    const variants = {
        default: 'bg-cyan-600 text-white hover:bg-cyan-700 shadow-lg shadow-cyan-500/25',
        secondary: 'bg-purple-600 text-white hover:bg-purple-700 shadow-lg shadow-purple-500/25',
        outline: 'border border-white/20 bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm',
        ghost: 'bg-transparent text-white hover:bg-white/10',
        gradient: 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:from-cyan-600 hover:to-blue-600 shadow-lg shadow-cyan-500/25'
    };

    const sizes = {
        sm: 'h-8 px-3 text-sm',
        md: 'h-12 px-6 text-base',
        lg: 'h-14 px-8 text-lg'
    };

    return (
        <button
            className={clsx(
                baseStyles,
                variants[variant],
                sizes[size],
                'hover:scale-105 active:scale-95',
                className
            )}
            {...props}
        >
            {children}
        </button>
    );
};