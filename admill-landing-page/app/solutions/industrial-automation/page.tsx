import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Industrial Automation & Control in Zimbabwe",
  description: "Industrial automation, PLC, SCADA, instrumentation, control panels and industrial systems integration for Zimbabwean facilities.",
  alternates: { canonical: "/solutions/industrial-automation" },
};

const capabilities = ["PLC and control systems", "SCADA and monitoring", "Instrumentation interfaces", "Control panels", "Industrial networking", "Testing and commissioning"];

export default function IndustrialAutomationPage() {
  return (
    <main className="min-h-screen bg-white text-neutral-900">
      <section className="bg-neutral-950 px-6 py-24 text-white"><div className="mx-auto max-w-6xl"><p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-400">Industrial Automation</p><h1 className="mt-5 max-w-4xl text-4xl font-bold md:text-6xl">Control systems engineered around the process.</h1><p className="mt-7 max-w-3xl text-lg leading-8 text-neutral-300">From control panels and PLCs to monitoring and industrial communications, Admill helps facilities connect automation, electrical and operational systems.</p><Link href="/#contact" className="mt-9 inline-block rounded-md bg-red-600 px-6 py-3 font-semibold">Discuss an Automation Project</Link></div></section>
      <section className="px-6 py-20"><div className="mx-auto max-w-6xl"><h2 className="text-3xl font-bold">Automation capabilities</h2><div className="mt-8 grid gap-4 md:grid-cols-3">{capabilities.map((x) => <div key={x} className="border border-neutral-200 p-6"><h3 className="font-semibold">{x}</h3><p className="mt-2 text-sm leading-6 text-neutral-600">Designed to improve visibility, control and reliability in demanding operating environments.</p></div>)}</div></div></section>
      <section className="bg-neutral-50 px-6 py-20"><div className="mx-auto max-w-6xl grid gap-10 md:grid-cols-2"><div><h2 className="text-3xl font-bold">Integration across the plant.</h2><p className="mt-5 leading-7 text-neutral-600">Industrial control does not have to remain isolated. Where appropriate, automation data and alarms can feed wider monitoring, BMS, energy and network systems.</p></div><div className="rounded-xl bg-white p-7 shadow-sm"><p className="text-sm font-semibold uppercase tracking-wider text-red-600">Typical technologies</p><p className="mt-4 font-medium leading-8">PLC · SCADA · HMI · Instrumentation · Industrial Ethernet · Modbus · IP networking</p></div></div></section>
      <section className="px-6 py-20"><div className="mx-auto max-w-6xl rounded-2xl bg-neutral-950 p-8 text-white md:p-12"><h2 className="text-3xl font-bold">Need control or monitoring expertise?</h2><p className="mt-4 max-w-2xl text-neutral-300">Bring us into the project early so the control architecture, interfaces and commissioning requirements are defined properly.</p><Link href="/#contact" className="mt-7 inline-block rounded-md bg-red-600 px-6 py-3 font-semibold">Start a Project Conversation</Link></div></section>
    </main>
  );
}
