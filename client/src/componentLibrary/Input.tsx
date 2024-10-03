import React from "react";

export default function Input({ ...props }) {
  return (
    <input
      {...props}
      className="p-2 border border-gray-300 rounded-md flex-grow"
    />
  );
}
