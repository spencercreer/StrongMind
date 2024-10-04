import Link from "../componentLibrary/Link";

const Header = () => {
  return (
    <nav className="px-8 bg-green shadow-md w-full sticky top-0 z-50">
      <div className="flex justify-between w-fit space-x-8 items-center min-h-16">
        <h1 className="font-pacifico text-white">TopThat</h1>
        <Link to="/" text="Pizza Menu" />
        <Link to="/toppings" text="Toppings" />
      </div>
    </nav>
  );
};

export default Header;
