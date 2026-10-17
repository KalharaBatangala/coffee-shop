"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { HiOutlineShoppingBag, HiBars3, HiXMark } from "react-icons/hi2";
import { useCart } from "@/context/CartContext";
import { Crown } from "./Ornament";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/atelier", label: "Atelier" },
  { href: "/heritage", label: "Heritage" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { count, openCart, lastAdded } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [bump, setBump] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [pathname]);

  useEffect(() => {
    if (!lastAdded) return;
    setBump(true);
    const t = setTimeout(() => setBump(false), 500);
    return () => clearTimeout(t);
  }, [lastAdded]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${
        scrolled || menuOpen ? "border-b border-line bg-ink/85 backdrop-blur-md" : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="group flex items-center gap-3" aria-label="Royal Coffee home">
          <Crown className="h-6 w-8 text-gold transition-transform duration-500 group-hover:-translate-y-0.5" />
          <span className="font-caps text-lg tracking-[0.25em] text-ivory">
            ROYAL<span className="text-gold"> COFFEE</span>
          </span>
        </Link>

        <ul className="hidden items-center gap-10 md:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className={`relative font-caps text-[0.78rem] tracking-[0.22em] uppercase transition-colors after:absolute after:-bottom-2 after:left-1/2 after:h-px after:-translate-x-1/2 after:bg-gold after:transition-all after:duration-300 ${
                  isActive(l.href)
                    ? "text-gold-bright after:w-full"
                    : "text-ivory/75 after:w-0 hover:text-gold-bright hover:after:w-full"
                }`}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            onClick={openCart}
            className="relative rounded-full p-2.5 text-ivory transition-colors hover:text-gold-bright"
            aria-label={`Open cart, ${count} item${count === 1 ? "" : "s"}`}
          >
            <HiOutlineShoppingBag className="h-6 w-6" />
            {count > 0 && (
              <span
                className="absolute -top-0.5 -right-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-gold px-1 font-caps text-[0.65rem] font-semibold text-ink"
                style={bump ? { animation: "bump 0.5s ease" } : undefined}
              >
                {count}
              </span>
            )}
          </button>
          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="rounded-full p-2.5 text-ivory md:hidden"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <HiXMark className="h-6 w-6" /> : <HiBars3 className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <ul className="animate-fade-up space-y-1 border-t border-line px-4 pt-4 pb-8 md:hidden">
          {LINKS.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className={`block py-3 font-display text-3xl ${isActive(l.href) ? "text-gold-bright" : "text-ivory"}`}
              >
                {l.label}
              </Link>
            </li>
          ))}
          <li>
            <Link href="/cart" className="block py-3 font-display text-3xl text-ivory">
              Cart {count > 0 && <span className="text-gold">({count})</span>}
            </Link>
          </li>
        </ul>
      )}
    </header>
  );
}
