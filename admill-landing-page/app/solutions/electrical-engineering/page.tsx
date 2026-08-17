import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Electrical Engineering in Zimbabwe",
  description:
    "Electrical engineering, power distribution, backup power, generator and ATS systems for commercial, industrial and institutional facilities in Zimbabwe.",
  alternates: { canonical: "/solutions/electrical-engineering" },
};

const capabilities = [
  "LV electrical distribution and infrastructure",
  "Generator and automatic transfer systems",
  "Solar PV and energy systems",
  "Energy monitoring and metering",
  "Electrical control and automation",
  "Testing, commissioning and fault finding",
];

export default function ElectricalEngineeringPage() {
  return (
    <main className="min-h-screen bg-white text-neutral-900">
      <section className="bg-neutral-950 px-6 py-24 text-white">
        <div className="mx-auto max-w-6xl">
          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.2em] text-red-400">Electrical Engineering</p>
          <h1 className="max-w-4xl text-4xl font-bold tracking-tight md:text-6xl">
            Reliable electrical infrastructure for demanding facilities.
          </h1>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-neutral-300">
            Admill engineers, installs and commissions electrical power systems for commercial, industrial and institutional projects across Zimbabwe.
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <Link href="/#contact" className="rounded-md bg-red-600 px-6 py-3 font-semibold text-white hover:bg-red-700">Discuss a Project</Link>
            <Link href="/solutions/systems-integration" className="rounded-md border border-neutral-600 px-6 py-3 font-semibold text-white hover:bg-neutral-900">Systems Integration</Link>
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[1fr_1.2fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-red-600">Engineering scope</p>
            <h2 className="mt-3 text-3xl font-bold">From power infrastructure to commissioning.</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {capabilities.map((item) => (
              <div key={item} className="border-l-2 border-red-600 bg-neutral-50 p-5 font-medium">{item}</div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-neutral-50 px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold">Built to work with the rest of the facility.</h2>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-neutral-600">
            Electrical systems rarely operate in isolation. We integrate power, monitoring, automation, building management and electronic security so critical systems can be supervised and controlled as part of a coherent facility infrastructure.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 text-sm font-semibold">
            {['Power distribution','Generators','ATS','Solar PV','Energy monitoring','BMS','Industrial control','Systems integration'].map((item) => (
              <span key={item} className="rounded-full border border-neutral-300 bg-white px-4 py-2">{item}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-6xl rounded-2xl bg-neutral-950 p-8 text-white md:p-12">
          <h2 className="text-3xl font-bold">Planning an electrical project?</h2>
          <p className="mt-4 max-w-2xl text-neutral-300">Bring us in at concept, design, tender, construction or upgrade stage. We can scope the engineering requirement and define the integration path.</p>
          <Link href="/#contact" className="mt-7 inline-block rounded-md bg-red-600 px-6 py-3 font-semibold hover:bg-red-700">Start a Project Conversation</Link>
        </div>
      </section>
    </main>
  );
}
