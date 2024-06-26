import { useCallback, useEffect, useState } from "react";
import MobileMenu from "./MobileMenu";
import NavbarItem from "./NavbarItem";
import { BsChevronDown, BsSearch, BsBell } from "react-icons/bs";
import AccountMenu from "./AccountMenu";

const TOP_OFFSET = 70;

const Navbar = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [showBackground, setShowBackground] = useState(false);

  const toggleMobileMenu = useCallback(() => {
    setShowMobileMenu((current) => !current);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= TOP_OFFSET) {
        setShowBackground(true);
      } else {
        setShowBackground(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleAccountMenu = useCallback(() => {
    setShowAccountMenu((current) => !current);
  }, []);

  return (
    <nav className="w-full fixed z-40">
      <div
        className={`
         px-4
         md:px-16
         py-6
         flex
         flex-row
         item-center
         transition
         duration-500
        ${showBackground ? "bg-zinc-900 bg-opacity-90" : ""}

         `}
      >
        <img className="h-4 lg:h-7" src="./images/logo.png" alt="Logo" />
        <div
          className="
            flex-row
            ml-8
            gap-7
            hidden
            lg:flex
             "
        >
          <NavbarItem label="Home" />
          <NavbarItem label="Series" />
          <NavbarItem label=" Movies" />
          <NavbarItem label="New & Popular" />
          <NavbarItem label="My List" />
          <NavbarItem label=" Browse by languages" />
        </div>

        <details onClick={toggleMobileMenu} className="dropdown">
          <summary className="underline font-semibold text-zinc-50 tm-1 lg:hidden flex flex-row items-center gap-2 ml-8 cursor-pointer relative">
            {" "}
            Browse{" "}
          </summary>

          <MobileMenu visible={showMobileMenu} />
        </details>

        <div className="flex flex-row ml-auto gap-7 items-center">
          <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
            <BsSearch />
          </div>
          <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
            <BsBell />
          </div>
          <div
            onClick={toggleAccountMenu}
            className="flex flex-row items-center gap-2 cursor-pointer relative"
          >
            <div className="w-5 h-5 lg:w-8 lg:h-8 rounded-md overflow-hidden">
              <img src="/images/default-green.png" alt="" />
            </div>
            <BsChevronDown
              className={`text-white transition ${
                showAccountMenu ? "rotate-180" : "rotate-0"
              }`}
            />
            <AccountMenu visible={showAccountMenu} />
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
