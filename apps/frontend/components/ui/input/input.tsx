import React from 'react';

interface InputProps {
  type?: 'text' | 'email' | 'password';
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  label?: string;
  required?: boolean;
  className?: string;
}
export default function Input({
  type = 'text',
  placeholder,
  value,
  onChange,
  name,
  label,
  required = false,
  className = '',
}: InputProps) {
  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <input
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className={`w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-sm focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 ${className}`}
      />
    </div>
  );
}
