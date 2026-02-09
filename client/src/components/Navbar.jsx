import React from "react";
import { useNavigate, Link } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="bg-[#9A4020] p-2">
      <div className="container mx-auto flex justify-between items-center">

        {/* Logo Section */}
        <div
          onClick={() => navigate("/")}
          className="flex items-center gap-2 cursor-pointer"
        >
          <img src="/logo.png" alt="Logo" className="h-8" />
          <div>
            <p className="text-xs text-white/80">
              An initiative of Centre for Civil Society
            </p>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex items-center gap-6 text-white relative">

          <Link to="/" className="hover:underline">
            Home
          </Link>

          <Link to="/about" className="hover:underline">
            About
          </Link>

          <Link to="/services" className="hover:underline">
            Services
          </Link>

          <Link to='/resources' className="hover:underline">
            Resources
          </Link>
          <Link to='/outreach' className="Hover:underline">
            Outreach
          </Link>
          <Link to="/contactUs" className="hover:underline">
            Contact
          </Link>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
