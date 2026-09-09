"use client";

import { useState } from "react";
import Link from "next/link";
import NextImage from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";

const homeLinks = [
  ["Projects", "/#projects"],
  ["About", "/#approach"],
  ["Contact", "/#contact"],
];

export default function SiteNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border-light bg-primary-bg/95 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
        <Link href="/" aria-label="Admill Systems home" onClick={closeMenu}>
          <NextImage src="/logo-02.png" alt="Admill Systems" width={58} height={48} priority className="h-11 w-auto" />
        </Link>
        <nav aria-label="Primary navigation" className="hidden items-center gap-8 text-sm font-semibold lg:flex">
          <Link href="/solutions" className="hover:text-accent-red">Solutions</Link>
          <Link href="/industries" className="hover:text-accent-red">Industries</Link>
          {homeLinks.map(([label, href]) => <Link key={href} href={href} className="hover:text-accent-red">{label}</Link>)}
        </nav>
        <Link href="/#contact" className="hidden rounded-full bg-accent-red px-6 py-3 font-semibold text-white hover:opacity-90 md:inline-flex">Discuss a Project</Link>
        <button type="button" className="text-2xl lg:hidden" onClick={() => setMenuOpen((open) => !open)} aria-label="Toggle menu" aria-expanded={menuOpen} aria-controls="mobile-navigation">
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>
      <AnimatePresence>
        {menuOpen && <motion.nav id="mobile-navigation" aria-label="Mobile navigation" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="flex flex-col gap-5 border-t border-border-light bg-primary-bg px-6 py-6 font-semibold lg:hidden">
          <Link href="/solutions" onClick={closeMenu}>Solutions</Link>
          <Link href="/industries" onClick={closeMenu}>Industries</Link>
          {homeLinks.map(([label, href]) => <Link key={href} href={href} onClick={closeMenu}>{label}</Link>)}
          <Link href="/#contact" onClick={closeMenu} className="rounded-full bg-accent-red px-5 py-3 text-center text-white">Discuss a Project</Link>
        </motion.nav>}
      </AnimatePresence>
    </header>
  );
}
