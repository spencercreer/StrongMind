import React from "react";
import combineClassNames from "./utils/combineClassNames";

interface ContainerProps {
  children?: React.ReactNode;
  className?: string;
}
export default function Container({ children, className }: ContainerProps) {
  return (
    <div
      className={combineClassNames([
        "bg-white py-4 px-6 w-full rounded-lg shadow-md border border-[#E0E0E0]",
        className ? className : "",
      ])}
    >
      {children}
    </div>
  );
}
