import React from "react";
import Link from "next/link";
import { FaInstagram, FaFacebookF, FaTwitter } from "react-icons/fa";


const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-200 py-12 mt-12">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* About */}
        <div>
          <h2 className="text-xl font-bold mb-4 text-orange-600">Royal Coffee</h2>
          <p className="text-gray-400 font-serif text-sm italic">
            Premium coffee brewed with love. Visit us in-store or order online to experience the royal taste.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-xl font-bold mb-4 text-orange-600">Quick Links</h2>
          <ul className="space-y-2">
            <li>
              <Link href="/" className="hover:text-orange-600">Home</Link>
            </li>
            <li>
              <Link href="/products" className="hover:text-orange-600">Products</Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-orange-600">About</Link>
            </li>
            <li>
              <Link href="/cart" className="hover:text-orange-600">Cart</Link>
            </li>
          </ul>
        </div>

        {/* Socials */}
        <div>
          <h2 className="text-xl font-bold mb-4 text-orange-600">Follow Us</h2>
          <div className="flex space-x-4">
            <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-orange-600">
              <FaInstagram size={24} />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-orange-600">
              <FaFacebookF size={24} />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-orange-600">
              <FaTwitter size={24} />
            </a>
          </div>
        </div>

      </div>

      <div className="mt-8 border-t border-gray-700 pt-4 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} Royal Coffee. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
