import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Power & Energy Systems in Zimbabwe",
  description: "Generator, ATS, solar PV, energy monitoring and resilient power systems for commercial, industrial and institutional facilities in Zimbabwe.",
  alternates: { canonical: "/solutions/power-energy" },
};

const services = ["Generator systems", "Automatic transfer systems", "Solar PV and hybrid energy", "Energy monitoring", "Power resilience planning", "Testing and commissioning"];

export default function PowerEnergyPage() {
  return (
    <main className="min-h-screen bg-white text-neutral-900">
      <section className="bg-neutral-950 px-6 py-24 text-white"><div className="mx-auto max-w-6xl">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-400">Power & Energy</p>
        <h1 className="mt-5 max-w-4xl text-4xl font-bold md:text-6xl">Keep critical facilities powered when reliability matters.</h1>
        <p className="mt-7 max-w-3xl text-lg leading-8 text-neutral-300">We engineer backup power, transfer, solar and energy monitoring systems around the operational requirements of the facility—not just individual pieces of equipment.</p>
        <Link href="/#contact" className="mt-9 inline-block rounded-md bg-red-600 px-6 py-3 font-semibold">Discuss a Power Project</Link>
      </div></section>
      <section className="px-6 py-20"><div className="mx-auto max-w-6xl">
        <h2 className="text-3xl font-bold">Power systems we deliver</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">{services.map((item) => <div key={item} className="border border-neutral-200 p-6"><h3 className="font-semibold">{item}</h3><p className="mt-2 text-sm leading-6 text-neutral-600">Engineering, integration and commissioning for commercial, industrial and institutional environments.</p></div>)}</div>
      </div></section>
      <section className="bg-neutral-50 px-6 py-20"><div className="mx-auto max-w-6xl"><h2 className="text-3xl font-bold">Power is part of the wider system.</h2><p className="mt-5 max-w-3xl text-lg leading-8 text-neutral-600">Generator and ATS status, energy meters and critical alarms can be integrated with building management, monitoring and automation platforms for better visibility and response.</p></div></section>
      <section className="px-6 py-20"><div className="mx-auto max-w-6xl rounded-2xl bg-neutral-950 p-8 text-white md:p-12"><h2 className="text-3xl font-bold">Need resilient power for a new or existing facility?</h2><p className="mt-4 max-w-2xl text-neutral-300">Tell us about the load, operating environment and reliability requirements and we can help define the engineering scope.</p><Link href="/#contact" className="mt-7 inline-block rounded-md bg-red-600 px-6 py-3 font-semibold">Request Engineering Consultation</Link></div></section>
    </main>
  );
}
