import type { Metadata } from "next";
import Link from "next/link";
import Media from "@/components/media-frame";

export const metadata: Metadata = {
  title: "Custom Lead & Lag Pump Controllers in Zimbabwe",
  description: "Custom-designed and built lead/lag pump and compressor controllers that sequence duty and standby equipment, balance run hours and protect plant — engineered in Zimbabwe.",
  alternates: { canonical: "/solutions/lead-lag-controllers" },
};

const services = ["Custom lead/lag sequencers", "Duty and standby changeover", "Pressure and level-based control", "Run-hour balancing", "Fault reporting and telemetry", "Panels, wiring and commissioning"];

export default function LeadLagControllersPage() {
  return (
    <main className="min-h-screen bg-white text-neutral-900">
      <section className="relative overflow-hidden bg-neutral-950 px-6 py-24 text-white"><div className="absolute inset-0"><Media ratio={null} tone="dark" label="Lead &amp; Lag Controllers" hint="lead-lag-controllers.jpg" className="h-full w-full" /></div><div className="absolute inset-0 bg-neutral-950/80" /><div className="relative mx-auto max-w-6xl"><p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-400">Lead &amp; Lag Controllers</p><h1 className="mt-5 max-w-4xl text-4xl font-bold md:text-6xl">Custom pump sequencing, built to the plant.</h1><p className="mt-7 max-w-3xl text-lg leading-8 text-neutral-300">Admill designs and builds custom lead/lag controllers that sequence multiple pumps or compressors to balance wear, sustain pressure and protect equipment. Each controller is engineered around the site&apos;s duty cycle, standby requirements and control interfaces rather than a fixed stock unit.</p><Link href="/#contact" className="mt-9 inline-block rounded-md bg-red-600 px-6 py-3 font-semibold">Discuss a Control Requirement</Link></div></section>
      <section className="px-6 py-20"><div className="mx-auto max-w-6xl"><h2 className="text-3xl font-bold">What we engineer</h2><div className="mt-8 grid gap-4 md:grid-cols-3">{services.map((x) => <div key={x} className="border-l-2 border-red-600 bg-neutral-50 p-6"><h3 className="font-semibold">{x}</h3><p className="mt-2 text-sm leading-6 text-neutral-600">Design, build, programming, testing and commissioning.</p></div>)}</div></div></section>
      <section className="bg-neutral-50 px-6 py-20"><div className="mx-auto max-w-6xl"><h2 className="text-3xl font-bold">Bespoke control, not a stock box.</h2><p className="mt-5 max-w-3xl text-lg leading-8 text-neutral-600">Lead/lag logic determines which unit runs as duty, which stands by, and how they rotate to equalise runtime. We define that logic with the client, then build, program and commission the panel to match the actual process — with options for fault reporting, telemetry and integration into wider monitoring systems.</p></div></section>
      <section className="px-6 py-20"><div className="mx-auto max-w-6xl rounded-2xl bg-neutral-950 p-8 text-white md:p-12"><h2 className="text-3xl font-bold">Need a controller for an existing plant?</h2><p className="mt-4 max-w-2xl text-neutral-300">Share the equipment list, duty/standby philosophy and control requirements. We can develop the sequencing logic and build the panel.</p><Link href="/#contact" className="mt-7 inline-block rounded-md bg-red-600 px-6 py-3 font-semibold">Start a Project Conversation</Link></div></section>
    </main>
  );
}
