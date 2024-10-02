import React from "react";
import Link from "../componentLibrary/Link";

const Header = () => {
  return (
    <nav className="px-8 bg-blue shadow-md w-full sticky top-0">
      <div className="flex justify-between w-fit space-x-8 items-center min-h-16">
        <Link to="/" text="About" />
        <Link to="/pizzas" text="Pizza Menu" />
        <Link to="/toppings" text="Toppings" />
      </div>
    </nav>
  );
};

export default Header;
