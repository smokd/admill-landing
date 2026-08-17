import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Systems Integration in Zimbabwe",
  description: "Electrical, BMS, automation, security and network systems integration for complex commercial and industrial facilities in Zimbabwe.",
  alternates: { canonical: "/solutions/systems-integration" },
};

const layers = ["Electrical and power", "Building management", "Industrial control", "Security and life safety", "IP and communications", "Monitoring and analytics"];

export default function SystemsIntegrationPage() {
  return (
    <main className="min-h-screen bg-white text-neutral-900">
      <section className="bg-neutral-950 px-6 py-24 text-white"><div className="mx-auto max-w-6xl"><p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-400">Systems Integration</p><h1 className="mt-5 max-w-4xl text-4xl font-bold md:text-6xl">Connect the systems that keep a facility running.</h1><p className="mt-7 max-w-3xl text-lg leading-8 text-neutral-300">Admill brings electrical, automation, BMS, security and communications systems together so operators can monitor events, understand equipment status and respond from a coherent operational architecture.</p><Link href="/#contact" className="mt-9 inline-block rounded-md bg-red-600 px-6 py-3 font-semibold">Discuss an Integration Project</Link></div></section>
      <section className="px-6 py-20"><div className="mx-auto max-w-6xl"><h2 className="text-3xl font-bold">Integration across the facility</h2><div className="mt-8 grid gap-4 md:grid-cols-3">{layers.map((x) => <div key={x} className="border border-neutral-200 p-6 font-semibold">{x}</div>)}</div></div></section>
      <section className="bg-neutral-50 px-6 py-20"><div className="mx-auto max-w-6xl grid gap-12 md:grid-cols-2"><div><h2 className="text-3xl font-bold">Open systems. Practical integration.</h2><p className="mt-5 leading-7 text-neutral-600">Where equipment supports established protocols and interfaces, we can design the communication and control layer around the facility's operational needs rather than forcing every system into one vendor ecosystem.</p></div><div className="rounded-xl bg-white p-7 shadow-sm"><p className="text-sm font-semibold uppercase tracking-wider text-red-600">Typical interfaces</p><p className="mt-4 font-medium leading-8">BACnet/IP · KNX · Modbus · IP networking · PLC · SCADA · CCTV · Access Control</p></div></div></section>
      <section className="px-6 py-20"><div className="mx-auto max-w-6xl rounded-2xl bg-neutral-950 p-8 text-white md:p-12"><h2 className="text-3xl font-bold">Have systems that need to work together?</h2><p className="mt-4 max-w-2xl text-neutral-300">Share the existing architecture, equipment and project objectives. We can help define the integration scope and commissioning requirements.</p><Link href="/#contact" className="mt-7 inline-block rounded-md bg-red-600 px-6 py-3 font-semibold">Start a Project Conversation</Link></div></section>
    </main>
  );
}
