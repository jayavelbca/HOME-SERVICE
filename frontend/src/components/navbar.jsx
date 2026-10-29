
import { useState } from "react";
import { Menu, X, Home, Phone } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { name: "Home", href: "#home" },
    { name: "Services", href: "#services" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-2">
          <div className="rounded-lg bg-black p-2 text-white">
            <Home size={22} />
          </div>

          <div>
            <h1 className="text-xl font-bold tracking-tight">
              Home<span className="text-gray-500">Ease</span>
            </h1>
            <p className="text-xs text-gray-500">
              Trusted Home Services
            </p>
          </div>
        </a>

        {/* Desktop Menu */}
        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-gray-700 transition hover:text-black"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Contact Button */}
        <a
          href="tel:+919876543210"
          className="hidden items-center gap-2 rounded-full bg-black px-5 py-3 text-sm font-semibold text-white transition hover:bg-gray-800 md:flex"
        >
          <Phone size={16} />
          Call Now
        </a>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-lg border border-gray-200 p-2 md:hidden"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="border-t border-gray-200 bg-white px-5 py-4 md:hidden">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block rounded-lg px-3 py-3 font-medium text-gray-700 hover:bg-gray-100"
            >
              {link.name}
            </a>
          ))}

          <a
            href="tel:+919876543210"
            className="mt-3 flex items-center justify-center gap-2 rounded-lg bg-black px-4 py-3 font-semibold text-white"
          >
            <Phone size={18} />
            Call Now
          </a>
        </div>
      )}
    </nav>
  );
}
