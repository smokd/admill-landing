import type { Metadata } from "next";
import Link from "next/link";
import { RelatedSolutions } from "@/components/related-solutions";

export const metadata: Metadata = {
  title: "Electrical & Automation Engineering for Manufacturing in Zimbabwe",
  description: "Electrical infrastructure, industrial automation, control, energy monitoring and security integration for manufacturing facilities in Zimbabwe.",
  alternates: { canonical: "/industries/manufacturing" },
};

const areas = ["Electrical distribution", "PLC and industrial control", "SCADA and monitoring", "Power resilience", "Energy management", "Electronic security"];

export default function ManufacturingPage() {
  return (
    <main className="min-h-screen bg-white text-neutral-900">
      <section className="bg-neutral-950 px-6 py-24 text-white"><div className="mx-auto max-w-6xl"><p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-400">Manufacturing</p><h1 className="mt-5 max-w-4xl text-4xl font-bold md:text-6xl">Electrical and automation infrastructure for productive facilities.</h1><p className="mt-7 max-w-3xl text-lg leading-8 text-neutral-300">Admill supports manufacturing environments with power, control, monitoring and security systems engineered around operational continuity.</p><Link href="/#contact" className="mt-9 inline-block rounded-md bg-red-600 px-6 py-3 font-semibold">Discuss a Manufacturing Project</Link></div></section>
      <section className="px-6 py-20"><div className="mx-auto max-w-6xl"><h2 className="text-3xl font-bold">Where we can contribute</h2><div className="mt-8 grid gap-4 md:grid-cols-3">{areas.map((x) => <div key={x} className="border border-neutral-200 p-6 font-semibold">{x}</div>)}</div></div></section>
      <section className="bg-neutral-50 px-6 py-20"><div className="mx-auto max-w-6xl"><h2 className="text-3xl font-bold">Designed for operational visibility.</h2><p className="mt-5 max-w-3xl text-lg leading-8 text-neutral-600">Power status, alarms, automation and security data can be integrated into appropriate monitoring platforms so engineering and operations teams have a clearer picture of the facility.</p></div></section>
      <RelatedSolutions slugs={["industrial-automation", "power-energy", "electrical-engineering"]} />
      <section className="px-6 py-20"><div className="mx-auto max-w-6xl rounded-2xl bg-neutral-950 p-8 text-white md:p-12"><h2 className="text-3xl font-bold">Upgrading an existing plant?</h2><p className="mt-4 max-w-2xl text-neutral-300">Tell us what is already installed and what the facility needs to achieve. We can help define an upgrade and integration path.</p><Link href="/#contact" className="mt-7 inline-block rounded-md bg-red-600 px-6 py-3 font-semibold">Request Engineering Consultation</Link></div></section>
    </main>
  );
}
