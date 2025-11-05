import React from 'react';
import { clsx } from 'clsx';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> { }

export const Input: React.FC<InputProps> = ({ className, ...props }) => {
    return (
        <input
            className={clsx(
                'flex h-12 w-full rounded-xl border bg-white/10 backdrop-blur-sm px-4 py-2 text-sm text-white placeholder:text-white/40 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent disabled:opacity-50',
                'border-white/20 focus:border-cyan-500',
                className
            )}
            {...props}
        />
    );
};