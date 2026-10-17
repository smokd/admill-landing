import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "LoRa Telemetry Networks in Zimbabwe",
  description: "LoRa and LoRaWAN telemetry network design and deployment connecting remote pumps, tanks, meters and sensors to central monitoring for utilities and remote sites in Zimbabwe.",
  alternates: { canonical: "/solutions/lora-telemetry-networks" },
};

const services = ["LoRa and LoRaWAN network design", "Gateway and sensor deployment", "Pump, tank and level monitoring", "Utility and energy metering", "Dashboard and alarm integration", "Remote sites and utilities"];

export default function LoraTelemetryNetworksPage() {
  return (
    <main className="min-h-screen bg-white text-neutral-900">
      <section className="bg-neutral-950 px-6 py-24 text-white"><div className="mx-auto max-w-6xl"><p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-400">LoRa Telemetry Networks</p><h1 className="mt-5 max-w-4xl text-4xl font-bold md:text-6xl">Long-range telemetry for assets that are far apart.</h1><p className="mt-7 max-w-3xl text-lg leading-8 text-neutral-300">Admill engineers LoRa and LoRaWAN telemetry networks that connect remote pumps, tanks, meters and sensors to a central monitoring platform — giving operators visibility across sites where cabling and mobile coverage are impractical.</p><Link href="/#contact" className="mt-9 inline-block rounded-md bg-red-600 px-6 py-3 font-semibold">Discuss a Telemetry Requirement</Link></div></section>
      <section className="px-6 py-20"><div className="mx-auto max-w-6xl"><h2 className="text-3xl font-bold">Telemetry capabilities</h2><div className="mt-8 grid gap-4 md:grid-cols-3">{services.map((x) => <div key={x} className="border-l-2 border-red-600 bg-neutral-50 p-6"><h3 className="font-semibold">{x}</h3><p className="mt-2 text-sm leading-6 text-neutral-600">Network design, deployment, integration and commissioning.</p></div>)}</div></div></section>
      <section className="bg-neutral-50 px-6 py-20"><div className="mx-auto max-w-6xl"><h2 className="text-3xl font-bold">Coverage without the cabling.</h2><p className="mt-5 max-w-3xl text-lg leading-8 text-neutral-600">LoRa&apos;s long range and low power suit distributed assets — reservoirs, boreholes, remote meters and outlying plant — where running signal cable or relying on mobile data is costly or unreliable. We design the gateway placement and sensor network, then integrate the data into dashboards, alarms and existing monitoring systems.</p></div></section>
      <section className="px-6 py-20"><div className="mx-auto max-w-6xl rounded-2xl bg-neutral-950 p-8 text-white md:p-12"><h2 className="text-3xl font-bold">Need visibility across remote sites?</h2><p className="mt-4 max-w-2xl text-neutral-300">Tell us about the assets, distances and monitoring objectives and we can scope a telemetry network and its integration.</p><Link href="/#contact" className="mt-7 inline-block rounded-md bg-red-600 px-6 py-3 font-semibold">Request Engineering Consultation</Link></div></section>
    </main>
  );
}
