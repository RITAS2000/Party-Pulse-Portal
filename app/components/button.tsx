import React from 'react';
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export default function Button({ children, type = 'button', ...props }: ButtonProps) {
  return (
    <button
      type={type}
      {...props}
      className="font-bold text-xl px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors duration-300"
    >
      {children}
    </button>
  );
}