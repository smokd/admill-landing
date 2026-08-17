// app/page.js
'use client';

import React, { useEffect, useState } from "react";
import NextImage from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { FiArrowRight, FiCheck, FiChevronDown, FiMenu, FiX } from "react-icons/fi";

const solutions = [
  {
    title: "Electrical Engineering",
    text: "Power distribution, LV systems, backup power, generators, ATS and electrical infrastructure for demanding facilities.",
    tags: ["LV Systems", "Generators", "ATS", "Power"]
  },
  {
    title: "Power & Energy",
    text: "Solar, energy monitoring and resilient power solutions designed around reliability, operating cost and continuity.",
    tags: ["Solar", "Energy Monitoring", "Backup Power"]
  },
  {
    title: "Building Automation & BMS",
    text: "Integrated building control for HVAC, energy, lighting and critical services using open building protocols.",
    tags: ["BMS", "BACnet", "KNX", "HVAC"]
  },
  {
    title: "Industrial Automation",
    text: "Control, monitoring and industrial communications for plants, production environments and critical processes.",
    tags: ["PLC", "SCADA", "Instrumentation"]
  },
  {
    title: "Electronic Security",
    text: "CCTV, access control, intrusion detection and perimeter systems engineered as part of the wider facility infrastructure.",
    tags: ["CCTV", "Access Control", "Intrusion"]
  },
  {
    title: "Systems Integration",
    text: "We connect independent electrical, mechanical, security and building systems into a coordinated operational environment.",
    tags: ["Integration", "BACnet/IP", "Modbus", "IP"]
  }
];

const industries = [
  ["Mining & Resources", "Resilient power, monitoring, security and automation for demanding operating environments."],
  ["Manufacturing", "Electrical infrastructure, automation, controls and monitoring for production facilities."],
  ["Commercial Buildings", "Integrated electrical, BMS, security and energy systems for modern facilities."],
  ["Healthcare", "Critical power, life safety, security and building systems where reliability matters."],
  ["Education", "Campus-wide power, connectivity, security, automation and monitoring solutions."],
  ["Hospitality", "Guest safety, access, BMS and energy systems engineered around operational efficiency."]
];

const process = [
  ["01", "Understand", "We define the operational problem, site constraints and project requirements."],
  ["02", "Engineer", "We develop the system architecture, equipment selection and implementation approach."],
  ["03", "Integrate", "Electrical, automation, security and building systems are designed to work together."],
  ["04", "Commission", "We test, configure, commission and hand over a working system with the required documentation."],
  ["05", "Support", "We provide ongoing maintenance, troubleshooting and lifecycle support."]
];

