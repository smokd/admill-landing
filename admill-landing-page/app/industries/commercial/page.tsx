import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Electrical & Building Systems for Commercial Buildings in Zimbabwe",
  description: "Integrated electrical, BMS, energy, security and building systems for commercial properties in Harare and across Zimbabwe.",
  alternates: { canonical: "/industries/commercial" },
};

const areas = ["Electrical infrastructure", "BMS and HVAC integration", "Energy monitoring", "Access control and CCTV", "Fire and life safety interfaces", "Systems integration"];

export default function CommercialPage() {
  return (
    <main className="min-h-screen bg-white text-neutral-900">
      <section className="bg-neutral-950 px-6 py-24 text-white"><div className="mx-auto max-w-6xl"><p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-400">Commercial Buildings</p><h1 className="mt-5 max-w-4xl text-4xl font-bold md:text-6xl">Integrated building infrastructure for modern commercial facilities.</h1><p className="mt-7 max-w-3xl text-lg leading-8 text-neutral-300">From electrical power and BMS to security and energy monitoring, Admill helps commercial facilities bring critical systems into a coordinated operational environment.</p><Link href="/#contact" className="mt-9 inline-block rounded-md bg-red-600 px-6 py-3 font-semibold">Discuss a Commercial Project</Link></div></section>
      <section className="px-6 py-20"><div className="mx-auto max-w-6xl"><h2 className="text-3xl font-bold">Relevant systems</h2><div className="mt-8 grid gap-4 md:grid-cols-3">{areas.map((x) => <div key={x} className="border border-neutral-200 p-6 font-semibold">{x}</div>)}</div></div></section>
      <section className="bg-neutral-50 px-6 py-20"><div className="mx-auto max-w-6xl grid gap-10 md:grid-cols-2"><div><h2 className="text-3xl font-bold">Better visibility across the building.</h2><p className="mt-5 leading-7 text-neutral-600">Building operators often need to understand power, HVAC, alarms, access and energy use from one operational perspective. We design the interfaces and integration around those needs.</p></div><div className="rounded-xl bg-white p-7 shadow-sm"><p className="text-sm font-semibold uppercase tracking-wider text-red-600">Typical integration</p><p className="mt-4 font-medium leading-8">Electrical · HVAC · BMS · Energy meters · CCTV · Access Control · Fire interfaces</p></div></div></section>
      <section className="px-6 py-20"><div className="mx-auto max-w-6xl rounded-2xl bg-neutral-950 p-8 text-white md:p-12"><h2 className="text-3xl font-bold">Developing or upgrading a commercial facility?</h2><p className="mt-4 max-w-2xl text-neutral-300">Bring us in during design, tender, construction or upgrade planning to define the systems and integration requirements.</p><Link href="/#contact" className="mt-7 inline-block rounded-md bg-red-600 px-6 py-3 font-semibold">Request Engineering Consultation</Link></div></section>
    </main>
  );
}
