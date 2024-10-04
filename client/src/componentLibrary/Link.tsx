import { Link as L, useLocation } from "react-router-dom";

export default function Link({ to, text }: { to: string; text: string }) {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <L
      to={to}
      className={`text-yellow text-lg transition-colors duration-300 
         ${isActive ? "font-bold underline" : "font-normal hover:text-white"}`}
    >
      {text}
    </L>
  );
}
