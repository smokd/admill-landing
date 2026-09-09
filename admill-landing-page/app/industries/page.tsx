import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Industries We Serve",
  description: "Engineering and systems-integration capabilities for mining, manufacturing, commercial, healthcare, education and hospitality facilities in Zimbabwe.",
  alternates: { canonical: "/industries" },
};

const industries = [
  ["Mining & Resources", "Resilient power, automation, monitoring, security and communications for demanding sites.", "/industries/mining"],
  ["Manufacturing", "Power, controls, monitoring and integration for productive facilities and upgrades.", "/industries/manufacturing"],
  ["Commercial Buildings", "Electrical infrastructure, BMS, energy monitoring and facility security.", "/industries/commercial"],
  ["Healthcare", "Critical power, facility monitoring, security and integrated building systems.", "/industries/healthcare"],
  ["Education", "Campus infrastructure, security, networking, power and centralised monitoring.", "/industries/education"],
  ["Hospitality", "Guest-facing comfort, power, energy, access and security systems.", "/industries/hospitality"],
];

export default function IndustriesIndexPage() {
  return <main className="min-h-screen bg-white text-neutral-900">
    <section className="bg-neutral-950 px-6 py-24 text-white"><div className="mx-auto max-w-6xl">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-400">Sector expertise</p>
      <h1 className="mt-5 max-w-4xl text-4xl font-bold md:text-6xl">Industries We Serve</h1>
      <p className="mt-7 max-w-3xl text-lg leading-8 text-neutral-300">Demanding facilities require more than separate installations. Admill helps project teams define, integrate and commission the electrical, control, monitoring and security systems their operations depend on.</p>
    </div></section>
    <section className="px-6 py-20"><div className="mx-auto max-w-6xl"><div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {industries.map(([title, description, href]) => <Link key={href} href={href} className="group border border-neutral-200 p-7 transition-colors hover:border-red-600 hover:bg-neutral-50"><h2 className="text-2xl font-bold group-hover:text-red-700">{title}</h2><p className="mt-4 leading-7 text-neutral-600">{description}</p><span className="mt-6 inline-block font-semibold text-red-700">View sector capability →</span></Link>)}
    </div></div></section>
    <section className="px-6 pb-20"><div className="mx-auto max-w-6xl rounded-2xl bg-neutral-950 p-8 text-white md:p-12"><h2 className="text-3xl font-bold">Planning a facility project or upgrade?</h2><p className="mt-4 max-w-2xl text-neutral-300">Bring Admill into the conversation when the scope involves critical infrastructure, controls or integration across multiple systems.</p><Link href="/#contact" className="mt-7 inline-block rounded-md bg-red-600 px-6 py-3 font-semibold">Start a Project Conversation</Link></div></section>
  </main>;
}
