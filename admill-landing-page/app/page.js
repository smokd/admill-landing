// app/page.js
'use client';

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import NextImage from 'next/image';
import { FiShield, FiKey, FiBell, FiWifi, FiCloud, FiUserCheck, FiMenu, FiX, FiArrowUp } from 'react-icons/fi';

// Animation variants for staggered entrance
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// FAQ Item Component
function FAQItem({ question, answer, index }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      className="border border-border-light rounded-lg overflow-hidden bg-secondary-bg"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-primary-bg transition-colors duration-200"
      >
        <span className="font-semibold text-primary-text font-heading pr-4">{question}</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-accent-red text-xl flex-shrink-0"
        >
          ▼
        </motion.span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-6 py-4 text-muted-text font-body border-t border-border-light">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// Mobile menu animation variants
const mobileMenuVariants = {
  hidden: { x: "100%" },
  visible: { x: 0, transition: { type: "spring", stiffness: 120, damping: 20 } },
  exit: { x: "100%", transition: { duration: 0.3 } },
};

// Scroll to top button animation variants
const scrollToTopVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, y: 50, transition: { duration: 0.2 } },
};


export default function HomePage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  // Contact form anti-spam timestamp (used by backend to prevent instant submissions)
  const [formTimestamp, setFormTimestamp] = useState(0);
  const [canSubmit, setCanSubmit] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollToTop(true);
      } else {
        setShowScrollToTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Set the form timestamp on client mount so it's at least a few seconds before submit
  useEffect(() => {
    setFormTimestamp(Date.now());
  }, []);

  // Enable submit after 3 seconds to align with backend timing check
  useEffect(() => {
    const t = setTimeout(() => setCanSubmit(true), 3000);
    return () => clearTimeout(t);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      {/* Main Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 py-4 backdrop-blur-sm bg-primary-bg/90 border-b border-border-light shadow-sm">
        <div className="max-w-6xl mx-auto px-4 md:px-8 flex justify-between items-center">
          {/* Logo Section */}
          <div className="flex items-center">
            <NextImage
              src="/logo-02.png"
              alt="Admill Systems - Electronic Security & IT Solutions Provider in Zimbabwe"
              width={45}
              height={40}
              priority
              className="h-10 w-auto"
            />
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex flex-1 justify-center space-x-4 lg:space-x-8 text-sm lg:text-base font-body">
            <a href="#about" className="text-primary-text uppercase font-semibold hover:text-accent-red transition-colors duration-300">About</a>
            <a href="#services" className="text-primary-text uppercase font-semibold hover:text-accent-red transition-colors duration-300">Solutions</a>
            <a href="#clients" className="text-primary-text uppercase font-semibold hover:text-accent-red transition-colors duration-300">Clients</a>
            <a href="#contact" className="text-primary-text uppercase font-semibold hover:text-accent-red transition-colors duration-300">Contact</a>
          </div>

          {/* Right-aligned Utility Links & CTA Button */}
          <div className="hidden md:flex items-center space-x-4">
            <a href="#" className="text-primary-text text-sm font-semibold hover:text-accent-red transition-colors duration-300">Login</a>
            <a href="#contact" className="text-primary-text text-sm font-semibold hover:text-accent-red transition-colors duration-300">Support</a>
            <a
              href="#contact"
              className="bg-accent-red text-primary-bg text-sm px-6 py-2 rounded-full font-semibold hover:bg-opacity-80 transition duration-300 shadow-md"
            >
              Free Assessment
            </a>
          </div>

          {/* Mobile Menu Toggle (Hamburger/Close Icon) */}
          <button
            className="md:hidden text-primary-text text-3xl focus:outline-none"
            onClick={toggleMobileMenu}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 bg-primary-bg/95 backdrop-blur-md z-40 flex flex-col items-center justify-center p-8 md:hidden"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={mobileMenuVariants}
          >
            <nav className="flex flex-col space-y-8 text-2xl font-body">
              <a href="#about" className="text-primary-text hover:text-accent-red transition-colors duration-300" onClick={closeMobileMenu}>About</a>
              <a href="#services" className="text-primary-text hover:text-accent-red transition-colors duration-300" onClick={closeMobileMenu}>Solutions</a>
              <a href="#clients" className="text-primary-text hover:text-accent-red transition-colors duration-300" onClick={closeMobileMenu}>Clients</a>
              <a href="#contact" className="text-primary-text hover:text-accent-red transition-colors duration-300" onClick={closeMobileMenu}>Contact</a>
              <div className="border-t border-border-light pt-8 mt-8 flex flex-col space-y-4">
                <a href="#" className="text-primary-text hover:text-accent-red transition-colors duration-300 text-lg" onClick={closeMobileMenu}>Login</a>
                <a href="#contact" className="text-primary-text hover:text-accent-red transition-colors duration-300 text-lg" onClick={closeMobileMenu}>Support</a>
                <a
                  href="#contact"
                  className="mt-4 bg-accent-red text-primary-bg text-lg px-6 py-3 rounded-full font-semibold hover:bg-opacity-80 transition duration-300 shadow-md self-center"
                  onClick={closeMobileMenu}
                >
                  Free Assessment
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>


      {/* Main content area */}
      <main className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden pt-[80px]"> {/* Compensates for fixed navbar */}
        {/* Hero Video/Image Background Container */}
        <div className="absolute inset-0 w-full h-full">
          <video
            className="w-full h-full object-cover"
            src="/security-hero.mp4"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            poster="/hero-security.jpg"
          >
            Your browser does not support the video tag.
          </video>
          {/* Much Lighter Overlay for Text Readability */}
          <div className="absolute inset-0 bg-primary-bg/70"></div>
        </div>

        {/* Hero Section Content Overlay */}
        <motion.div
          className="relative z-10 text-center px-6 py-16 md:py-24 max-w-4xl"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.h1
            className="text-4xl sm:text-6xl font-bold leading-tight mb-6 text-primary-text font-heading"
            variants={fadeInUp}
          >
            <span className="text-accent-red">Holistic Electronic Engineering Solutions.</span> <br />
            Security • Integration • Building Management
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-muted-text mb-4 max-w-2xl mx-auto font-body"
            variants={fadeInUp}
          >
            Award-winning security, systems integration, and BMS solutions trusted by 200+ organizations across Zimbabwe.
          </motion.p>
          <motion.p
            className="text-base md:text-lg text-primary-bg bg-accent-red/90 inline-block px-6 py-2 rounded-full mb-8 font-semibold"
            variants={fadeInUp}
          >
            ✓ 15+ Years Experience  ✓ Systems Integration  ✓ 24/7 Support
          </motion.p>
          <motion.div className="flex flex-col sm:flex-row justify-center gap-4" variants={fadeInUp}>
            <motion.a
              href="#contact"
              className="inline-block bg-accent-red text-primary-bg text-lg md:text-xl font-semibold px-8 py-3 rounded-full hover:bg-opacity-80 transition duration-300 shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Free Security Assessment
            </motion.a>
            <motion.a
              href="#services"
              className="inline-block border-2 border-primary-text text-primary-text text-lg md:text-xl px-8 py-3 rounded-full hover:bg-primary-text hover:text-primary-bg transition duration-300 font-semibold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Explore Solutions
            </motion.a>
          </motion.div>
        </motion.div>
      </main>

      {/* About Section - Image Refined */}
      <section id="about" className="bg-primary-bg py-20 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          {/* Left Column: Replaced with NextImage */}
          <motion.div
            className="relative w-full h-64 md:h-96 rounded-lg overflow-hidden" // Added relative and overflow-hidden
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <NextImage
              // NEW IMAGE URL
              src="/eng.jpg
              "
              alt="Professional security engineer installing advanced CCTV surveillance system"
              fill // Use fill to make image cover container
              style={{ objectFit: 'cover' }} // object-fit: cover
              sizes="(max-width: 768px) 100vw, 50vw" // Responsive image sizing
              priority // Or lazy if not in viewport initially
              className="rounded-lg" // Ensure image itself is rounded
            />
          </motion.div>

          {/* Right Column: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-accent-red mb-6 font-heading">Engineering Excellence Since 2017</h2>
            <p className="text-primary-text text-lg leading-relaxed mb-4 font-body">
              Admill Systems is Zimbabwe's leading provider of holistic electronic engineering solutions. We combine security systems, IT infrastructure, and building automation to create intelligent, integrated environments.
            </p>
            <p className="text-muted-text leading-relaxed mb-6 font-body">
              From consultation and custom system design to seamless installation and ongoing support, we deliver complete solutions that work together. Our expertise spans CCTV surveillance, access control, network infrastructure, and Building Management Systems (BMS) – all integrated into cohesive ecosystems that enhance security, efficiency, and control.
            </p>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="flex items-center space-x-3 bg-secondary-bg p-4 rounded-lg border border-border-light">
                <div className="text-accent-red text-3xl">🏆</div>
                <div>
                  <p className="font-semibold text-primary-text text-sm">ISO Certified</p>
                  <p className="text-xs text-muted-text">Quality Management</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 bg-secondary-bg p-4 rounded-lg border border-border-light">
                <div className="text-accent-red text-3xl">🤝</div>
                <div>
                  <p className="font-semibold text-primary-text text-sm">Authorized Partner</p>
                  <p className="text-xs text-muted-text">Hikvision & Honeywell</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 bg-secondary-bg p-4 rounded-lg border border-border-light">
                <div className="text-accent-red text-3xl">⚡</div>
                <div>
                  <p className="font-semibold text-primary-text text-sm">Systems Integration</p>
                  <p className="text-xs text-muted-text">Multi-platform expertise</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 bg-secondary-bg p-4 rounded-lg border border-border-light">
                <div className="text-accent-red text-3xl">✓</div>
                <div>
                  <p className="font-semibold text-primary-text text-sm">15+ Years</p>
                  <p className="text-xs text-muted-text">Engineering Excellence</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="bg-secondary-bg py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-accent-red mb-12 font-heading">Comprehensive Solutions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {[
              { id: 1, title: "Smart Surveillance", desc: "AI-powered CCTV with facial recognition, remote access & analytics.", icon: <FiShield />, pricing: "Custom Quote" },
              { id: 2, title: "Access Control", desc: "Biometric, RFID, and card-based systems for secure entry.", icon: <FiKey />, pricing: "Custom Quote" },
              { id: 3, title: "Intrusion Detection", desc: "Silent alarm systems with 24/7 monitoring for critical sites.", icon: <FiBell />, pricing: "Custom Quote" },
              { id: 4, title: "Building Management Systems", desc: "Integrated BMS for HVAC, lighting, energy, and environmental control.", icon: <FiCloud />, pricing: "Custom Quote" },
              { id: 5, title: "Systems Integration", desc: "Multi-system integration connecting security, IT, and building automation.", icon: <FiWifi />, pricing: "Custom Quote" },
              { id: 6, title: "Workforce Management", desc: "Biometric attendance tracking with portable rugged devices.", icon: <FiUserCheck />, pricing: "Custom Quote" }
            ].map((item, idx) => (
              <motion.div
                key={item.id}
                className="bg-primary-bg p-8 rounded-xl shadow-md border border-border-light hover:shadow-xl hover:scale-[1.03] transition-all duration-300 flex flex-col items-start"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <div className="text-4xl text-accent-red mb-4">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-primary-text font-heading">{item.title}</h3>
                <p className="text-base text-muted-text leading-relaxed mb-4 flex-grow font-body">{item.desc}</p>
                <div className="w-full border-t border-border-light pt-4 mt-2">
                  <p className="text-sm text-accent-red font-semibold mb-3">{item.pricing}</p>
                  <a
                    href="#contact"
                    className="inline-block text-sm bg-accent-red text-primary-bg px-4 py-2 rounded-full hover:bg-opacity-90 transition-colors duration-300 font-semibold"
                  >
                    Get Quote →
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Integration & BMS Capabilities Section - NEW */}
      <section className="bg-primary-bg py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="text-3xl sm:text-4xl font-bold text-center text-accent-red mb-6 font-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            Complete Systems Integration
          </motion.h2>
          <motion.p
            className="text-center text-primary-text text-lg mb-12 max-w-3xl mx-auto font-body"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            We don't just install systems — we integrate them. Our holistic approach connects security, IT, and building automation into unified, intelligent ecosystems.
          </motion.p>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Building Management Systems */}
            <motion.div
              className="bg-secondary-bg p-8 rounded-xl border border-border-light"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-4xl text-accent-red mb-4">🏢</div>
              <h3 className="text-2xl font-bold text-primary-text mb-4 font-heading">Building Management Systems (BMS)</h3>
              <p className="text-muted-text mb-4 font-body leading-relaxed">
                Centralized control and monitoring of your building's mechanical and electrical systems. Our BMS solutions optimize energy efficiency, enhance comfort, and reduce operational costs.
              </p>
              <ul className="space-y-2 text-primary-text font-body">
                <li className="flex items-start">
                  <span className="text-accent-red mr-2">✓</span>
                  <span>HVAC control and optimization</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent-red mr-2">✓</span>
                  <span>Lighting automation and energy management</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent-red mr-2">✓</span>
                  <span>Environmental monitoring (temperature, humidity, air quality)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent-red mr-2">✓</span>
                  <span>Power monitoring and load management</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent-red mr-2">✓</span>
                  <span>Real-time dashboards and remote access</span>
                </li>
              </ul>
            </motion.div>

            {/* Systems Integration */}
            <motion.div
              className="bg-secondary-bg p-8 rounded-xl border border-border-light"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-4xl text-accent-red mb-4">🔗</div>
              <h3 className="text-2xl font-bold text-primary-text mb-4 font-heading">Multi-System Integration</h3>
              <p className="text-muted-text mb-4 font-body leading-relaxed">
                Break down silos between security, IT, and building systems. We create cohesive environments where all systems communicate and work together seamlessly.
              </p>
              <ul className="space-y-2 text-primary-text font-body">
                <li className="flex items-start">
                  <span className="text-accent-red mr-2">✓</span>
                  <span>Security + BMS integration (access control triggers lighting, HVAC)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent-red mr-2">✓</span>
                  <span>Unified dashboards across multiple platforms</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent-red mr-2">✓</span>
                  <span>Protocol bridging (BACnet, Modbus, SNMP, API integration)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent-red mr-2">✓</span>
                  <span>Legacy system modernization and integration</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent-red mr-2">✓</span>
                  <span>IoT device integration and smart building automation</span>
                </li>
              </ul>
            </motion.div>
          </div>

          {/* Integration Benefits */}
          <motion.div
            className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-accent-red/10 border border-accent-red/30 p-6 rounded-lg text-center">
              <div className="text-3xl font-bold text-accent-red mb-2 font-heading">30-50%</div>
              <p className="text-primary-text font-semibold font-body">Energy Savings</p>
              <p className="text-sm text-muted-text mt-2">Through optimized BMS control</p>
            </div>
            <div className="bg-accent-red/10 border border-accent-red/30 p-6 rounded-lg text-center">
              <div className="text-3xl font-bold text-accent-red mb-2 font-heading">Single Pane</div>
              <p className="text-primary-text font-semibold font-body">Unified Control</p>
              <p className="text-sm text-muted-text mt-2">Manage all systems from one dashboard</p>
            </div>
            <div className="bg-accent-red/10 border border-accent-red/30 p-6 rounded-lg text-center">
              <div className="text-3xl font-bold text-accent-red mb-2 font-heading">24/7</div>
              <p className="text-primary-text font-semibold font-body">Automated Response</p>
              <p className="text-sm text-muted-text mt-2">Intelligent systems that self-optimize</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Projects / Case Studies Section - Images Refined */}
      <section className="bg-primary-bg py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-accent-red mb-12 font-heading">Our Featured Work</h2>
          <p className="text-primary-text text-lg leading-relaxed mb-10 max-w-2xl mx-auto font-body">
            Explore how Admill Systems has delivered cutting-edge security and IT solutions for diverse clients and complex challenges.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div
              className="bg-secondary-bg rounded-xl shadow-md border border-border-light overflow-hidden hover:shadow-lg transition-shadow duration-300"
              initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ delay: 0.1 }}
            >
              <div className="relative w-full h-48">
                <NextImage
                  // NEW IMAGE URL
                  src="turn.png"
                  alt="Large commercial complex with integrated CCTV surveillance and access control systems by Admill Systems"
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="p-6 text-left">
                <h3 className="text-xl font-semibold text-primary-text mb-2 font-heading">Large Commercial Complex</h3>
                <p className="text-muted-text text-sm mb-4">Integrated CCTV, access control, and network infrastructure.</p>
                <a href="#" className="text-accent-red font-semibold hover:underline">View Case Study &rarr;</a>
              </div>
            </motion.div>
            <motion.div
              className="bg-secondary-bg rounded-xl shadow-md border border-border-light overflow-hidden hover:shadow-lg transition-shadow duration-300"
              initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ delay: 0.2 }}
            >
              <div className="relative w-full h-48">
                <NextImage
                  // NEW IMAGE URL
                  src="board.webp"
                  alt="Government ministry building secured with biometric access control and alarm systems installed by Admill"
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="p-6 text-left">
                <h3 className="text-xl font-semibold text-primary-text mb-2 font-heading">Government Ministry Security Upgrade</h3>
                <p className="text-muted-text text-sm mb-4">High-level biometric access and alarm system deployment.</p>
                <a href="#" className="text-accent-red font-semibold hover:underline">View Case Study &rarr;</a>
              </div>
            </motion.div>
            <motion.div
              className="bg-secondary-bg rounded-xl shadow-md border border-border-light overflow-hidden hover:shadow-lg transition-shadow duration-300"
              initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ delay: 0.3 }}
            >
              <div className="relative w-full h-48">
                <NextImage
                  // NEW IMAGE URL
                  src="mtgs.jpg"
                  alt="Educational campus with comprehensive network infrastructure and structured cabling by Admill Systems"
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="p-6 text-left">
                <h3 className="text-xl font-semibold text-primary-text mb-2 font-heading">Educational Campus Network</h3>
                <p className="text-muted-text text-sm mb-4">Comprehensive campus-wide network infrastructure overhaul.</p>
                <a href="#" className="text-accent-red font-semibold hover:underline">View Case Study &rarr;</a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats/Metrics Section */}
      <section className="bg-accent-red py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-primary-bg">
            {[
              { value: "15+", label: "Years in Business" },
              { value: "500+", label: "Projects Completed" },
              { value: "200+", label: "Happy Clients" },
              { value: "99.8%", label: "Uptime Guarantee" }
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <div className="text-4xl md:text-5xl font-bold mb-2 font-heading">{stat.value}</div>
                <div className="text-lg font-body opacity-90">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Clients Section */}
      <section id="clients" className="bg-primary-bg px-6 py-20 max-w-6xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-accent-red mb-10 font-heading">Trusted By Leading Organizations</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 text-primary-text text-lg font-body">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ delay: 0.1 }}>New Life Covenant Church</motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ delay: 0.2 }}>Government Ministries</motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ delay: 0.3 }}>Mother Touch Schools</motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ delay: 0.4 }}>Kefalos / Ironblock</motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ delay: 0.5 }}>Kingswood Contracting</motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ delay: 0.6 }}>Residential Estates</motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-secondary-bg py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="text-3xl sm:text-4xl font-bold text-center text-accent-red mb-12 font-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            What Our Clients Say
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Saul Murira",
                role: "Technical Supervisor",
                company: "Kingswood Contracting",
                quote: "Admill Systems transformed our site security with state-of-the-art CCTV and access control. Their professionalism and technical expertise are unmatched.",
                rating: 5
              },
              {
                name: "Pastor John Sibanda",
                role: "Senior Pastor",
                company: "Religious Organization",
                quote: "The biometric attendance system has streamlined our operations significantly. The team was courteous, efficient, and delivered beyond expectations.",
                rating: 5
              },
              {
                name: "Mrs. J. Matengu",
                role: "School Administrator",
                company: "Mother Touch Schools",
                quote: "Our campus network infrastructure is now world-class thanks to Admill. Students and staff enjoy seamless connectivity across all buildings.",
                rating: 5
              }
            ].map((testimonial, idx) => (
              <motion.div
                key={idx}
                className="bg-primary-bg p-8 rounded-xl shadow-md border border-border-light"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <div className="flex mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-accent-red text-xl">★</span>
                  ))}
                </div>
                <p className="text-primary-text italic mb-6 font-body leading-relaxed">
                  "{testimonial.quote}"
                </p>
                <div className="border-t border-border-light pt-4">
                  <p className="font-semibold text-primary-text font-heading">{testimonial.name}</p>
                  <p className="text-sm text-muted-text">{testimonial.role}</p>
                  <p className="text-sm text-accent-red font-semibold">{testimonial.company}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-primary-bg py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            className="text-3xl sm:text-4xl font-bold text-center text-accent-red mb-12 font-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            Frequently Asked Questions
          </motion.h2>
          <div className="space-y-4">
            {[
              {
                q: "How long does a typical security system installation take?",
                a: "Installation timeframes vary based on project scope. A standard residential system takes 1-2 days, while commercial installations typically require 3-7 days. We provide detailed timelines during our free consultation."
              },
              {
                q: "Do you offer 24/7 monitoring and support?",
                a: "Yes! Our cloud monitoring service provides 24/7 system health diagnostics with real-time alerts. We also offer dedicated technical support during business hours and emergency response for critical issues."
              },
              {
                q: "What brands and technologies do you use?",
                a: "We work with industry-leading brands including Hikvision, Dahua, ZKTeco, Mikrotik, and Ubiquiti. We select equipment based on your specific needs, ensuring reliability and future-proof technology."
              },
              {
                q: "Can I access my security system remotely?",
                a: "Absolutely. All our modern systems include mobile app access, allowing you to view live feeds, control access points, and receive alerts from anywhere in the world via smartphone or computer."
              },
              {
                q: "What maintenance is required for security systems?",
                a: "We recommend quarterly inspections for commercial systems and bi-annual checks for residential installations. We offer flexible maintenance contracts that include cleaning, software updates, and component testing."
              },
              {
                q: "Do you provide warranties and guarantees?",
                a: "Yes. All installations include a 12-month workmanship warranty. Equipment comes with manufacturer warranties ranging from 2-5 years. We also offer extended warranty packages for added peace of mind."
              }
            ].map((faq, idx) => (
              <FAQItem key={idx} question={faq.q} answer={faq.a} index={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* Dedicated Call to Action Section */}
      <section className="bg-accent-red py-20 px-6 text-primary-bg text-center">
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 font-heading">Ready to Secure Your Future?</h2>
          <p className="text-lg md:text-xl mb-10 font-body">
            Connect with Admill Systems today to discuss your unique security and IT needs.
          </p>
          <a
            href="#contact"
            className="inline-block bg-primary-bg text-accent-red text-xl font-semibold px-10 py-4 rounded-full hover:bg-opacity-90 transition duration-300 shadow-lg"
          >
            Get a Free Consultation
          </a>
        </motion.div>
      </section>

      {/* Contact Section - Map Placeholder comment added */}
      <section id="contact" className="bg-secondary-bg px-6 py-20">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-accent-red mb-6 font-heading">Get in Touch</h2>
            <p className="text-primary-text mb-6 font-body">
              We're here to help you design and implement the perfect security solution. Reach out to our team:
            </p>
            <div className="space-y-4 text-primary-text font-body">
              <p><strong>Email:</strong> <a href="mailto:info@admill.co.zw" className="text-accent-red hover:underline">info@admill.co.zw</a></p>
              <p><strong>Phone:</strong> <a href="tel:+263715017744" className="text-accent-red hover:underline">+263 715 017 744</a></p>
              <p><strong>Address:</strong> Hogerty Hill, Harare, Zimbabwe</p>
              <p><strong>Office Hours:</strong> Mon-Fri, 9 AM - 5 PM CAT</p>
              {/* For the map, you would typically embed a Google Maps iframe or use a React map library. */}
              {/* Example: <iframe src="YOUR_Maps_EMBED_URL" width="100%" height="250" style="border:0;" allowFullScreen="" loading="lazy"></iframe> */}
              <div className="w-full h-48 bg-muted-text/10 rounded-lg flex items-center justify-center text-muted-text mt-6">ADMILL</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold text-primary-text mb-6 font-heading">Send Us a Message</h3>
            <form
  className="grid gap-4 text-left"
  onSubmit={async (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();
    const honeypot = form.honeypot.value;
    const timestamp = form.timestamp.value || String(formTimestamp);

    console.log("📩 Submitting form:", { name, email, message });

    // Track event in Matomo
    if (typeof window !== "undefined" && window._mtm) {
      window._mtm.push({
        event: "formSubmission",
        formName: "Contact Form",
      });
      console.log("✅ Matomo tracking sent");
    }

    setIsSubmitting(true);
    try {
      // POST to Node.js API server (proxied by nginx at /api/)
      const apiUrl = "https://admill.co.zw/api/contact";
      console.log("🌐 Sending request to:", apiUrl);

      // POST to your server's API folder
      const res = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({ name, email, message, honeypot, timestamp }),
      });

      console.log("📡 Response status:", res.status);

      // Try to parse response
      let responseData;
      try {
        responseData = await res.json();
        console.log("📦 Response data:", responseData);
      } catch (parseError) {
        console.warn("⚠️ Could not parse JSON response:", parseError);
        const textResponse = await res.text();
        console.log("📄 Raw response:", textResponse);
      }

      if (res.ok) {
        alert("✅ Your message has been sent.");
        e.target.reset();
      } else {
        console.error("❌ Server error:", res.status, responseData);
        alert(`❌ Failed to send your message. Server returned: ${res.status}`);
      }
    } catch (err) {
      console.error("🔥 Error submitting form:", err);
      console.error("Error details:", {
        message: err.message,
        name: err.name,
        stack: err.stack
      });
      alert(`⚠️ Error sending your message: ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  }}
>
  {/* Honeypot and timing fields for spam prevention */}
  <input
    type="text"
    name="honeypot"
    tabIndex={-1}
    autoComplete="off"
    className="hidden"
    aria-hidden="true"
  />
  <input type="hidden" name="timestamp" value={formTimestamp} />

  <input
    type="text"
    name="name"
    minLength={2}
    maxLength={50}
    placeholder="Your Name"
    required
    className="bg-primary-bg border border-border-light px-4 py-3 rounded-md text-primary-text placeholder-muted-text w-full focus:outline-none focus:ring-2 focus:ring-accent-red"
  />
  <input
    type="email"
    name="email"
    placeholder="Your Email"
    required
    className="bg-primary-bg border border-border-light px-4 py-3 rounded-md text-primary-text placeholder-muted-text w-full focus:outline-none focus:ring-2 focus:ring-accent-red"
  />
  <textarea
    name="message"
    minLength={10}
    maxLength={1000}
    placeholder="Message"
    rows="5"
    required
    className="bg-primary-bg border border-border-light px-4 py-3 rounded-md text-primary-text placeholder-muted-text w-full focus:outline-none focus:ring-2 focus:ring-accent-red"
  ></textarea>
  <button
    type="submit"
    disabled={!canSubmit || isSubmitting}
    aria-disabled={!canSubmit || isSubmitting}
    className={`bg-accent-red transition-colors duration-300 px-8 py-3 rounded-full text-primary-bg font-semibold shadow-lg ${(!canSubmit || isSubmitting) ? 'opacity-60 cursor-not-allowed' : 'hover:bg-opacity-80'}`}
  >
    {isSubmitting ? 'Sending…' : (!canSubmit ? 'Please wait…' : 'Send Message')}
  </button>
</form>

          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary-bg text-primary-text py-12 px-6 border-t border-border-light">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex flex-col items-start">
            <NextImage
              src="/logo-02.png"
              alt="Admill Systems - Trusted Security Solutions Provider in Zimbabwe"
              width={60}
              height={50}
              className="mb-4"
            />
            <p className="text-sm text-muted-text mb-2 font-body">
              Innovating security and IT solutions for a connected world.
            </p>
            <p className="text-sm text-muted-text font-body">
              &copy; {new Date().getFullYear()} Admill Systems.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-primary-text mb-4 font-heading">Quick Links</h4>
            <ul className="space-y-2 text-sm font-body">
              <li><a href="#about" className="hover:text-accent-red transition-colors duration-300">About Us</a></li>
              <li><a href="#services" className="hover:text-accent-red transition-colors duration-300">Our Solutions</a></li>
              <li><a href="#clients" className="hover:text-accent-red transition-colors duration-300">Our Clients</a></li>
              <li><a href="#" className="hover:text-accent-red transition-colors duration-300">Insights</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-primary-text mb-4 font-heading">Contact</h4>
            <ul className="space-y-2 text-sm font-body">
              <li><a href="mailto:info@admill.co.zw" className="hover:text-accent-red transition-colors duration-300">info@admill.co.zw</a></li>
              <li><a href="tel:+263784319436" className="hover:text-accent-red transition-colors duration-300">+263 715 017 744</a></li>
              <li>Hogerty Hill</li>
              <li>Harare, Zimbabwe</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-primary-text mb-4 font-heading">Connect With Us</h4>
            <div className="flex space-x-4 text-primary-text text-2xl">
              <a href="#" aria-label="LinkedIn" className="hover:text-accent-red transition-colors duration-300">in</a>
              <a href="#" aria-label="Facebook" className="hover:text-accent-red transition-colors duration-300">fb</a>
              <a href="#" aria-label="Twitter" className="hover:text-accent-red transition-colors duration-300">tw</a>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center text-xs text-muted-text font-body">
          Designed for a secure world.
        </div>
      </footer>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollToTop && (
          <motion.button
            className="fixed bottom-6 right-6 bg-accent-red text-primary-bg p-4 rounded-full shadow-lg z-50 focus:outline-none focus:ring-2 focus:ring-accent-red focus:ring-offset-2 focus:ring-offset-primary-bg"
            onClick={scrollToTop}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={scrollToTopVariants}
            aria-label="Scroll to top"
          >
            <FiArrowUp className="text-2xl" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
