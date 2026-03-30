import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="bg-[#9A4020] p-4 sticky top-0 z-50 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo Section */}
        <div
          onClick={() => {
            navigate("/");
            setIsMenuOpen(false);
          }}
          className="flex items-center gap-2 cursor-pointer"
        >
          <img src="/logo.png" alt="Logo" className="h-10" />
          <div className="hidden sm:block">
            <p className="text-xs text-white/90 font-medium leading-tight">
              An initiative of <br />
              <span className="text-sm font-bold">Centre for Civil Society</span>
            </p>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-6 text-white font-medium">
          <Link to="/" className="hover:text-yellow-400 transition-colors">
            Home
          </Link>
          <Link to="/about" className="hover:text-yellow-400 transition-colors">
            About
          </Link>
          <Link to="/ranking" className="hover:text-yellow-400 transition-colors">
            Rankings
          </Link>
          <Link to="/services" className="hover:text-yellow-400 transition-colors">
            Services
          </Link>
          <Link to="/resources" className="hover:text-yellow-400 transition-colors">
            Resources
          </Link>
          <Link to="/outreach" className="hover:text-yellow-400 transition-colors">
            Outreach
          </Link>
          <Link to="/contactUs" className="hover:text-yellow-400 transition-colors">
            Contact
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none p-2"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Links */}
      {isMenuOpen && (
        <div className="md:hidden mt-4 bg-[#80351A] rounded-lg p-4 space-y-4 shadow-inner">
          <Link
            to="/"
            onClick={() => setIsMenuOpen(false)}
            className="block text-white hover:text-yellow-400 transition-colors border-b border-white/10 pb-2"
          >
            Home
          </Link>
          <Link
            to="/about"
            onClick={() => setIsMenuOpen(false)}
            className="block text-white hover:text-yellow-400 transition-colors border-b border-white/10 pb-2"
          >
            About
          </Link>
          <Link
            to="/ranking"
            onClick={() => setIsMenuOpen(false)}
            className="block text-white hover:text-yellow-400 transition-colors border-b border-white/10 pb-2"
          >
            Rankings
          </Link>
          <Link
            to="/services"
            onClick={() => setIsMenuOpen(false)}
            className="block text-white hover:text-yellow-400 transition-colors border-b border-white/10 pb-2"
          >
            Services
          </Link>
          <Link
            to="/resources"
            onClick={() => setIsMenuOpen(false)}
            className="block text-white hover:text-yellow-400 transition-colors border-b border-white/10 pb-2"
          >
            Resources
          </Link>
          <Link
            to="/outreach"
            onClick={() => setIsMenuOpen(false)}
            className="block text-white hover:text-yellow-400 transition-colors border-b border-white/10 pb-2"
          >
            Outreach
          </Link>
          <Link
            to="/contactUs"
            onClick={() => setIsMenuOpen(false)}
            className="block text-white hover:text-yellow-400 transition-colors"
          >
            Contact
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

