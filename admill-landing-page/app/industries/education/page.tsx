import type { Metadata } from "next";
import Link from "next/link";
import { RelatedSolutions } from "@/components/related-solutions";

export const metadata: Metadata = {
  title: "Electrical & Systems Engineering for Education in Zimbabwe",
  description: "Campus electrical, security, networking, automation, energy and monitoring systems for schools, colleges and universities in Zimbabwe.",
  alternates: { canonical: "/industries/education" },
};

const areas = ["Campus electrical systems", "CCTV and access control", "Network and communications infrastructure", "Energy monitoring", "BMS and building automation", "Centralized monitoring"];

export default function EducationPage() {
  return (
    <main className="min-h-screen bg-white text-neutral-900">
      <section className="bg-neutral-950 px-6 py-24 text-white"><div className="mx-auto max-w-6xl"><p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-400">Education</p><h1 className="mt-5 max-w-4xl text-4xl font-bold md:text-6xl">Connected, secure and resilient campus infrastructure.</h1><p className="mt-7 max-w-3xl text-lg leading-8 text-neutral-300">Admill integrates electrical, security, communications, energy and building systems for schools, colleges and universities.</p><Link href="/#contact" className="mt-9 inline-block rounded-md bg-red-600 px-6 py-3 font-semibold">Discuss a Campus Project</Link></div></section>
      <section className="px-6 py-20"><div className="mx-auto max-w-6xl"><h2 className="text-3xl font-bold">Campus capabilities</h2><div className="mt-8 grid gap-4 md:grid-cols-3">{areas.map((x) => <div key={x} className="border border-neutral-200 p-6 font-semibold">{x}</div>)}</div></div></section>
      <section className="bg-neutral-50 px-6 py-20"><div className="mx-auto max-w-6xl"><h2 className="text-3xl font-bold">One campus, many systems.</h2><p className="mt-5 max-w-3xl text-lg leading-8 text-neutral-600">Large campuses need infrastructure that scales across buildings. We can approach power, security, connectivity and automation as a coordinated systems problem rather than isolated installations.</p></div></section>
      <RelatedSolutions slugs={["electronic-security", "power-energy", "systems-integration"]} />
      <section className="px-6 py-20"><div className="mx-auto max-w-6xl rounded-2xl bg-neutral-950 p-8 text-white md:p-12"><h2 className="text-3xl font-bold">Planning a campus upgrade?</h2><p className="mt-4 max-w-2xl text-neutral-300">Tell us about the campus, existing systems and project priorities and we can help identify a practical engineering scope.</p><Link href="/#contact" className="mt-7 inline-block rounded-md bg-red-600 px-6 py-3 font-semibold">Start a Project Conversation</Link></div></section>
    </main>
  );
}
