import React from 'react';

const Navbar = () => {
    return (
        <nav className="bg-[#9A4020] p-2">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-white text-lg font-bold">
                    <img src="/logo.png" alt="Logo" className="h-8 hover:cursor-pointer" />
                    <div>
                        <p className="text-xs text-white/80">
                            An initiative of Centre for Civil Society
                        </p>
                    </div>
                </div>
                <div className="space-x-4">
                    <a href="/" className="text-white hover:text-white">Home</a>
                    <a href="/about" className="text-white hover:text-white">About</a>
                    <a href="/services" className="text-white hover:text-white">Services</a>
                    <a href="/contactUs" className="text-white hover:text-white">Contact</a>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;