import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Electrical & Building Systems for Healthcare in Zimbabwe",
  description: "Critical power, building automation, security, monitoring and life-safety systems for healthcare facilities in Zimbabwe.",
  alternates: { canonical: "/industries/healthcare" },
};

const areas = ["Critical and backup power", "Electrical monitoring", "BMS and HVAC controls", "Access control and security", "Fire and life safety interfaces", "Systems integration"];

export default function HealthcarePage() {
  return (
    <main className="min-h-screen bg-white text-neutral-900">
      <section className="bg-neutral-950 px-6 py-24 text-white"><div className="mx-auto max-w-6xl"><p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-400">Healthcare</p><h1 className="mt-5 max-w-4xl text-4xl font-bold md:text-6xl">Reliable facility systems for environments where continuity matters.</h1><p className="mt-7 max-w-3xl text-lg leading-8 text-neutral-300">Admill supports healthcare facilities with electrical, backup power, building automation, security and life-safety system integration.</p><Link href="/#contact" className="mt-9 inline-block rounded-md bg-red-600 px-6 py-3 font-semibold">Discuss a Healthcare Project</Link></div></section>
      <section className="px-6 py-20"><div className="mx-auto max-w-6xl"><h2 className="text-3xl font-bold">Capability areas</h2><div className="mt-8 grid gap-4 md:grid-cols-3">{areas.map((x) => <div key={x} className="border border-neutral-200 p-6 font-semibold">{x}</div>)}</div></div></section>
      <section className="bg-neutral-50 px-6 py-20"><div className="mx-auto max-w-6xl"><h2 className="text-3xl font-bold">Designed around critical operations.</h2><p className="mt-5 max-w-3xl text-lg leading-8 text-neutral-600">Healthcare facilities have overlapping requirements for power resilience, environmental control, security and emergency response. Our systems-integration approach focuses on the interfaces between those systems.</p></div></section>
      <section className="px-6 py-20"><div className="mx-auto max-w-6xl rounded-2xl bg-neutral-950 p-8 text-white md:p-12"><h2 className="text-3xl font-bold">Planning a healthcare facility project?</h2><p className="mt-4 max-w-2xl text-neutral-300">Tell us about the existing infrastructure or new-build requirements and we can help define the engineering scope.</p><Link href="/#contact" className="mt-7 inline-block rounded-md bg-red-600 px-6 py-3 font-semibold">Request Engineering Consultation</Link></div></section>
    </main>
  );
}
