'use client'
import React from 'react';

interface ButtonProps {
    onClick?: () => void;
    label: string;
    disabled?: boolean;
    className?: string;
    type?: "button" | "submit" | "reset";
}

const Button: React.FC<ButtonProps> = ({ onClick = () => {}, label, disabled = false, className = "", type }) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            type={type}
            className={`bg-amber-600 border-2 px-4 py-2 border-white rounded-full shadow-lg hover:bg-amber-700 transition duration-300 ease-in-out transform hover:scale-105 ${className}`}
        >
            <span className='text-white drop-shadow-md'>{label}</span>
        </button>
    );
};

export default Button;