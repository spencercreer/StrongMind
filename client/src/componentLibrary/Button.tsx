import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  loading?: boolean;
}

export default function Button({
  children,
  loading = false,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className="px-4 py-2 rounded-full shadow-lg bg-red font-semibold text-lg text-white hover:bg-green focus:bg-green focus:outline-none active:shadow-none disabled:bg-gray-500 disabled:cursor-not-allowed disabled:shadow-lg"
      disabled={loading || props.disabled}
    >
      {children}
    </button>
  );
}
