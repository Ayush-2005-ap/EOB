import React, { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "Rankings", to: "/ranking" },
  { label: "About", to: "/about" },
  { label: "Resources", to: "/resources" },
  { label: "Contact", to: "/contactUs" },
];

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <nav
      className={`bg-[#0F1E3C] sticky top-0 z-50 transition-shadow duration-300 ${
        scrolled ? "shadow-[0_2px_20px_rgba(0,0,0,0.18)]" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex justify-between items-center">
        {/* Logo */}
        <div
          onClick={() => navigate("/")}
          className="flex items-center gap-3 cursor-pointer select-none"
        >
          <img src="/logo.png" alt="EODB Logo" className="h-9 w-auto" />
          <div className="hidden sm:block border-l border-white/10 pl-3">
            <p className="text-[10px] text-white/50 font-medium leading-tight uppercase tracking-wider">
              An initiative of
            </p>
            <p className="text-sm font-bold text-white leading-tight">
              Centre for Civil Society
            </p>
          </div>
        </div>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(({ label, to }) => {
            const isActive =
              to === "/" ? location.pathname === "/" : location.pathname.startsWith(to);
            return (
              <Link
                key={to}
                to={to}
                className={`relative px-4 py-2 text-sm font-semibold rounded-lg transition-colors duration-150 ${
                  isActive
                    ? "text-[#E88C30]"
                    : "text-white/70 hover:text-white hover:bg-white/5"
                }`}
              >
                {label}
                {isActive && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-[2px] bg-[#E88C30] rounded-full" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsMenuOpen((v) => !v)}
          className="md:hidden text-white/70 hover:text-white p-2 rounded-lg hover:bg-white/5 transition-colors"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {isMenuOpen && (
        <div className="md:hidden bg-[#0a1628] border-t border-white/5 px-6 py-4 space-y-1">
          {NAV_LINKS.map(({ label, to }) => {
            const isActive =
              to === "/" ? location.pathname === "/" : location.pathname.startsWith(to);
            return (
              <Link
                key={to}
                to={to}
                className={`block px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                  isActive
                    ? "text-[#E88C30] bg-[#E88C30]/8"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                }`}
              >
                {label}
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
