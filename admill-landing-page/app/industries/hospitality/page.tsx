import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Electrical & Building Systems for Hospitality in Zimbabwe",
  description: "Electrical, BMS, energy, access control, CCTV and building systems for hotels and hospitality facilities in Zimbabwe.",
  alternates: { canonical: "/industries/hospitality" },
};

const areas = ["Electrical and backup power", "BMS and HVAC controls", "Energy monitoring", "Access control", "CCTV and security", "Building systems integration"];

export default function HospitalityPage() {
  return (
    <main className="min-h-screen bg-white text-neutral-900">
      <section className="bg-neutral-950 px-6 py-24 text-white"><div className="mx-auto max-w-6xl"><p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-400">Hospitality</p><h1 className="mt-5 max-w-4xl text-4xl font-bold md:text-6xl">Facility systems that support guest experience and operational efficiency.</h1><p className="mt-7 max-w-3xl text-lg leading-8 text-neutral-300">Admill integrates power, building automation, energy monitoring and security systems for hotels, lodges and hospitality facilities.</p><Link href="/#contact" className="mt-9 inline-block rounded-md bg-red-600 px-6 py-3 font-semibold">Discuss a Hospitality Project</Link></div></section>
      <section className="px-6 py-20"><div className="mx-auto max-w-6xl"><h2 className="text-3xl font-bold">Relevant systems</h2><div className="mt-8 grid gap-4 md:grid-cols-3">{areas.map((x) => <div key={x} className="border border-neutral-200 p-6 font-semibold">{x}</div>)}</div></div></section>
      <section className="bg-neutral-50 px-6 py-20"><div className="mx-auto max-w-6xl"><h2 className="text-3xl font-bold">Comfort, security and energy are connected.</h2><p className="mt-5 max-w-3xl text-lg leading-8 text-neutral-600">Hospitality facilities depend on HVAC, power, access and security systems working reliably together. We focus on the engineering interfaces that make the facility easier to operate and maintain.</p></div></section>
      <section className="px-6 py-20"><div className="mx-auto max-w-6xl rounded-2xl bg-neutral-950 p-8 text-white md:p-12"><h2 className="text-3xl font-bold">Upgrading a hotel or lodge?</h2><p className="mt-4 max-w-2xl text-neutral-300">Share the property, existing infrastructure and project objectives and we can help scope the engineering requirement.</p><Link href="/#contact" className="mt-7 inline-block rounded-md bg-red-600 px-6 py-3 font-semibold">Request Engineering Consultation</Link></div></section>
    </main>
  );
}
