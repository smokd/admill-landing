import type { Metadata } from "next";
import Link from "next/link";
import { RelatedSolutions } from "@/components/related-solutions";

export const metadata: Metadata = {
  title: "Electrical & Systems Engineering for Mining in Zimbabwe",
  description: "Electrical power, automation, monitoring, security and systems integration for mining and resource operations in Zimbabwe.",
  alternates: { canonical: "/industries/mining" },
};

const areas = ["Power and backup systems", "Industrial automation and control", "Site security and access", "Energy monitoring", "Communications and networking", "Systems integration"];

export default function MiningPage() {
  return (
    <main className="min-h-screen bg-white text-neutral-900">
      <section className="bg-neutral-950 px-6 py-24 text-white"><div className="mx-auto max-w-6xl"><p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-400">Mining & Resources</p><h1 className="mt-5 max-w-4xl text-4xl font-bold md:text-6xl">Engineering systems for demanding operating environments.</h1><p className="mt-7 max-w-3xl text-lg leading-8 text-neutral-300">Admill brings electrical, automation, monitoring and electronic security capabilities together for mining and resource facilities that depend on reliable infrastructure.</p><Link href="/#contact" className="mt-9 inline-block rounded-md bg-red-600 px-6 py-3 font-semibold">Discuss a Mining Project</Link></div></section>
      <section className="px-6 py-20"><div className="mx-auto max-w-6xl"><h2 className="text-3xl font-bold">Relevant capabilities</h2><div className="mt-8 grid gap-4 md:grid-cols-3">{areas.map((x) => <div key={x} className="border border-neutral-200 p-6 font-semibold">{x}</div>)}</div></div></section>
      <section className="bg-neutral-50 px-6 py-20"><div className="mx-auto max-w-6xl"><h2 className="text-3xl font-bold">One engineering partner across multiple systems.</h2><p className="mt-5 max-w-3xl text-lg leading-8 text-neutral-600">Mining projects often involve power, control, communications and security requirements that cross traditional contractor boundaries. Our systems-integration approach helps coordinate those interfaces from design through commissioning.</p></div></section>
      <RelatedSolutions slugs={["power-energy", "industrial-automation", "electronic-security", "systems-integration"]} />
      <section className="px-6 py-20"><div className="mx-auto max-w-6xl rounded-2xl bg-neutral-950 p-8 text-white md:p-12"><h2 className="text-3xl font-bold">Planning a mining or processing project?</h2><p className="mt-4 max-w-2xl text-neutral-300">Share the site, project stage and technical requirement. We can help identify where Admill can contribute.</p><Link href="/#contact" className="mt-7 inline-block rounded-md bg-red-600 px-6 py-3 font-semibold">Start a Project Conversation</Link></div></section>
    </main>
  );
}
