import Link from "../componentLibrary/Link";
import logo from "../assets/images/topthat_logo.png";

const Header = () => {
  return (
    <nav className="px-8 py-4 bg-green shadow-md w-full sticky top-0 z-50">
      <div className="flex flex-col items-center md:flex-row justify-between w-full min-h-16">
        <div className="flex flex-row items-center justify-center w-full md:w-auto">
          <img
            src={logo}
            alt="TopThat logo. A pizza in front of an Italian flag."
            className="w-12 h-12 md:w-24 md:h-24"
          />
          <h1 className="font-pacifico text-white text-3xl ml-2">TopThat</h1>
        </div>
        <div className="flex flex-row mt-4 md:mt-0 space-x-4 text-center">
          <Link to="/" text="Menu" />
          <Link to="/toppings" text="Toppings" />
        </div>
      </div>
    </nav>
  );
};

export default Header;
