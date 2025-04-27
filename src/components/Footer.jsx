import { Link } from "react-router";
import { Facebook, Instagram, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black text-white py-8">
      <div className="container mx-auto flex flex-col">
        {/* Top Section: Logo & Links */}
        <div className="flex flex-row justify-between items-center md:items-start mb-6">
          {/* Logo */}
          <a href="/" className="mb-4 md:mb-0">
            <img src="/KLogo.png" alt="Logo" className="h-32" />
          </a>

          {/* Footer Links */}
          <nav className="flex flex-wrap justify-center flex-col md:justify-end space-x-12 gap-2 text-gray-400">
            <Link to="/privacy" className="hover:text-white">Privacy Policy</Link>
            <Link to="/orders" className="hover:text-white">Track Order</Link>
            <Link to="/faq" className="hover:text-white">FAQ</Link>
            <Link to="/contact" className="hover:text-white">Contact Us</Link>
          </nav>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-600 my-4"></div>

        {/* Bottom Section: Socials & Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Social Icons */}
          <div className="flex space-x-4 mb-4 md:mb-0">
            <a href="#" className="hover:text-gray-400"><Facebook size={20} /></a>
            <a href="#" className="hover:text-gray-400"><Instagram size={20} /></a>
            <a href="#" className="hover:text-gray-400"><Twitter size={20} /></a>
          </div>

          {/* Copyright */}
          <p className="text-gray-500 text-sm">© {new Date().getFullYear()} Kaspa's Clone. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
