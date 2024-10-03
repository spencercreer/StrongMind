import React from "react";
import Spinner from "./Spinner";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  variant?: "primary" | "secondary";
  loading?: boolean;
}

export default function Button({
  children,
  variant = "primary",
  loading = false,
  ...props
}: ButtonProps) {
  const buttonClass = () => {
    switch (variant) {
      case "secondary":
        return "flex justify-center items-center font-medium bg-transparent text-electrum hover:text-electrum-300 focus:text-electrum-focus focus:outline-none focus:border-none focus:outline-0 focus:ring-0 disabled:bg-transparent disabled:cursor-not-allowed";
      default:
        // Default to primary
        return "flex justify-center items-center px-4 py-2 rounded-full shadow-lg bg-red font-semibold text-lg text-white hover:bg-green focus:bg-green focus:outline-none active:shadow-none disabled:bg-gray-500 disabled:cursor-not-allowed disabled:shadow-lg";
    }
  };

  return (
    <button
      {...props}
      className={buttonClass()}
      disabled={loading || props.disabled}
    >
      {loading && <Spinner className="w-8 h-8 mr-2" color="white" />}
      {children}
    </button>
  );
}
