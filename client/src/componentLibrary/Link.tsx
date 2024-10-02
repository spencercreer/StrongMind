import React from "react";
import { Link as L, useLocation } from "react-router-dom";

export default function Link({ to, text }: { to: string; text: string }) {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <L
      to={to}
      className={`text-yellow transition-colors duration-300 
         ${
           isActive
             ? "font-bold text-green underline"
             : "font-normal hover:text-blue-700 hover:underline"
         }`}
    >
      {text}
    </L>
  );
}
