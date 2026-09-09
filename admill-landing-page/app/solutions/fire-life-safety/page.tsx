import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Fire & Life Safety Systems in Zimbabwe",
  description: "Fire detection, alarm interfaces, emergency systems and life-safety integration for commercial, industrial and institutional facilities in Zimbabwe.",
  alternates: { canonical: "/solutions/fire-life-safety" },
};

const capabilities = ["Fire detection and alarm systems", "Emergency interfaces", "Alarm monitoring", "Access control interfaces", "Building systems integration", "Testing and commissioning"];

export default function FireLifeSafetyPage() {
  return (
    <main className="min-h-screen bg-white text-neutral-900">
      <section className="bg-neutral-950 px-6 py-24 text-white"><div className="mx-auto max-w-6xl"><p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-400">Fire & Life Safety</p><h1 className="mt-5 max-w-4xl text-4xl font-bold md:text-6xl">Critical alarm systems designed to work when they are needed.</h1><p className="mt-7 max-w-3xl text-lg leading-8 text-neutral-300">We install and integrate life-safety systems with the wider facility infrastructure, with clear attention to alarm paths, interfaces, testing and commissioning.</p><Link href="/#contact" className="mt-9 inline-block rounded-md bg-red-600 px-6 py-3 font-semibold">Discuss a Life Safety Project</Link></div></section>
      <section className="px-6 py-20"><div className="mx-auto max-w-6xl"><h2 className="text-3xl font-bold">Capability areas</h2><div className="mt-8 grid gap-4 md:grid-cols-3">{capabilities.map((x) => <div key={x} className="border-l-2 border-red-600 bg-neutral-50 p-6 font-semibold">{x}</div>)}</div></div></section>
      <section className="bg-neutral-50 px-6 py-20"><div className="mx-auto max-w-6xl"><h2 className="text-3xl font-bold">Life safety is an integrated system.</h2><p className="mt-5 max-w-3xl text-lg leading-8 text-neutral-600">Depending on the project, fire and emergency events can interact with access control, HVAC, BMS and monitoring systems. The interfaces need to be engineered, tested and documented—not assumed.</p></div></section>
      <section className="px-6 py-20"><div className="mx-auto max-w-6xl rounded-2xl bg-neutral-950 p-8 text-white md:p-12"><h2 className="text-3xl font-bold">Need a fire or life-safety integration scope?</h2><p className="mt-4 max-w-2xl text-neutral-300">Tell us about the facility, existing systems and project stage and we can help define the technical scope.</p><Link href="/#contact" className="mt-7 inline-block rounded-md bg-red-600 px-6 py-3 font-semibold">Request Engineering Consultation</Link></div></section>
    </main>
  );
}
