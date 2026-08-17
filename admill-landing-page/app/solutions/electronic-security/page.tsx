import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Electronic Security Systems in Zimbabwe",
  description: "Integrated CCTV, access control, intrusion detection, perimeter security and electronic security systems for facilities in Zimbabwe.",
  alternates: { canonical: "/solutions/electronic-security" },
};

const services = ["CCTV and video surveillance", "Access control and biometrics", "Intrusion detection", "Perimeter security", "Intercom and visitor systems", "Security systems integration"];

export default function ElectronicSecurityPage() {
  return (
    <main className="min-h-screen bg-white text-neutral-900">
      <section className="bg-neutral-950 px-6 py-24 text-white"><div className="mx-auto max-w-6xl"><p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-400">Electronic Security</p><h1 className="mt-5 max-w-4xl text-4xl font-bold md:text-6xl">Security engineered as part of the facility.</h1><p className="mt-7 max-w-3xl text-lg leading-8 text-neutral-300">We design and integrate electronic security systems for commercial, industrial and institutional environments, with an emphasis on reliability, access governance and operational visibility.</p><Link href="/#contact" className="mt-9 inline-block rounded-md bg-red-600 px-6 py-3 font-semibold">Discuss a Security Project</Link></div></section>
      <section className="px-6 py-20"><div className="mx-auto max-w-6xl"><h2 className="text-3xl font-bold">Security capabilities</h2><div className="mt-8 grid gap-4 md:grid-cols-3">{services.map((x) => <div key={x} className="border-l-2 border-red-600 bg-neutral-50 p-6"><h3 className="font-semibold">{x}</h3><p className="mt-2 text-sm leading-6 text-neutral-600">System design, installation, integration, testing and commissioning.</p></div>)}</div></div></section>
      <section className="bg-neutral-50 px-6 py-20"><div className="mx-auto max-w-6xl"><h2 className="text-3xl font-bold">More than cameras and readers.</h2><p className="mt-5 max-w-3xl text-lg leading-8 text-neutral-600">For complex facilities, security events can be connected to access control, alarms, building systems and operational workflows. This makes the security infrastructure part of a wider response system rather than a collection of standalone devices.</p></div></section>
      <section className="px-6 py-20"><div className="mx-auto max-w-6xl rounded-2xl bg-neutral-950 p-8 text-white md:p-12"><h2 className="text-3xl font-bold">Planning a new security system or upgrade?</h2><p className="mt-4 max-w-2xl text-neutral-300">Tell us about the site, risk profile and operational requirements and we can help define the appropriate system architecture.</p><Link href="/#contact" className="mt-7 inline-block rounded-md bg-red-600 px-6 py-3 font-semibold">Request Engineering Consultation</Link></div></section>
    </main>
  );
}
