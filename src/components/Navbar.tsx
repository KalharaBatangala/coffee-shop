import React from "react";
import Link from "next/link";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-black shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/">
          <span className="text-2xl font-bold text-yellow-400 cursor-pointer">
            CoffeeShop
          </span>
        </Link>

        {/* Links */}
        <div className="space-x-6 flex items-center">
          <Link href="/">
            <span className="text-white hover:text-yellow-400 cursor-pointer">Home</span>
          </Link>
          <Link href="/products">
            <span className="text-white hover:text-yellow-400 cursor-pointer">Products</span>
          </Link>
          <Link href="/cart">
            <span className="text-white hover:text-yellow-400 cursor-pointer">Cart</span>
          </Link>
          <Link href="/about">
            <span className="text-white hover:text-yellow-400 cursor-pointer">About</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
