import React, { useState } from "react";
import { Link } from "react-scroll";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    ["Features", "features"],
    ["How it works", "how"],
    ["About us", "about"],
  ];

  const navigate = useNavigate();
  const handleSignIn = () => {
    navigate("/Login"); // Navigate to the Sign In page
  };
  const handleSignUp = () => {
    navigate("/signup"); // Navigate to the Sign Up page
  };

  return (
    <nav className="  lg:px-10 lg:pt-5 lg:pb-5 px-5 pb-5 linear-gradient(to bottom right, #001625, #013e51, #0193a6)">
      <div className="lg:mx-auto  sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center ">
            <img className="h-10 w-auto" src="src/assets/Frame 1000005373.png" alt="Logo" />
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden lg:block ms-auto">
            <div className="flex">
              {navItems.map(([name, id]) => (
                <Link
                  key={name}
                  to={id}
                  smooth={true}
                  duration={500}
                  offset={-50}
                  className="cursor-pointer rounded-md px-10 py-2 text-large font-bold nav-link bg-gradient-to-r from-[#38595e] via-[#3eb2c9] to-white bg-clip-text text-white hover:text-transparent bg-[length:200%] hover:bg-[position:right] transition-[background-position] duration-500 ease-in-out"
                >
                  {name}
                </Link>
              ))}
            </div>
          </div>

          {/* Desktop Sign In / Sign Up Buttons */}
          <div className="hidden lg:flex lg:ms-auto ">
            <button onClick={handleSignIn} className="me-4 rounded-md bg-gradient-to-r from-cyan-500 to-blue-500  px-3 py-2 text-sm font-medium text-white hover:bg-white hover:text-blue-500 transition duration-300">
              Sign In
            </button>
            <button onClick={handleSignUp} className="rounded-md border-2 border-blue-600 px-3 py-2 text-sm font-medium text-white hover:text-blue-500 transition duration-300">
              Sign Up
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="absolute inset-y-0 right-0 flex items-center lg:hidden">
            <button
              type="button"
              className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-none focus:ring-inset"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
              onClick={() => setIsOpen(!isOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <svg
                  className="size-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg
                  className="size-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-gray-900 text-white px-2 pb-3 pt-2" id="mobile-menu">
          <div className="space-y-1">
            {navItems.map(([name, id]) => (
              <Link
                key={name}
                to={id}
                smooth={true}
                duration={500}
                offset={-80}
                onClick={() => setIsOpen(false)}
                className="block cursor-pointer rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                {name}
              </Link>
            ))}
          </div>

          {/* Mobile Buttons */}
          <div className="mt-4 flex justify-evenly px-2">
                      <button 
              onClick={handleSignIn} 
              className="rounded-md bg-gradient-to-r from-cyan-500 to-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-white hover:text-blue-800 transition-all duration-300"
            >
              Sign In
            </button>

            <button  onClick={handleSignUp} className="rounded-md border-2 border-blue-600 bg-transparent px-4 py-2 text-sm font-medium text-white hover:text-blue-500 transition duration-300">
              Sign Up
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
