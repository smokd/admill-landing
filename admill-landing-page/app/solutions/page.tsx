import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Engineering Solutions",
  description: "Electrical, power, automation, building systems, electronic security and systems-integration engineering for demanding facilities in Zimbabwe.",
  alternates: { canonical: "/solutions" },
};

const solutions = [
  ["Electrical Engineering", "Power distribution, backup power, monitoring and electrical infrastructure.", "/solutions/electrical-engineering"],
  ["Power & Energy", "Generator, ATS, solar and energy monitoring systems designed around resilience.", "/solutions/power-energy"],
  ["Building Automation & BMS", "Building controls, HVAC integration, alarms and operational visibility.", "/solutions/building-automation"],
  ["Industrial Automation", "PLC, SCADA, instrumentation, industrial networking and commissioning.", "/solutions/industrial-automation"],
  ["Electronic Security", "CCTV, access control, intrusion detection and integrated security architecture.", "/solutions/electronic-security"],
  ["Fire & Life Safety", "Detection, alarm interfaces, emergency systems and coordinated life-safety integration.", "/solutions/fire-life-safety"],
  ["Systems Integration", "Electrical, automation, BMS, security and networked systems working together.", "/solutions/systems-integration"],
];

export default function SolutionsIndexPage() {
  return <main className="min-h-screen bg-white text-neutral-900">
    <section className="bg-neutral-950 px-6 py-24 text-white"><div className="mx-auto max-w-6xl">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-400">Engineering capabilities</p>
      <h1 className="mt-5 max-w-4xl text-4xl font-bold md:text-6xl">Engineering Solutions</h1>
      <p className="mt-7 max-w-3xl text-lg leading-8 text-neutral-300">Admill engineers systems for facilities where power, controls, monitoring and security must operate as a coordinated whole. We support technical assessment, system architecture, implementation and commissioning.</p>
    </div></section>
    <section className="px-6 py-20"><div className="mx-auto max-w-6xl"><div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {solutions.map(([title, description, href]) => <Link key={href} href={href} className="group border border-neutral-200 p-7 transition-colors hover:border-red-600 hover:bg-neutral-50"><h2 className="text-2xl font-bold group-hover:text-red-700">{title}</h2><p className="mt-4 leading-7 text-neutral-600">{description}</p><span className="mt-6 inline-block font-semibold text-red-700">Explore capability →</span></Link>)}
    </div></div></section>
    <section className="px-6 pb-20"><div className="mx-auto max-w-6xl rounded-2xl bg-neutral-950 p-8 text-white md:p-12"><h2 className="text-3xl font-bold">Need to define a technical scope?</h2><p className="mt-4 max-w-2xl text-neutral-300">Tell us about the facility, project stage and systems involved. We can start with the engineering requirements and integration points.</p><Link href="/#contact" className="mt-7 inline-block rounded-md bg-red-600 px-6 py-3 font-semibold">Discuss a Project</Link></div></section>
  </main>;
}
