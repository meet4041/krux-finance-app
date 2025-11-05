import React from 'react';
import { clsx } from 'clsx';

interface CardProps {
    children: React.ReactNode;
    className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className }) => {
    return (
        <div className={clsx('bg-white rounded-lg border border-gray-200 shadow-sm', className)}>
            {children}
        </div>
    );
};

export const CardHeader: React.FC<CardProps> = ({ children, className }) => {
    return (
        <div className={clsx('p-6 border-b border-gray-200', className)}>
            {children}
        </div>
    );
};

export const CardContent: React.FC<CardProps> = ({ children, className }) => {
    return (
        <div className={clsx('p-6', className)}>
            {children}
        </div>
    );
};

export const CardFooter: React.FC<CardProps> = ({ children, className }) => {
    return (
        <div className={clsx('p-6 border-t border-gray-200 bg-gray-50', className)}>
            {children}
        </div>
    );
};