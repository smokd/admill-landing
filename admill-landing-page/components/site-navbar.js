"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import NextImage from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";

const solutionLinks = [
  { label: "Electrical Engineering", href: "/solutions/electrical-engineering", description: "Power distribution, backup power and monitoring" },
  { label: "Power & Energy", href: "/solutions/power-energy", description: "Generators, ATS, solar and energy monitoring" },
  { label: "Building Automation & BMS", href: "/solutions/building-automation", description: "Building controls, HVAC integration and alarms" },
  { label: "Industrial Automation", href: "/solutions/industrial-automation", description: "PLC, SCADA, instrumentation and networking" },
  { label: "Electronic Security", href: "/solutions/electronic-security", description: "CCTV, access control and intrusion detection" },
  { label: "Fire & Life Safety", href: "/solutions/fire-life-safety", description: "Detection, alarm interfaces and emergency systems" },
  { label: "Systems Integration", href: "/solutions/systems-integration", description: "Electrical, automation and security working together" },
  { label: "Automatic Door Systems", href: "/solutions/automatic-door-systems", description: "Sliding, swing and revolving entrances" },
  { label: "Lead & Lag Controllers", href: "/solutions/lead-lag-controllers", description: "Pump and compressor sequencing controllers" },
  { label: "LoRa Telemetry Networks", href: "/solutions/lora-telemetry-networks", description: "Long-range wireless telemetry for remote assets" },
];

const industryLinks = [
  { label: "Mining & Resources", href: "/industries/mining", description: "Power, automation, monitoring and communications" },
  { label: "Manufacturing", href: "/industries/manufacturing", description: "Power, controls, monitoring and integration" },
  { label: "Commercial Buildings", href: "/industries/commercial", description: "Electrical infrastructure, BMS and facility security" },
  { label: "Healthcare", href: "/industries/healthcare", description: "Critical power, monitoring and building systems" },
  { label: "Education", href: "/industries/education", description: "Campus infrastructure, security and networking" },
  { label: "Hospitality", href: "/industries/hospitality", description: "Comfort, power, energy and access systems" },
];

const navItems = [
  { label: "Solutions", href: "/solutions", children: solutionLinks },
  { label: "Industries", href: "/industries", children: industryLinks },
  { label: "Projects", href: "/#projects" },
  { label: "About", href: "/#approach" },
  { label: "Contact", href: "/#contact" },
];

export default function SiteNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);

  const closeMenu = () => setMenuOpen(false);
  const closeDropdown = () => setOpenMenu(null);

  const active = openMenu ? navItems.find((item) => item.label === openMenu) : null;

  // Linear-style behaviour: transparent over the dark page top, then a
  // frosted, bordered surface once the page scrolls or a menu is open.
  const solid = scrolled || menuOpen || Boolean(active);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      onMouseLeave={closeDropdown}
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          closeDropdown();
          closeMenu();
        }
      }}
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
        solid
          ? "border-border-light bg-white/80 backdrop-blur-md"
          : "border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
        <Link
          href="/"
          aria-label="Admill Systems home"
          onClick={closeMenu}
          onMouseEnter={closeDropdown}
          className="flex items-center gap-3"
        >
          <NextImage
            src={solid ? "/logo-02.png" : "/logo-white.png"}
            alt=""
            width={58}
            height={48}
            priority
            className="h-11 w-auto"
          />
          <span
            className={`text-2xl font-semibold leading-none tracking-tight transition-colors ${
              solid ? "text-[#171A20]" : "text-white"
            }`}
          >
            admill
            <span className={solid ? "font-normal text-muted-text" : "font-normal text-white/70"}> systems</span>
          </span>
        </Link>

        <nav
          aria-label="Primary navigation"
          className={`hidden items-center gap-1 text-[14px] font-medium tracking-[-0.015em] transition-colors lg:flex ${
            solid ? "text-[#171A20]" : "text-white"
          }`}
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onMouseEnter={() => setOpenMenu(item.children ? item.label : null)}
              onFocus={() => setOpenMenu(item.children ? item.label : null)}
              aria-haspopup={item.children ? "true" : undefined}
              aria-expanded={item.children ? openMenu === item.label : undefined}
              aria-controls={item.children ? "nav-dropdown" : undefined}
              className={`rounded-md px-3 py-2 transition-colors hover:bg-accent-red hover:text-white ${
                openMenu === item.label ? "bg-accent-red text-white" : ""
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/#contact"
          onMouseEnter={closeDropdown}
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

        <AnimatePresence>
          {active && (
            <motion.div
              id="nav-dropdown"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="absolute inset-x-0 top-full border-b border-border-light bg-white/95 shadow-xl backdrop-blur-md"
            >
              <div className="mx-auto max-w-7xl px-5 py-8 lg:px-8">
                <div className="flex items-baseline justify-between">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-text">{active.label}</p>
                  <Link
                    href={active.href}
                    onClick={closeDropdown}
                    className="text-sm font-medium text-accent-red hover:underline"
                  >
                    View all →
                  </Link>
                </div>
                <div className="mt-5 grid gap-1 lg:grid-cols-3">
                  {active.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      onClick={closeDropdown}
                      className="group flex flex-col gap-1 rounded-xl px-3 py-2.5 transition-colors hover:bg-accent-red"
                    >
                      <span className="text-sm font-semibold text-primary-text group-hover:text-white">
                        {child.label}
                      </span>
                      <span className="text-[13px] leading-5 text-muted-text group-hover:text-white/80">
                        {child.description}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
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
            {navItems.map((item) => (
              <div key={item.href}>
                <Link href={item.href} onClick={closeMenu}>
                  {item.label}
                </Link>
                {item.children && (
                  <ul className="mt-3 flex flex-col gap-2 border-l border-border-light pl-4 text-[13px] font-normal text-muted-text">
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <Link href={child.href} onClick={closeMenu}>
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
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
