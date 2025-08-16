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
              alt="Admill Systems Logo"
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
              Get a Quote
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
                  Get a Quote
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
            <span className="text-accent-red">Secure by Design.</span> <br />
            Intelligent Solutions for a Complex World.
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-muted-text mb-8 max-w-2xl mx-auto font-body"
            variants={fadeInUp}
          >
            Admill Systems delivers premium, design-led electronic security and IT services for forward-thinking businesses and institutions.
          </motion.p>
          <motion.div className="flex justify-center gap-4" variants={fadeInUp}>
            <motion.a
              href="#services"
              className="inline-block bg-accent-red text-primary-bg text-lg md:text-xl font-semibold px-8 py-3 rounded-full hover:bg-opacity-80 transition duration-300 shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Our Solutions
            </motion.a>
            <motion.a
              href="#contact"
              className="inline-block border border-primary-text text-primary-text text-lg md:text-xl px-8 py-3 rounded-full hover:bg-primary-text hover:text-primary-bg transition duration-300 font-semibold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Talk to Us
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
              alt="Modern Security Technology"
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
            <h2 className="text-3xl sm:text-4xl font-bold text-accent-red mb-6 font-heading">We Are Admill</h2>
            <p className="text-primary-text text-lg leading-relaxed mb-4 font-body">
              Admill Systems stands at the forefront of integrated electronic security and IT services. We blend sophisticated technology with elegant design, ensuring robust protection and seamless operation for modern businesses.
            </p>
            <p className="text-muted-text leading-relaxed font-body">
              Our approach is holistic – from initial consultation and bespoke system design to flawless installation and ongoing support. We are committed to building secure environments that empower, rather than restrict.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="bg-secondary-bg py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-accent-red mb-12 font-heading">What We Offer</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {[
              { id: 1, title: "Smart Surveillance", desc: "AI-powered CCTV with facial recognition, remote access & analytics.", icon: <FiShield /> },
              { id: 2, title: "Access Control", desc: "Biometric, RFID, and card-based systems for secure entry.", icon: <FiKey /> },
              { id: 3, title: "Alarm Systems", desc: "Silent intrusion detection for commercial and residential sites.", icon: <FiBell /> },
              { id: 4, title: "Network Solutions", desc: "Structured cabling, wireless, and enterprise-grade network infrastructure.", icon: <FiWifi /> },
              { id: 5, title: "Cloud Monitoring", desc: "Real-time alerts and 24/7 system health diagnostics from anywhere.", icon: <FiCloud /> },
              { id: 6, title: "Workforce Tracking", desc: "Track attendance with portable, biometric rugged devices.", icon: <FiUserCheck /> }
            ].map((item, idx) => (
              <motion.div
                key={item.id}
                className="bg-primary-bg p-8 rounded-xl shadow-md border border-border-light hover:shadow-lg hover:scale-[1.02] transition-all duration-300 flex flex-col items-start"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <div className="text-4xl text-accent-red mb-4">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-primary-text font-heading">{item.title}</h3>
                <p className="text-base text-muted-text leading-relaxed font-body">{item.desc}</p>
              </motion.div>
            ))}
          </div>
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
                  alt="Large Commercial Complex Security"
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
                  alt="Government Ministry Building"
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
                  alt="Educational Campus Network"
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
            <form className="grid gap-4 text-left">
              <input type="text" placeholder="Your Name" className="bg-primary-bg border border-border-light px-4 py-3 rounded-md text-primary-text placeholder-muted-text w-full focus:outline-none focus:ring-2 focus:ring-accent-red" />
              <input type="email" placeholder="Your Email" className="bg-primary-bg border border-border-light px-4 py-3 rounded-md text-primary-text placeholder-muted-text w-full focus:outline-none focus:ring-2 focus:ring-accent-red" />
              <textarea placeholder="Message" rows="5" className="bg-primary-bg border border-border-light px-4 py-3 rounded-md text-primary-text placeholder-muted-text w-full focus:outline-none focus:ring-2 focus:ring-accent-red"></textarea>
              <button type="submit" className="bg-accent-red hover:bg-opacity-80 transition-colors duration-300 px-8 py-3 rounded-full text-primary-bg font-semibold shadow-lg">Send Message</button>
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
              alt="Admill Systems Logo"
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