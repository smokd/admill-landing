"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import NextImage from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";

const navLinks = [
  ["Solutions", "/solutions"],
  ["Industries", "/industries"],
  ["Projects", "/#projects"],
  ["About", "/#approach"],
  ["Contact", "/#contact"],
];

export default function SiteNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  // Linear-style behaviour: transparent over the dark page top, then a
  // frosted, bordered surface once the page scrolls.
  const solid = scrolled || menuOpen;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
        solid
          ? "border-border-light bg-white/80 backdrop-blur-md"
          : "border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
        <Link href="/" aria-label="Admill Systems home" onClick={closeMenu} className="flex items-center gap-3">
          <NextImage
            src={solid ? "/logo-02.png" : "/logo-white.png"}
            alt=""
            width={58}
            height={48}
            priority
            className="h-11 w-auto"
          />
          <span
            className={`text-lg font-semibold leading-none tracking-tight transition-colors ${
              solid ? "text-[#171A20]" : "text-white"
            }`}
          >
            Admill
            <span className={solid ? "font-normal text-muted-text" : "font-normal text-white/70"}> Systems</span>
          </span>
        </Link>

        <nav
          aria-label="Primary navigation"
          className={`hidden items-center gap-1 text-[14px] font-medium transition-colors lg:flex ${
            solid ? "text-[#171A20]" : "text-white"
          }`}
        >
          {navLinks.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              className={`rounded-md px-3 py-2 transition-colors ${
                solid ? "hover:bg-black/5" : "hover:bg-white/10"
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>

        <Link
          href="/#contact"
          className="hidden rounded-full bg-accent-red px-6 py-3 text-[14px] font-medium text-white hover:opacity-90 md:inline-flex"
        >
          Discuss a Project
        </Link>

        <button
          type="button"
          className={`text-2xl transition-colors lg:hidden ${solid ? "text-primary-text" : "text-white"}`}
          onClick={() => setMenuOpen((open) => !open)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            id="mobile-navigation"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="flex flex-col gap-5 border-t border-border-light bg-primary-bg px-6 py-6 text-[14px] font-medium text-[#171A20] lg:hidden"
          >
            {navLinks.map(([label, href]) => (
              <Link key={href} href={href} onClick={closeMenu}>
                {label}
              </Link>
            ))}
            <Link
              href="/#contact"
              onClick={closeMenu}
              className="rounded-full bg-accent-red px-5 py-3 text-center text-white"
            >
              Discuss a Project
            </Link>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
