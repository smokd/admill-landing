import type { Metadata } from "next";
import Link from "next/link";
import Media from "@/components/media-frame";

export const metadata: Metadata = {
  title: "Automatic Sliding Door Systems in Zimbabwe",
  description: "Automatic sliding, swing and revolving door systems with access control, safety sensor and building-system integration for commercial and institutional facilities in Zimbabwe.",
  alternates: { canonical: "/solutions/automatic-door-systems" },
};

const services = ["Automatic sliding door systems", "Swing and curved sliding doors", "Access control and intercom integration", "Safety sensors and traffic protection", "Emergency egress and break-out", "Service, repair and maintenance"];

export default function AutomaticDoorSystemsPage() {
  return (
    <main className="min-h-screen bg-white text-neutral-900">
      <section className="relative overflow-hidden bg-neutral-950 px-6 py-24 text-white"><div className="absolute inset-0"><Media ratio={null} tone="dark" label="Automatic Door Systems" hint="automatic-door-systems.jpg" className="h-full w-full" /></div><div className="absolute inset-0 bg-neutral-950/80" /><div className="relative mx-auto max-w-6xl"><p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-400">Automatic Door Systems</p><h1 className="mt-5 max-w-4xl text-4xl font-bold md:text-6xl">Entrances engineered to the facility.</h1><p className="mt-7 max-w-3xl text-lg leading-8 text-neutral-300">Admill supplies, installs and integrates automatic sliding, swing and revolving door systems for commercial, healthcare, hospitality and institutional facilities — with the safety, access-control and building-system interfaces that keep entrances reliable.</p><Link href="/#contact" className="mt-9 inline-block rounded-md bg-red-600 px-6 py-3 font-semibold">Discuss a Door Project</Link></div></section>
      <section className="px-6 py-20"><div className="mx-auto max-w-6xl"><h2 className="text-3xl font-bold">Automatic door capabilities</h2><div className="mt-8 grid gap-4 md:grid-cols-3">{services.map((x) => <div key={x} className="border-l-2 border-red-600 bg-neutral-50 p-6"><h3 className="font-semibold">{x}</h3><p className="mt-2 text-sm leading-6 text-neutral-600">Supply, installation, integration, testing and commissioning.</p></div>)}</div></div></section>
      <section className="bg-neutral-50 px-6 py-20"><div className="mx-auto max-w-6xl"><h2 className="text-3xl font-bold">More than a door that opens.</h2><p className="mt-5 max-w-3xl text-lg leading-8 text-neutral-600">A well-engineered entrance balances movement, safety and access. Where required, we connect door systems to access control, intercoms and building systems, and configure them to release correctly on fire alarm and loss of power — so daily operation and emergency egress both behave as intended.</p></div></section>
      <section className="px-6 py-20"><div className="mx-auto max-w-6xl rounded-2xl bg-neutral-950 p-8 text-white md:p-12"><h2 className="text-3xl font-bold">Planning a new entrance or upgrade?</h2><p className="mt-4 max-w-2xl text-neutral-300">Tell us about the opening, traffic and access requirements and we can recommend the appropriate door system and interfaces.</p><Link href="/#contact" className="mt-7 inline-block rounded-md bg-red-600 px-6 py-3 font-semibold">Request Engineering Consultation</Link></div></section>
    </main>
  );
}