function FAQItem({ question, answer }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-border-light">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full py-5 flex items-center justify-between text-left font-semibold text-primary-text"
        aria-expanded={open}
      >
        <span>{question}</span>
        <FiChevronDown className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
            <p className="pb-5 text-muted-text leading-relaxed">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [formTimestamp, setFormTimestamp] = useState(0);
  const [canSubmit, setCanSubmit] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setFormTimestamp(Date.now());
    const timer = setTimeout(() => setCanSubmit(true), 2500);
    return () => clearTimeout(timer);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  async function submitForm(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = {
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      company: form.company.value.trim(),
      phone: form.phone.value.trim(),
      projectType: form.projectType.value,
      projectLocation: form.projectLocation.value.trim(),
      projectStage: form.projectStage.value,
      message: form.message.value.trim(),
      honeypot: form.honeypot.value,
      timestamp: form.timestamp.value
    };

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(data)
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.error || "Unable to send enquiry.");
      alert("Your project enquiry has been sent. Our team will be in touch.");
      form.reset();
    } catch (error) {
      console.error(error);
      alert(error.message || "Unable to send enquiry right now.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="bg-primary-bg text-primary-text">
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-border-light bg-primary-bg/95 backdrop-blur">
        <div className="max-w-7xl mx-auto px-5 lg:px-8 h-20 flex items-center justify-between">
          <a href="#top" aria-label="Admill Systems home">
            <NextImage src="/logo-02.png" alt="Admill Systems" width={58} height={48} priority className="h-11 w-auto" />
          </a>
          <nav className="hidden lg:flex items-center gap-8 text-sm font-semibold">
            <a href="#solutions" className="hover:text-accent-red">Solutions</a>
            <a href="#industries" className="hover:text-accent-red">Industries</a>
            <a href="#projects" className="hover:text-accent-red">Projects</a>
            <a href="#approach" className="hover:text-accent-red">Engineering</a>
            <a href="#contact" className="hover:text-accent-red">Contact</a>
          </nav>
          <a href="#contact" className="hidden md:inline-flex bg-accent-red text-white px-6 py-3 rounded-full font-semibold hover:opacity-90">Discuss a Project</a>
          <button type="button" className="lg:hidden text-2xl" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
        <AnimatePresence>
          {menuOpen && (
            <motion.nav initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="lg:hidden border-t border-border-light bg-primary-bg px-6 py-6 flex flex-col gap-5 font-semibold">
              {["solutions", "industries", "projects", "approach", "contact"].map((item) => (
                <a key={item} href={`#${item}`} onClick={closeMenu} className="capitalize">{item}</a>
              ))}
              <a href="#contact" onClick={closeMenu} className="bg-accent-red text-white text-center px-5 py-3 rounded-full">Discuss a Project</a>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      <main id="top">
        <section className="relative min-h-[760px] pt-20 flex items-center overflow-hidden">
          <div className="absolute inset-0">
            <video className="w-full h-full object-cover" src="/security-hero.mp4" autoPlay loop muted playsInline preload="metadata" poster="/hero-security.jpg" aria-hidden="true" />
            <div className="absolute inset-0 bg-white/85 md:bg-white/78" />
          </div>
          <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-24 w-full">
            <div className="max-w-4xl">
              <p className="text-accent-red font-bold uppercase tracking-[0.22em] text-sm mb-6">Electrical • Automation • Building Systems • Integration</p>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.02] tracking-tight mb-7">
                Engineering the systems behind <span className="text-accent-red">resilient, intelligent facilities.</span>
              </h1>
              <p className="text-xl lg:text-2xl text-muted-text max-w-3xl leading-relaxed mb-9">
                Admill Systems designs, integrates and commissions electrical, energy, building automation, industrial control and electronic security systems for commercial, industrial and institutional facilities in Zimbabwe.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <a href="#contact" className="inline-flex justify-center items-center gap-2 bg-accent-red text-white px-8 py-4 rounded-full font-bold text-lg hover:opacity-90">Discuss a Project <FiArrowRight /></a>
                <a href="#projects" className="inline-flex justify-center items-center gap-2 border border-primary-text px-8 py-4 rounded-full font-bold text-lg hover:bg-primary-text hover:text-white">View Our Work</a>
              </div>
              <div className="flex flex-wrap gap-x-7 gap-y-3 text-sm font-semibold">
                {['Design & Engineering', 'Systems Integration', 'Testing & Commissioning', 'Lifecycle Support'].map(item => <span key={item} className="flex items-center gap-2"><FiCheck className="text-accent-red" />{item}</span>)}
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-border-light bg-secondary-bg py-14">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 grid md:grid-cols-3 gap-10">
            <div><p className="text-accent-red font-bold uppercase tracking-widest text-xs mb-2">Engineering partner</p><h2 className="text-2xl font-bold">One partner across multiple systems.</h2></div>
            <p className="text-muted-text leading-relaxed">Complex facilities rarely have one problem. Power, controls, security, HVAC, networking and monitoring have to operate together. Our role is to engineer that relationship.</p>
            <p className="text-muted-text leading-relaxed">From a new installation to an existing facility upgrade, we focus on reliable infrastructure, clear documentation and commissioning—not simply equipment installation.</p>
          </div>
        </section>

        <section id="solutions" className="py-24">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="max-w-3xl mb-14"><p className="text-accent-red font-bold uppercase tracking-widest text-sm mb-3">Core capabilities</p><h2 className="text-4xl lg:text-5xl font-bold mb-5">Engineering solutions built around the facility.</h2><p className="text-lg text-muted-text">We combine electrical, electronic and control disciplines to deliver infrastructure that is designed to work as a system.</p></div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border-light border border-border-light">
              {solutions.map((solution) => (
                <article key={solution.title} className="bg-primary-bg p-8 lg:p-9 hover:bg-secondary-bg transition-colors">
                  <div className="w-10 h-1 bg-accent-red mb-7" />
                  <h3 className="text-2xl font-bold mb-4">{solution.title}</h3>
                  <p className="text-muted-text leading-relaxed mb-7">{solution.text}</p>
                  <div className="flex flex-wrap gap-2">{solution.tags.map(tag => <span key={tag} className="text-xs font-semibold border border-border-light px-3 py-1.5 rounded-full">{tag}</span>)}</div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="industries" className="bg-primary-text text-white py-24">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="max-w-3xl mb-14"><p className="text-accent-red font-bold uppercase tracking-widest text-sm mb-3">Industries</p><h2 className="text-4xl lg:text-5xl font-bold mb-5">Built for environments where reliability matters.</h2><p className="text-white/65 text-lg">Our approach adapts to the operational, safety and continuity requirements of each facility.</p></div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
              {industries.map(([title, text]) => <article key={title} className="border-t border-white/20 pt-6"><h3 className="text-xl font-bold mb-3">{title}</h3><p className="text-white/60 leading-relaxed">{text}</p></article>)}
            </div>
          </div>
        </section>

        <section id="approach" className="py-24 bg-secondary-bg">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="max-w-3xl mb-14"><p className="text-accent-red font-bold uppercase tracking-widest text-sm mb-3">Engineering approach</p><h2 className="text-4xl lg:text-5xl font-bold mb-5">From concept to commissioning.</h2><p className="text-lg text-muted-text">The value is not only in the equipment. It is in the engineering, integration and commissioning that makes the complete installation dependable.</p></div>
            <div className="grid md:grid-cols-5 gap-px bg-border-light border border-border-light">
              {process.map(([number, title, text]) => <div key={number} className="bg-primary-bg p-7"><span className="text-accent-red font-bold text-sm">{number}</span><h3 className="text-xl font-bold mt-5 mb-3">{title}</h3><p className="text-sm text-muted-text leading-relaxed">{text}</p></div>)}
            </div>
          </div>
        </section>

        <section id="projects" className="py-24">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14"><div><p className="text-accent-red font-bold uppercase tracking-widest text-sm mb-3">Project evidence</p><h2 className="text-4xl lg:text-5xl font-bold">Show the engineering. Not just the equipment.</h2></div><p className="max-w-xl text-muted-text leading-relaxed">We are building a technical project library covering the scope, technologies, challenges and outcomes of completed work.</p></div>
            <div className="grid md:grid-cols-3 gap-7">
              {[
                ["Commercial Facilities", "Integrated security, networking and building systems for multi-building environments.", "/turn.png"],
                ["Institutional Infrastructure", "Campus infrastructure combining connectivity, security and operational systems.", "/board.webp"],
                ["Systems Integration", "Connecting independent systems into a coordinated operational environment.", "/mtgs.jpg"]
              ].map(([title, text, image]) => <article key={title} className="border border-border-light overflow-hidden bg-primary-bg"><div className="relative h-56 bg-secondary-bg"><NextImage src={image} alt={title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" /></div><div className="p-7"><p className="text-accent-red text-xs uppercase font-bold tracking-widest mb-3">Case study</p><h3 className="text-2xl font-bold mb-3">{title}</h3><p className="text-muted-text leading-relaxed">{text}</p></div></article>)}
            </div>
          </div>
        </section>

        <section className="bg-secondary-bg py-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-wrap gap-3 items-center"><span className="font-bold mr-3">Technologies & protocols</span>{['BACnet/IP', 'KNX', 'Modbus', 'PLC', 'SCADA', 'BMS', 'IP Networking', 'CCTV', 'Access Control'].map(item => <span key={item} className="border border-border-light bg-primary-bg px-4 py-2 rounded-full text-sm font-semibold">{item}</span>)}</div>
        </section>

        <section className="py-24">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <p className="text-accent-red font-bold uppercase tracking-widest text-sm mb-3">Technical questions</p><h2 className="text-4xl font-bold mb-10">Frequently asked questions</h2>
            <div>{[
              ["Can you integrate existing building systems?", "Yes. We can assess existing infrastructure and design an integration approach around supported equipment and protocols."],
              ["Do you provide design and commissioning?", "Our approach covers engineering, implementation, testing and commissioning, with project scope defined around the requirements."],
              ["Can you integrate third-party equipment?", "Where equipment exposes suitable interfaces or protocols, integration can be designed around the existing installation."],
              ["Do you work with consulting engineers and EPC contractors?", "Yes. We can support project teams with specialist engineering, systems integration, installation and commissioning scopes."],
              ["Do you provide maintenance and lifecycle support?", "Yes. Support can be structured around preventive maintenance, troubleshooting, system health and ongoing technical requirements."]
            ].map(([q, a]) => <FAQItem key={q} question={q} answer={a} />)}</div>
          </div>
        </section>

        <section id="contact" className="bg-primary-text text-white py-24">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-16">
            <div>
              <p className="text-accent-red font-bold uppercase tracking-widest text-sm mb-3">Start a project</p>
              <h2 className="text-4xl lg:text-5xl font-bold mb-6">Have a complex project? Let's engineer it.</h2>
              <p className="text-white/65 text-lg leading-relaxed mb-8">Tell us what you are building, upgrading or trying to solve. We will use the information to understand the opportunity before discussing scope.</p>
              <div className="space-y-3 text-white/75"><p><strong className="text-white">Harare, Zimbabwe</strong></p><p><a href="mailto:info@admill.co.zw" className="hover:text-white">info@admill.co.zw</a></p><p><a href="tel:+263715017744" className="hover:text-white">+263 715 017 744</a></p></div>
            </div>
            <form onSubmit={submitForm} className="bg-white text-primary-text p-7 md:p-9 grid gap-4" aria-label="Project enquiry form">
              <input type="text" name="honeypot" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
              <input type="hidden" name="timestamp" value={formTimestamp} />
              <div className="grid md:grid-cols-2 gap-4"><input name="name" required minLength={2} maxLength={100} placeholder="Your name *" className="border border-border-light px-4 py-3 rounded-md" /><input name="company" maxLength={150} placeholder="Company" className="border border-border-light px-4 py-3 rounded-md" /></div>
              <div className="grid md:grid-cols-2 gap-4"><input name="email" type="email" required maxLength={254} placeholder="Email *" className="border border-border-light px-4 py-3 rounded-md" /><input name="phone" maxLength={50} placeholder="Phone / WhatsApp" className="border border-border-light px-4 py-3 rounded-md" /></div>
              <div className="grid md:grid-cols-2 gap-4"><select name="projectType" className="border border-border-light px-4 py-3 rounded-md"><option value="">Project type</option>{['Electrical Engineering','Power & Energy','Generator / ATS','BMS / Building Automation','Industrial Automation','Electronic Security','Fire & Life Safety','Systems Integration','Other'].map(x => <option key={x}>{x}</option>)}</select><select name="projectStage" className="border border-border-light px-4 py-3 rounded-md"><option value="">Project stage</option>{['Concept','Design','Tender','Construction','Existing Facility Upgrade','Maintenance','Other'].map(x => <option key={x}>{x}</option>)}</select></div>
              <input name="projectLocation" maxLength={150} placeholder="Project location" className="border border-border-light px-4 py-3 rounded-md" />
              <textarea name="message" required minLength={10} maxLength={5000} rows={6} placeholder="Tell us about the project, problem or requirement *" className="border border-border-light px-4 py-3 rounded-md" />
              <button type="submit" disabled={!canSubmit || isSubmitting} className="bg-accent-red text-white px-6 py-4 rounded-full font-bold disabled:opacity-60">{isSubmitting ? "Sending…" : !canSubmit ? "Please wait…" : "Send Project Enquiry"}</button>
            </form>
          </div>
        </section>
      </main>

      <footer className="bg-primary-bg border-t border-border-light py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid md:grid-cols-3 gap-8"><div><NextImage src="/logo-02.png" alt="Admill Systems" width={58} height={48} className="h-10 w-auto mb-4" /><p className="text-sm text-muted-text max-w-sm">Electrical, electronic and building systems engineering and integration for commercial, industrial and institutional facilities.</p></div><div><h3 className="font-bold mb-4">Solutions</h3><p className="text-sm text-muted-text leading-7">Electrical Engineering<br />Power & Energy<br />BMS & Building Automation<br />Industrial Automation<br />Electronic Security<br />Systems Integration</p></div><div><h3 className="font-bold mb-4">Contact</h3><p className="text-sm text-muted-text leading-7">Hogerty Hill, Harare, Zimbabwe<br /><a href="mailto:info@admill.co.zw">info@admill.co.zw</a><br /><a href="tel:+263715017744">+263 715 017 744</a></p></div></div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 mt-10 pt-6 border-t border-border-light text-xs text-muted-text">© {new Date().getFullYear()} Admill Systems. All rights reserved.</div>
      </footer>
    </div>
  );
}
