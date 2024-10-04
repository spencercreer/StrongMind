import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export default function Input({ label, ...props }: InputProps) {
  return (
    <div className="flex flex-col">
      {label && <label className="font-semibold">{label}</label>}
      <input
        {...props}
        className="p-2 border-2 border-gray-500 focus:border-blue-400 focus:outline-none rounded-md flex-grow"
      />
    </div>
  );
}
