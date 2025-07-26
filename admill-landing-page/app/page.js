import React from "react";

export default function HomePage() {
  return (
    <>
        {/* Slim Navigation */}
        <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-8 py-4 backdrop-blur-sm bg-black/60 border-b border-white/10">
          <div className="text-lg font-semibold text-white">Admill</div>
          <div className="space-x-6 text-sm">
            <a href="#about" className="hover:text-red-500 transition">About</a>
            <a href="#services" className="hover:text-red-500 transition">Services</a>
            <a href="#clients" className="hover:text-red-500 transition">Clients</a>
            <a href="#contact" className="hover:text-red-500 transition">Contact</a>
          </div>
        </nav>

        {/* Hero Section */}
        <section
          className="h-screen w-full bg-cover bg-center flex items-center justify-center text-center px-6"
          style={{ backgroundImage: "url('/hero-security.jpg')" }}
        >
          <div className="bg-black/60 p-10 rounded-xl max-w-2xl">
            <h1 className="text-4xl sm:text-6xl font-bold leading-tight mb-6">Secure by Design</h1>
            <p className="text-lg text-gray-300 mb-8">Shaping smarter, safer environments with elegant electronic security and IT solutions.</p>
            <div className="flex justify-center gap-4">
              <a href="#services" className="bg-red-700 hover:bg-red-800 transition px-6 py-3 rounded-full text-white font-semibold">Our Services</a>
              <a href="#contact" className="border border-white px-6 py-3 rounded-full hover:bg-white hover:text-black transition font-semibold">Talk to Us</a>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="px-6 py-20 max-w-5xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-red-600 mb-6">We Are Admill</h2>
          <p className="text-gray-300 text-lg leading-relaxed">
            We blend elegant technology with strategic design to build integrated security environments. From smart surveillance to intelligent access control,
            our systems are designed for scale, precision, and peace of mind.
          </p>
        </section>

        {/* Services Section */}
        <section id="services" className="bg-gray-950 py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-center text-red-600 mb-12">What We Offer</h2>
            <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-8">
              {[
                { title: "Smart Surveillance", desc: "AI-powered CCTV with facial recognition, remote access & analytics." },
                { title: "Access Control", desc: "Biometric, RFID, and card-based systems for secure entry." },
                { title: "Alarm Systems", desc: "Silent intrusion detection for commercial and residential sites." },
                { title: "Network Solutions", desc: "Structured cabling, wireless, and enterprise-grade network infrastructure." },
                { title: "Cloud Monitoring", desc: "Real-time alerts and 24/7 system health diagnostics from anywhere." },
                { title: "Workforce Tracking", desc: "Track attendance with portable, biometric rugged devices." }
              ].map((item, idx) => (
                <div key={idx} className="bg-gray-800 p-6 rounded-xl shadow-lg border border-white/10 hover:scale-[1.02] transition">
                  <h3 className="text-xl font-semibold mb-2 text-white">{item.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Clients Section */}
        <section id="clients" className="px-6 py-20 max-w-6xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-red-600 mb-10">Trusted By</h2>
          <div className="grid sm:grid-cols-3 gap-6 text-gray-300 text-lg">
            <div>New Life Covenant Church</div>
            <div>Government Ministries</div>
            <div>Mother Touch Schools</div>
            <div>Kefalos / Ironblock</div>
            <div>Kingswood Contracting</div>
            <div>Residential Estates</div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="bg-gray-950 px-6 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-red-600 mb-6">Let’s Talk</h2>
            <p className="text-gray-400 mb-6">Get in touch with our specialists to secure your environment today.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-10">
              <a
                href="mailto:info@admill.co.zw"
                className="bg-red-700 hover:bg-red-800 transition px-6 py-3 rounded-full text-white font-semibold"
              >
                Email Us
              </a>
              <a
                href="https://wa.me/263784319436"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-white px-6 py-3 rounded-full hover:bg-white hover:text-black transition font-semibold"
              >
                Chat on WhatsApp
              </a>
            </div>
            <form className="grid gap-4 text-left">
              <input type="text" placeholder="Your Name" className="bg-gray-800 px-4 py-3 rounded text-white placeholder-gray-500 w-full" />
              <input type="email" placeholder="Your Email" className="bg-gray-800 px-4 py-3 rounded text-white placeholder-gray-500 w-full" />
              <textarea placeholder="Message" rows="4" className="bg-gray-800 px-4 py-3 rounded text-white placeholder-gray-500 w-full"></textarea>
              <button type="submit" className="bg-red-700 hover:bg-red-800 transition px-6 py-3 rounded-full text-white font-semibold">Send Message</button>
            </form>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-black text-gray-500 text-sm text-center py-6">
          &copy; {new Date().getFullYear()} Admill Systems · Designed for a secure world · Harare, Zimbabwe
        </footer>
      
    </>
  );
}
