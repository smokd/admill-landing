import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Building Automation & BMS in Zimbabwe",
  description: "Building management systems, HVAC controls, BACnet, KNX, energy monitoring and intelligent building integration in Zimbabwe.",
  alternates: { canonical: "/solutions/building-automation" },
};

const systems = ["Building Management Systems", "HVAC controls", "BACnet/IP integration", "KNX building automation", "Energy monitoring", "Third-party systems integration"];

export default function BuildingAutomationPage() {
  return (
    <main className="min-h-screen bg-white text-neutral-900">
      <section className="bg-neutral-950 px-6 py-24 text-white"><div className="mx-auto max-w-6xl">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-400">Building Automation & BMS</p>
        <h1 className="mt-5 max-w-4xl text-4xl font-bold md:text-6xl">Make building systems visible, intelligent and controllable.</h1>
        <p className="mt-7 max-w-3xl text-lg leading-8 text-neutral-300">Admill integrates HVAC, energy, electrical and other building services into practical monitoring and control platforms for commercial and institutional facilities.</p>
        <Link href="/#contact" className="mt-9 inline-block rounded-md bg-red-600 px-6 py-3 font-semibold">Discuss a BMS Project</Link>
      </div></section>
      <section className="px-6 py-20"><div className="mx-auto max-w-6xl grid gap-12 md:grid-cols-[0.8fr_1.2fr]"><div><h2 className="text-3xl font-bold">Integration, not isolated controls.</h2><p className="mt-5 leading-7 text-neutral-600">A useful BMS connects the systems that operators actually need to monitor. We work across building protocols and equipment interfaces to create a coherent operational view.</p></div><div className="grid gap-4 sm:grid-cols-2">{systems.map((item) => <div key={item} className="border-l-2 border-red-600 bg-neutral-50 p-5 font-semibold">{item}</div>)}</div></div></section>
      <section className="bg-neutral-50 px-6 py-20"><div className="mx-auto max-w-6xl"><h2 className="text-3xl font-bold">Useful for new builds and existing facilities.</h2><p className="mt-5 max-w-3xl text-lg leading-8 text-neutral-600">Whether the building is being designed from scratch or has legacy equipment already installed, we can scope the interfaces, integration requirements, graphics, alarms and commissioning process.</p><div className="mt-8 flex flex-wrap gap-3 text-sm font-semibold">{['BACnet/IP','KNX','HVAC','Energy meters','Electrical systems','Alarms','IP networking'].map((x) => <span key={x} className="rounded-full border border-neutral-300 bg-white px-4 py-2">{x}</span>)}</div></div></section>
      <section className="px-6 py-20"><div className="mx-auto max-w-6xl rounded-2xl bg-neutral-950 p-8 text-white md:p-12"><h2 className="text-3xl font-bold">Have a BMS or building integration requirement?</h2><p className="mt-4 max-w-2xl text-neutral-300">We can review the existing architecture, equipment and protocols and define a practical integration approach.</p><Link href="/#contact" className="mt-7 inline-block rounded-md bg-red-600 px-6 py-3 font-semibold">Request Engineering Consultation</Link></div></section>
    </main>
  );
}
